const Badge = require('../model');

module.exports = {
  getBadges: async (req, res) => {
    try {
      const badges = await Badge.find({});
      res.setHeader('content-type', 'application/json');
      res.status(200).send(badges);
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
