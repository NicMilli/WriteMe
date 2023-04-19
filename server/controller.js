const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const config = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(config);

const createPrompt = (formData) => {
  let intro = `Generate a Readme.md file for the github repository ${formData.repo}`;
  if (formData.badges) {
    intro += '. Create badges for the technologies used from thepackage.json file, find badges from repo alexandresanlim/Badges4-README.md-Profile#badges. Include color and logos.';
    if (formData.technologiesFile.length > 0) {
      intro += `Get the technologies from the ${formData.technologiesFile} file.`;
    }
  }
  if (formData.installation) {
    intro += 'Give installation and startup commands, include .env variables.';
  }
  if (formData.codeHighlights) {
    if (formData.functions) {
      intro += `Include code highlight these functions: ${formData.functions}`;
    } else {
      intro += 'Include code highlight snippets for interesting functions.';
    }
  }
  return intro;
};

module.exports = {
  getReadMe: async (req, res) => {
    try {
      console.log(req.body)
      const generation = await openai.createCompletion({
        model: "text-davinci-003", // text-davinci-003 would be better here but considering cost
        prompt: createPrompt(req.body),
        temperature: 0.6,
        max_tokens: 4000,
      });
      res.setHeader('content-type', 'text/plain');
      res.status(200).send(generation.data.choices[0].text);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  },
};
