const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const config = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(config);

const createPrompt = (formData) => {
  let intro = `Generate a Readme.md file for the github repository ${formData.repo}. Have a table of contents to link to each section. Give a brief description of what the project does, when to use it and what some challenges were.`;
  if (formData.badges) {
    intro += ' Create badges for the technologies used, find markdown badges from devicon.dev/ or alexandresanlim/Badges4-README.md-Profile#badges. Include color and logos.';
    if (formData.technologiesFile.length > 0) {
      intro += ` A list of technologies used can be found in ${formData.technologiesFile} file.`;
    } else {
      intro += ' A list of technologies used can be found in package.json.';
    }
  }
  if (formData.installation) {
    intro += ' Give the comands to install and run the project, include a sample .env if needed.';
  }
  if (formData.codeHighlights) {
    if (formData.functions) {
      intro += ` Include a code highlights section with these functions ${formData.functions}. Provide a brief explanation for each function.`;
    } else {
      intro += ' Include code highlight snippets for interesting functions and briefly describe each one.';
    }
  }
  if (formData.authors) {
    intro += ' List the authors and contributors of the project.';
  }
  if (formData.usage) {
    intro += ' In a usage section give some examples of when would be appropriate to use the project.';
  }
  intro += ' In a wins and improvements section Summarize what the project did well and what could be improved upon. Finally, give some tips with code examples on how to make the readme look even better.';
  return intro;
};

module.exports = {
  getReadMe: async (req, res) => {
    try {
      const generation = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: createPrompt(req.body),
        temperature: 0.6,
        max_tokens: 3000,
      });
      res.setHeader('content-type', 'text/plain');
      res.status(200).send(generation.data.choices[0].text);
    } catch (err) {
      console.log('err ------> ', err);
      res.status(404).send(err);
    }
  },
};
