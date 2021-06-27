const fetch = require("node-fetch")
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const text = req.query.text
    const translatedText = await translateText(text);

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: `Translated text: ${translatedText}`,
        from: '+18507834852',
        to: '+19195279302'
    })
    .then(message => console.log(message.sid));

    context.res = {

        // status: 200, /* Defaults to 200 */
        body: translatedText
    };
}

async function translateText(text) {
    const url = `https://api.funtranslations.com/translate/yoda.json?text=${text}`;
    console.log(url)
    let resp = await fetch(url, {
        method: 'GET',
    })
    console.log(resp)
    let data = await resp.json();
    return data;
}