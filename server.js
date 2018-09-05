// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars tables (DATA)
// =============================================================
var tables = [
  {
        name: "Naoh Smith",
        Id: "42",
        email: "nunyabiz@gmail.com",
        phone: "910-484-5555"
  }
];
var waitlist = [
    {
        name: "grace",
        Id: "42",
        email: "nunyabiz@gmail.com",
        phone: "910-484-5555"
    }
]
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// this will be make reservation
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// view tables - names should change
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays api tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays api waitlist
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

// Displays a single table, or returns false
// app.get("/api/tables/:table", function(req, res) {
//   var chosen = req.params.table;

//   console.log(chosen);

//   for (var i = 0; i < tables.length; i++) {
//     if (chosen === tables[i].routeName) {
//       return res.json(tables[i]);
//     }
//   }

//   return res.json(false);
// });

// this will be used to make new tables
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    if (tables.length === 5 ){
        waitlist.push(newReservation)
        res.json("Reservation are full. You have been added to the waitlist.")
    }
    else{
        tables.push(newReservation)
        res.json("Reservation has been recorded.");
    }


});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
