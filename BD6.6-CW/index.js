let express = require("express");
let app = express();
let cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.json());

const { getEmployees, getEmployeeById } = require("./controllers");

// Exercise 1: Retrieve All Employees
app.get("/employees", async (req, res) => {
  const employees = getEmployees();
  res.json({ employees });
});

// Exercise 2: Retrieve Employee by ID
app.get("/employees/details/:id", async (req, res) => {
  const employee = getEmployeeById(parseInt(req.params.id));
  res.json({ employee });
});

module.exports = {
  app,
};
