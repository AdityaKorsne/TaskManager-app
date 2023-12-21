const express = require("express");
const routes = require("express").Router();
const validate = require("../validator/dataValidator");
const path = require("path");
const fs = require("fs");
const taskManagerHelper = require("../helper/taskManagerHelper");
routes.use(express.json());

//GET all tasks

routes.get("/tasks", async (req, res) => {
  try {
    let data = await taskManagerHelper.taskData();
    const dataPath = path.resolve(__dirname, "data.json");
    console.log(dataPath);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(`error fetching the data : ${err}`);
  }
});

//GET task by id

routes.get("/tasks/:id", async (req, res) => {
  let id = req.params.id;
  let data = await taskManagerHelper.taskDataById(id);
  if (data !== "") res.status(200).json(data);
  else res.status(400).json({ Message: "Invalid ID" });
});

// GET task by Priority

routes.get("/tasks/priority/:level", async (req, res) => {
  res
    .status(200)
    .send(await taskManagerHelper.taskDataByPriority(req.params.level));
});

//DELETE task by id

routes.delete("/tasks/:id", async (req, res) => {
  let taskCompleted = await taskManagerHelper.deleteTaskById(req.params.id);
  if (taskCompleted)
    res.status(200).json({ Message: "Object Deleted Successfully" });
  else res.status(200).json({ Message: "ID not found" });
});

//UPDATE task by id

routes.patch("/tasks/:id", async (req, res) => {
  let readData = fs.readFileSync("./database/data.json", {
    encoding: "utf-8",
    flag: "r",
  });

  let parsedData = JSON.parse(readData);
  let newData = parsedData.Task;

  const isSchemaValid = validate.schemaUpdateValidator(req.body);
  if (isSchemaValid.error) {
    res.status(400).send(isSchemaValid.error.details);
  } else {
    const index = newData.findIndex((ind) => ind.id == req.params.id);
    if (index == -1) return res.status(400).send({ Message: "ID invalid" });
    newData[index] = { ...newData[index], ...isSchemaValid.value };
    fs.writeFileSync(
      "./database/data.json",
      JSON.stringify(parsedData, null, 2)
    );
    res.status(200).send({
      status: "data updated successfully",
    });
  }
});

//CREATE task

routes.post("/task", async (req, res) => {
  let readData = fs.readFileSync("./database/data.json", {
    encoding: "utf-8",
    flag: "r",
  });
  let parsedData = JSON.parse(readData);
  let arrayData = parsedData.Task;
  const { id, title, description, completionStatus, priority, createdAt } =
    req.body;
  const index = arrayData.findIndex((ind) => ind.id == id);
  if (index != -1)
    return res
      .status(400)
      .send({ Status: "Failed", Message: "Id already exist" });
  const validateSchema = validate.schemaInsertValidator(req.body);
  if (validateSchema.error)
    return res.status(400).send(validateSchema.error.details);
  arrayData.push(req.body);
  fs.writeFileSync("./database/data.json", JSON.stringify(parsedData, null, 2));
  res.status(200).send({ Message: "Data added successfully" });
});

module.exports = routes;
