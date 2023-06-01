import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { priceId, userEmail } = req.body;

  // Créez un nouveau client avec l'e-mail de l'utilisateur
  const customer = await stripe.customers.create({
    email: userEmail,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    // Associez le client à la session de paiement
    customer: customer.id,
    mode: "payment",
    success_url: `${req.headers.origin}/dashboard`,
    cancel_url: `${req.headers.origin}/canceled`,
  });

  res.status(200).json({ id: session.id });
}
