const express = require("express");
const router = express.Router();
const taskManager = require("./controller/taskManagerController");
const app = express();

app.use(router);
app.use(express.json());

router.use("/taskmanager/v1", taskManager);

app.listen(3001, (err) => {
  if (err) {
    console.log(`some error occured`);
  } else {
    console.log(`server started at port 3000...`);
  }
});
