const request = require("supertest");
const { getEmployees } = require("../controllers");
const { app } = require("../index");

const http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getEmployees: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3006, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 5: Mock the Get All Employees Function
  it("should return all employees", () => {
    let mockedEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getEmployees.mockReturnValue(mockedEmployees);
    let result = getEmployees();
    expect(result).toEqual(mockedEmployees);
    expect(result.length).toBe(3);
  });

  // Exercise 3: Test Retrieve All Employees
});

describe("API Endpoints Testing", () => {
  // Exercise 3: Test Retrieve All Employees
  it("GET /employees should get all employees", async () => {
    let result = await request(server).get("/employees");
    expect(result.status).toBe(200);
    expect(result.body.employees).toEqual([
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ]);
  });
  // Exercise 4: Test Retrieve Employee by ID
  it("GET /employees/details/:id should return employee by ID", async () => {
    let result = await request(server).get("/employees/details/1");
    expect(result.status).toBe(200);
    expect(result.body.employee).toEqual({
      employeeId: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      departmentId: 1,
      roleId: 1,
    });
  });
});
  