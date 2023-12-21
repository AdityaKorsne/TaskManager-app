const express = require("express");
const dataHandler = require("./fileHandler"); // Adjust the path based on your project structure

const app = express();
const port = 3000;

app.use(express.json());

app.delete("/delete/:id", (req, res) => {
  const idToDelete = req.params.id;

  dataHandler.deleteObjectById(idToDelete, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    return res.status(200).send(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
