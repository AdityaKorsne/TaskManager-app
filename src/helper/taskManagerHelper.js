const fs = require("fs");
const data = require("../database/data.json");
const validate = require("../validator/dataValidator");

//-----------------------FETCH---------------------------

function taskData() {
  return data;
}

function taskDataById(id) {
  let dataId = data.Task.find((dataById) => dataById.id == id);
  if (dataId) return dataId;
  else return "";
}

function taskDataByPriority(priority) {
  let priorityData = data.Task.filter(
    (data) => data.priority.toLowerCase() == priority.toLowerCase()
  );
  if (priorityData.length != 0) return priorityData;
  else return `Message : Data with priority ${priority} is not valid`;
}

//---------------------DELETE-------------------------

function deleteTaskById(id) {
  let readData = fs.readFileSync("./database/data.json", {
    encoding: "utf-8",
    flag: "r",
  });
  let parsedData = JSON.parse(readData);
  let newData = parsedData.Task;
  let index = newData.findIndex((ind) => ind.id == id);
  if (index !== -1) {
    newData.splice(index, 1);
    fs.writeFileSync(
      "./database/data.json",
      JSON.stringify(parsedData, null, 2)
    );
    return true;
  }
  return false;
}

module.exports = {
  taskData,
  taskDataById,
  taskDataByPriority,
  deleteTaskById,
};
