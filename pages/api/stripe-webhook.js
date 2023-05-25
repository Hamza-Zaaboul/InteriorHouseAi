import Stripe from "stripe";
import { buffer } from "micro";
import firebase_app from "@/firebase/InitFirebase";
import { collection, getFirestore, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
// Instancier l'API Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

// Gérer le webhook
export default async function webhookHandler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(err);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded" || event.type === "checkout.session.completed") {
      const paymentIntent = event.data.object;
      console.log(`💰 PaymentIntent: ${JSON.stringify(paymentIntent)}`);
      //On recuper l'email du chechout
      const userEmail = paymentIntent.customer_details.email;


      //On definit la variable creditAmount à 0
      let creditAmount = 0;

      switch (paymentIntent.amount_subtotal) {
        case 500:
        case 1000:
          creditAmount = 20;
          break;
        case 1900:
        case 3000:
          creditAmount = 100;
          break;
        case 3900:
        case 5000:
          creditAmount = 250;
          break;
        case 7000:
        case 7900:
        case 10000:
          creditAmount = 750;
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
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
      return res.status(200).json({ received: true });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
