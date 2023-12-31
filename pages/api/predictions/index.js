import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export default async function handler(req, res) {
  if (!process.env.REPLICATE_API_KEY) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  const prediction = await replicate.predictions.create({
    // Pinned to a specific version of Stable Diffusion
    // See https://replicate.com/stability-ai/stable-diffusion/versions
    version: "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",

    // This is the text prompt that will be submitted by a form on the frontend
    input: {
      image: req.body.image, // Utiliser la valeur de "url" ici
      structure: req.body.structure,
      prompt: req.body.prompt,
      scale: req.body.scale,
      a_prompt: req.body.a_prompt,
      n_prompt: req.body.n_prompt,
    },

    weebhook: "https://housemakere.vercel.app//api/replicate-webhook",

  });

  if (prediction?.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}