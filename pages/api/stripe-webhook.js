import Stripe from "stripe";
import { buffer } from "micro";
import firebase_app from "@/firebase/InitFirebase";
import archivagePayment from "@/firebase/Firestore/addDataPayment";
import { collection, getFirestore, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import Cors from "micro-cors";


const db = getFirestore(firebase_app);
// Instancier l'API Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

// Gérer le webhook
export default cors(async function webhookHandler(req, res) {

  if (req.method === "POST") {
    const buf = await buffer(req, { encoding: 'utf8' });
    const rawBody = buf.toString();

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

    } catch (err) {
      console.error(err);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
    // || event.type === "checkout.sessi  zon.completed"

    if (event.type === "payment_intent.succeeded") {

      const paymentIntent = event.data.object;

      console.log(`💰 PaymentIntent Successe: ${JSON.stringify(paymentIntent)}`);

      // Get customer id
      const customerId = paymentIntent.customer;

      // // Retrieve customer
      const customer = await stripe.customers.retrieve(customerId);

      // Get the customer email
      const userEmail = customer.email;

      const usersRef = collection(db, "users");
      const queryL = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(queryL);
      const idDocument = querySnapshot.docs[0].id;

      let creditAmountPrice = 0;

      switch (paymentIntent.amount) {
        case 900: // Correspond à 9 euros en centimes
          creditAmountPrice = 30;
          break;
        case 1900: // Correspond à 19 euros en centimes
          creditAmountPrice = 100;
          break;
        case 3900: // Correspond à 39 euros en centimes
          creditAmountPrice = 250;
          break;
        default:
          // Autres cas non spécifiés
          break;
      }

      const dataPayment = {
        creditAmount: creditAmountPrice,
        valeurPayment: paymentIntent.amount,
        userEmail: userEmail,
        Status_Payment: paymentIntent.status,
        Id_payment: paymentIntent.id,
        Numero_Creation: paymentIntent.created,
        Methode_de_Payment: paymentIntent.payment_method_types,
      }


      await archivagePayment("ArchivagePayment", idDocument, dataPayment);


      return res.status(200).json({ received: true });
    }

    else if (event.type === "checkout.session.completed") {
      const paymentIntent = event.data.object;
      console.log(`💰 PaymentIntent from checkout: ${JSON.stringify(paymentIntent)}`);

      // Get customer id
      const customerId = paymentIntent.customer;

      // // Retrieve customer
      const customer = await stripe.customers.retrieve(customerId);

      // Get the customer email
      const userEmail = customer.email;

      //Test

      // const userEmail = "zelenionzelenion@gmail.com";

      //On definit la variable creditAmount à 0
      let creditAmount = 0;

      switch (paymentIntent.amount_subtotal) {
        case 900: // Correspond à 9 euros en centimes
          creditAmount = 30;
          break;
        case 1900: // Correspond à 19 euros en centimes
          creditAmount = 100;
          break;
        case 3900: // Correspond à 39 euros en centimes
          creditAmount = 250;
          break;
        default:
          // Autres cas non spécifiés
          break;
      }

      const usersRef = collection(db, "users");
      const queryL = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(queryL);

      // Mettre à jour le document existant
      const docRef = querySnapshot.docs[0].ref;
      const docData = querySnapshot.docs[0].data();
      const currentCredit = parseInt(docData.piec);
      const newCredit = currentCredit + creditAmount;

      await updateDoc(docRef, { piec: newCredit.toString() });

      //On definit la variable dataPayment

      return res.status(200).json({ received: true });
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
      return res.status(200).json({ received: true });
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      console.log(`💵 Charge id: ${charge.id}`);
      return res.status(200).json({ received: true });
    } else if (event.type === "charge.failed") {
      const charge = event.data.object;
      // // Retrieve customer`
      const customerId = charge.customer;
      const customer = await stripe.customers.retrieve(customerId);

      if (charge.outcome.type === "blocked") {
        // Get the customer email
        const userEmail = customer.email;
        const usersRef = collection(db, "users");
        const queryL = query(usersRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(queryL);
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { blocked: true });
      }



      console.log(`❌ Charge failed: ${charge.failure_message}`);

      return res.status(200).json({ received: true });

    }
    else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
      return res.status(200).json({ received: true });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
);
