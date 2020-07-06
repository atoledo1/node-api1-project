const express = require("express");
const shortid = require("shortid");
const server = express();
server.use(express.json());

let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: shortid.generate(),
    name: "Jane Tarzan",
    bio: "Tarzan's Wife",
  },
];
server.get("/", (req, res) => {
  res.status(200).send("<h1>API</h1>");
});



const port = 8000;

server.listen(port, () => console.log(`server running on port ${port}`));
