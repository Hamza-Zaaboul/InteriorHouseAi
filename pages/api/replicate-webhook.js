export default async function handler(req, res) {
    console.log("🪝 incoming webhook!");
    console.log(req.body);

    await savePredctionToDatabase(req.body);
    await sendMessageToSlackChannel("Hey This prediction is done !", req.body.id);
    return res.end(JSON.stringify(req.body));

}