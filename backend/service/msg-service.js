const Msg = require("../model/msg");
const Tokenservices = require("./token-service");
const tokenService = new Tokenservices();

class MsgService {
  create(request, response) {
    const token = request.headers.authorization;

    tokenService.get(token).then(async (x) => {
      console.log("x data: ", x._id);
      console.log("request.body.user: ", request.body.user);
      if (x._id.toString() && request.body.user) {
        const msg = new Msg(request.body);
        msg
          .save()
          .then((savedMsg) => {
            response.json(savedMsg);
          })
          .catch((error) => {
            console.error("Error saving Msg:", error);
            response.status(500).send(error);
          });
      } else {
        return response.status(401).json({
          error: "Not Authorized To Post Data",
        });
      }
    });
  }

  get(req, res) {
    Msg.find()
      .then((resp) => {
        resp.map((x) => {
          x.decrypt();
        });
        res.send(resp);
      })
      .catch((err) => res.send(err));
  }

  async getbyid(req, res) {
    try {
      const userId = req.params.id;
      const user = await Msg.find({ user: userId });
      if (!user) {
        return res.status(404).send("User not found");
      }

      const messages = await Msg.find({ user: userId });
      messages.forEach((msg) => {
        msg.decrypt();
      });
      res.send(messages);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
module.exports = MsgService;
