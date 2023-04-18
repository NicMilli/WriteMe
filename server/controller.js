const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const config = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(config);

module.exports = {
  getReadMe: async (req, res) => {
    try {
      const generation = await openai.createCompletion({
        model: "text-davinci-003", // text-davinci-003 would be better here but considering cost
        prompt: req.body.prompt,
        temperature: 0.6,
      });
      res.setHeader('content-type', 'text/plain');
      res.status(200).send(generation.data.choices[0].text);
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
