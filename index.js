const express = require("express");
const crypt = require("crypto");
const app = express();
const mongoose = require("mongoose");
const dbname = "app_menu";
const { ifError } = require("assert");
app.use(express.json());

const port = process.env.PORT || 8080;

//const port = 4000;

//mongodb://tiagoflopes:<password>@ac-e6lhyrp-shard-00-00.kgy7emi.mongodb.net:27017,ac-e6lhyrp-shard-00-01.kgy7emi.mongodb.net:27017,ac-e6lhyrp-shard-00-02.kgy7emi.mongodb.net:27017/?ssl=true&replicaSet=atlas-osc4su-shard-0&authSource=admin&retryWrites=true&w=majority
//const url = mongodb+srv://tiagoflopes:<teste2022>@cluster0.kgy7emi.mongodb.net/?retryWrites=true&w=majority;
//const url = "mongodb://127.0.0.1:27017/app_menu";

const url = "mongodb://tiagoflopes:teste2022@ac-e6lhyrp-shard-00-00.kgy7emi.mongodb.net:27017,ac-e6lhyrp-shard-00-01.kgy7emi.mongodb.net:27017,ac-e6lhyrp-shard-00-02.kgy7emi.mongodb.net:27017/?ssl=true&replicaSet=atlas-osc4su-shard-0&authSource=admin&retryWrites=true&w=majority";
const users = require("./model/user.js");
const connect = mongoose.connect(url, {
  useUnifiedTopology: true,
  dbname: dbname,
  useNewUrlParser: true,
});
connect
  .then(() => {
    console.log("Welcome to app_menu");
    let menu_do_dia = require("./Controllers/menu_do_dia");
    app.use("/pratos", async (req, res, next) => {
      // const login = req.header("Authorization").split(" ")[1];
      // const plain = Buffer.from(login, "base64").toString("utf8");
      // const passCL = crypt
      //   .createHash("sha256")
      //   .update(plain.split(":")[1])
      //   .digest("hex");
      // const userDB = await users.findOne({ user: plain.split(":")[0] });
      // if (userDB != null)
      //   if (userDB.pass == passCL) next();
      //   else res.status(401).send("ERRO PASS: " + req.header("Authorization"));
      // else res.status(401).send("ERRO USER: " + req.header("Authorization"));
      next()
    });
    app.use("/pratos", menu_do_dia);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log("Erro: " + err));