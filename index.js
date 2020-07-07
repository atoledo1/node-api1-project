const express = require("express");
const shortid = require("shortid");
const server = express();
server.use(express.json());

let user = [
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

server.post("/api/users", (req, res) => {
  const nUser = req.body;
  nUser.id = shortid.generate();
  if (
    nUser.name === null ||
    nUser.bio === null ||
    nUser.name === "" ||
    nUser.bio === ""
  ) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!nUser) {
    res
      .status(500)
      .json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
  } else user.push(nUser);
  res.status(201).json(nUser);
});

server.get("/api/users", (req, res) => {
  if (!user) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else res.json(user);
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const userId = user.filter((idU) => idU.id == id);
  if (id === undefined) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!user) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  } else res.status(200).json(userId);
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const userI = user.filter((idUser) => idUser.id == id);
  if (res) {
    if (userI.length != 0) {
      user = user.filter((user) => user.id != id);
      res.status(200).json(userI);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }
});
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const nUser = req.body;
  let userNN = user.find((idUs) => idUs.id === id);
  console.log(user);
  if (!userNN) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (
    nUser.name === null ||
    nUser.name === "" ||
    nUser.bio === null ||
    nUser.bio === ""
  ) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!nUser) {
    return res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  } else userNN.bio = nUser.bio;
  userNN.name = nUser.name;
  res.status(200).json(userNN);
});

const port = 8000;

server.listen(port, () => console.log(`server running on port ${port}`));
