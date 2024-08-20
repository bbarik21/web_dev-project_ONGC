// Import necessary modules
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shreya",
  database: "signup"
});

con.connect(function (err) {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
  createTables(); 
});

function createTables() {
  var createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      countryCode VARCHAR(10),
      phone VARCHAR(20),
      password VARCHAR(255) NOT NULL
    )
  `;

  con.query(createUsersTableQuery, function (err, result) {
    if (err) {
      console.error("Error creating users table: ", err);
      return;
    }
    console.log("Table 'users' created or already exists");
  });

  var createAssetsTableQuery = `
    CREATE TABLE IF NOT EXISTS assets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      dateOfEntry DATE NOT NULL,
      value DECIMAL(10, 2) NOT NULL,
      amcExpiryDate DATE
    )
  `;

  con.query(createAssetsTableQuery, function (err, result) {
    if (err) {
      console.error("Error creating assets table: ", err);
      return;
    }
    console.log("Table 'assets' created or already exists");
  });

  var createAttendanceTableQuery = `
    CREATE TABLE IF NOT EXISTS attendance (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userName VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      status VARCHAR(50) NOT NULL
    )
  `;

  con.query(createAttendanceTableQuery, function (err, result) {
    if (err) {
      console.error("Error creating attendance table: ", err);
      return;
    }
    console.log("Table 'attendance' created or already exists");
  });

  var createSoftwareTableQuery = `
    CREATE TABLE IF NOT EXISTS software (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      licenseType VARCHAR(100) NOT NULL,
      amc VARCHAR(255) NOT NULL
    )
  `;

  con.query(createSoftwareTableQuery, function (err, result) {
    if (err) {
      console.error("Error creating software table: ", err);
      return;
    }
    console.log("Table 'software' created or already exists");
  });

  var createReadingsTableQuery = `
    CREATE TABLE IF NOT EXISTS readings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      date DATE NOT NULL,
      time TIME NOT NULL,
      type VARCHAR(50) NOT NULL,
      upsType INT NOT NULL,
      output_voltage_l1 DECIMAL(10, 2),
      output_voltage_l2 DECIMAL(10, 2),
      output_voltage_l3 DECIMAL(10, 2),
      output_current_l1 DECIMAL(10, 2),
      output_current_l2 DECIMAL(10, 2),
      output_current_l3 DECIMAL(10, 2),
      kw DECIMAL(10, 2),
      frequency DECIMAL(10, 2),
      power_factor DECIMAL(10, 2),
      total_load_percent DECIMAL(10, 2),
      battery_temp DECIMAL(10, 2),
      ups_temp DECIMAL(10, 2)
    )
  `;

  con.query(createReadingsTableQuery, function (err, result) {
    if (err) {
      console.error("Error creating readings table: ", err);
      return;
    }
    console.log("Table 'readings' created or already exists");
  });
}

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

app.post("/login", (req, res) => {
  var { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  var query = "SELECT id, name, email, countryCode, phone FROM users WHERE email = ? AND password = ?";
  con.query(query, [email, password], function (err, result) {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).send("An error occurred while processing your request");
    }

    if (result.length === 1) {
      const { id, name, email, countryCode, phone } = result[0];
      res.status(200).json({ id, name, email, countryCode, phone });
    } else {
      res.status(401).send("Invalid email or password");
    }
  });
});

app.post("/api/assets", function (req, res) {
  var { name, category, dateOfEntry, value, amcExpiryDate } = req.body;

  if (!name || !category || !dateOfEntry || !value || !amcExpiryDate) {
    return res.status(400).send("All fields are required");
  }

  var insertQuery = "INSERT INTO assets (name, category, dateOfEntry, value, amcExpiryDate) VALUES (?, ?, ?, ?, ?)";
  con.query(insertQuery, [name, category, dateOfEntry, value, amcExpiryDate], function (err, result) {
    if (err) {
      console.error("Error inserting data: ", err);
      return res.status(500).send("Error inserting data");
    }
    console.log("Asset added successfully!", result);
    res.send("Asset added successfully!");
  });
});

// Endpoint to fetch all assets
app.get("/api/assets", function (req, res) {
  var selectQuery = "SELECT * FROM assets";
  con.query(selectQuery, function (err, results) {
    if (err) {
      console.error("Error fetching assets: ", err);
      return res.status(500).send("Error fetching assets");
    }
    res.json(results);
  });
});

app.get("/api/assets/alerts", function (req, res) {
  var alertDate = new Date();
  alertDate.setMonth(alertDate.getMonth() + 1); 
  var selectQuery = "SELECT * FROM assets WHERE amcExpiryDate <= ?";
  con.query(selectQuery, [alertDate], function (err, results) {
    if (err) {
      console.error("Error fetching alert assets: ", err);
      return res.status(500).send("Error fetching alert assets");
    }
    res.json(results);
  });
});

// Endpoint to mark attendance
app.post("/attendance/mark", function (req, res) {
  var { userName, date } = req.body;
  var status = 'Present';

  var checkQuery = "SELECT * FROM attendance WHERE userName = ? AND date = ?";
  con.query(checkQuery, [userName, date], function (err, results) {
    if (err) {
      console.error("Error checking attendance: ", err);
      return res.status(500).send("Error checking attendance");
    }

    if (results.length > 0) {
      return res.status(403).send("You have already marked attendance today.");
    }

    var insertQuery = "INSERT INTO attendance (userName, date, status) VALUES (?, ?, ?)";
    con.query(insertQuery, [userName, date, status], function (err, result) {
      if (err) {
        console.error("Error marking attendance: ", err);
        return res.status(500).send("Error marking attendance");
      }
      console.log("Attendance marked successfully!", result);
      res.send("Attendance marked successfully!");
    });
  });
});

// Endpoint to fetch attendance records for a user
app.get("/attendance/:userName", function (req, res) {
  var { userName } = req.params;

  var selectQuery = "SELECT date, status FROM attendance WHERE userName = ?";
  con.query(selectQuery, [userName], function (err, results) {
    if (err) {
      console.error("Error fetching attendance records: ", err);
      return res.status(500).send("Error fetching attendance records");
    }
    res.json(results);
  });
});

// Endpoint to handle POST request for adding software details
app.post("/api/software", function (req, res) {
  var { name, licenseType, amc } = req.body;

  if (!name || !licenseType || !amc) {
    return res.status(400).send("All fields are required");
  }

  var insertQuery = "INSERT INTO software (name, licenseType, amc) VALUES (?, ?, ?)";
  con.query(insertQuery, [name, licenseType, amc], function (err, result) {
    if (err) {
      console.error("Error inserting software details: ", err);
      return res.status(500).send("Error inserting software details");
    }
    console.log("Software details added successfully!", result);
    res.send("Software details added successfully!");
  });
});

// Endpoint to fetch all software details
app.get("/api/software", function (req, res) {
  var selectQuery = "SELECT * FROM software";
  con.query(selectQuery, function (err, results) {
    if (err) {
      console.error("Error fetching software details: ", err);
      return res.status(500).send("Error fetching software details");
    }
    res.json(results);
  });
});

// Endpoint to handle POST request for submitting readings
app.post("/api/readings", function (req, res) {
  var {
    date,
    time,
    type,
    upsType,
    output_voltage_l1,
    output_voltage_l2,
    output_voltage_l3,
    output_current_l1,
    output_current_l2,
    output_current_l3,
    kw,
    frequency,
    power_factor,
    total_load_percent,
    battery_temp,
    ups_temp
  } = req.body;

  // Validation (you may adjust as per your requirements)
  if (!date || !time || !type || !upsType) {
    return res.status(400).send("Date, time, type, and upsType are required fields");
  }

  // Insert query for readings table
  var insertQuery = `
    INSERT INTO readings 
    (date, time, type, upsType, output_voltage_l1, output_voltage_l2, output_voltage_l3,
    output_current_l1, output_current_l2, output_current_l3, kw, frequency, power_factor,
    total_load_percent, battery_temp, ups_temp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  var values = [
    date,
    time,
    type,
    upsType,
    output_voltage_l1,
    output_voltage_l2,
    output_voltage_l3,
    output_current_l1,
    output_current_l2,
    output_current_l3,
    kw,
    frequency,
    power_factor,
    total_load_percent,
    battery_temp,
    ups_temp
  ];

  con.query(insertQuery, values, function (err, result) {
    if (err) {
      console.error("Error inserting data: ", err);
      return res.status(500).send("Error inserting data");
    }
    console.log("Reading data inserted successfully!", result);
    res.send("Reading data inserted successfully!");
  });
});

// Start server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
