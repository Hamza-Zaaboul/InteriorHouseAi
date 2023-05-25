
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { priceId, sessionId, userEmail } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/pricing?paid=true`,
    cancel_url: `${req.headers.origin}/cart`,
    client_reference_id: userEmail,
    customer_email: userEmail
  });
  res.status(200).json({ id: session.id });
}
