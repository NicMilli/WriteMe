const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const config = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(config);

const createPrompt = (formData) => {
  let intro = `Generate a Readme.md file for the github repository ${formData.repo}. Have a table of contents to link to each section. Give a brief description of what the project does, when to use it and what some challenges were.`;
  if (formData.badges) {
    intro += ' Find markdown badges for the technologies used in the project from alexandresanlim/Badges4-README.md-Profile#badges .';
    if (formData.technologiesFile.length > 0) {
      intro += ` A list of technologies can be found in ${formData.technologiesFile} file.`;
    } else {
      intro += ' A list of technologies can be found in package.json dependencies section.';
    }
  }
  if (formData.visuals) {
    if (formData.images.length > 0) {
      intro += `Embed these images, ${formData.images}, and give a brief description in a visuals section.`;
    } else {
      intro += 'Embed these images and give a brief description in a visuals section.'
    }
  }
  if (formData.installation) {
    intro += ' Give the comands to install and run the project, see package.json scripts section for commands to run. Include a sample .env file if necessary.';
  }
  if (formData.codeHighlights) {
    if (formData.functions) {
      intro += ` Include a code highlights section with these functions ${formData.functions}. Provide a brief explanation for each function.`;
    } else {
      intro += ' Include code highlight section with code snippets from the project and briefly describe each one.';
    }
  }
  if (formData.authors) {
    intro += ' List the authors and contributors of the project.';
  }
  if (formData.usage) {
    intro += ' In a usage section give some examples of when would be appropriate to use the project.';
  }
  intro += ' In a wins and improvements section Summarize what the project did well and what could be improved upon. Finally, give some tips on how to make this readme look even better. Provide a link to this repository to find better badges alexandresanlim/Badges4-README.md-Profile#badges.';
  return intro;
};

module.exports = {
  getReadMe: async (req, res) => {
    try {
      const generation = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: createPrompt(req.body),
        temperature: 0.6,
        max_tokens: 3500,
      });
      res.setHeader('content-type', 'text/plain');
      res.status(200).send(generation.data.choices[0].text);
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
