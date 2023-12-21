const fs = require("fs");

function deleteObjectById(id, callback) {
  // Read the content of the data.json file
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return callback(err, null);
    }

    // Parse the JSON content
    let jsonData = JSON.parse(data);

    // Find the object with the specified ID in data1 array and remove it
    const data1Array = jsonData.data1;
    const indexToRemove = data1Array.findIndex((obj) => obj.id === id);

    if (indexToRemove !== -1) {
      data1Array.splice(indexToRemove, 1);

      // Write the updated data back to the data.json file
      fs.writeFile(
        "data.json",
        JSON.stringify(jsonData, null, 2),
        "utf8",
        (err) => {
          if (err) {
            return callback(err, null);
          }

          return callback(null, "Object deleted successfully");
        }
      );
    } else {
      return callback("Object not found", null);
    }
  });
}

module.exports = {
  deleteObjectById,
};
