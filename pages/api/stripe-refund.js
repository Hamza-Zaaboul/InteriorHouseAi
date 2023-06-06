import Stripe from "stripe";
import Cors from "micro-cors";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const cors = Cors({
  allowMethods: ["POST"],
});

export default cors(async function handleRefundRequest(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { paymentIntentId, reason } = req.body;
  console.log(paymentIntentId);
  console.log(reason);

  try {
    // Créez une demande de remboursement sans effectuer le remboursement directement
    const refundRequest = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: reason,
    });

    // Traitez la réponse de Stripe selon vos besoins
    // Par exemple, vous pouvez envoyer une réponse JSON indiquant que la demande de remboursement a été créée avec succès
    res.status(200).json({ message: "Refund request created", refundRequest });
  } catch (error) {
    // Gérez les erreurs lors de la création de la demande de remboursement
    res.status(500).json({ error: error.message });
  }
});
