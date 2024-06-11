var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use cors middleware to handle CORS
app.use(cors());

// Database connection configuration
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shreya"
});

// Connect to MySQL
con.connect(function (err) {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");

  // Check if the database exists
  con.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'signup'", function (err, result) {
    if (err) {
      console.error("Error checking database existence: ", err);
      return;
    }

    if (result.length > 0) {
      console.log("Database 'signup' already exists.");
      // Use the existing database
      con.changeUser({ database: 'signup' }, function (err) {
        if (err) {
          console.error("Error changing to database 'signup': ", err);
          return;
        }
        console.log("Switched to database 'signup'");

        // Proceed to create table if necessary
        createTable();
      });
    } else {
      // Create the database if it doesn't exist
      con.query("CREATE DATABASE signup", function (err, result) {
        if (err) {
          console.error("Error creating database: ", err);
          return;
        }
        console.log("Database 'signup' created");

        // Switch to the new database
        con.changeUser({ database: 'signup' }, function (err) {
          if (err) {
            console.error("Error changing to database 'signup': ", err);
            return;
          }
          console.log("Switched to database 'signup'");

          // Proceed to create table
          createTable();
        });
      });
    }
  });
});

// Function to create the table
function createTable() {
  var createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      countryCode VARCHAR(10),
      phone VARCHAR(20),
      password VARCHAR(255) NOT NULL
    )
  `;

  con.query(createTableQuery, function (err, result) {
    if (err) {
      console.error("Error creating table: ", err);
      return;
    }
    console.log("Table 'users' created or already exists");
  });
}

// Define a simple route
app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Define a route to handle user sign-up
app.post("/signup", function (req, res) {
  var { name, email, countryCode, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Name, email, and password are required");
  }

  var insertQuery = "INSERT INTO users (name, email, countryCode, phone, password) VALUES (?, ?, ?, ?, ?)";
  con.query(insertQuery, [name, email, countryCode, phone, password], function (err, result) {
    if (err) {
      console.error("Error inserting data: ", err);
      return res.status(500).send("Error inserting data");
    }
    console.log("User signed up successfully!", result);
    res.send("User signed up successfully!");
  });
});

// Start the server
var port = 3000;
app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});
