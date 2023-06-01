import Stripe from 'stripe';

// Instancier l'API Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function webhookHandler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error(`🔔 Webhook error: ${err.message}`);
      res.status(400).send(`Webhook error: ${err.message}`);
      return;
    }

    if (event.type === 'payment_intent.succeeded') {
      console.log(`🔔 PaymentIntent was successful!`);
      // Log the event object for debugging purposes
      console.log(JSON.stringify(event, null, 2));
    } else {
      console.warn(`🔔 Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
