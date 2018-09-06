// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT ||3000;
 

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
// // Routes
// // =============================================================
// @Routes
// app.get('/:endpoint?', function (req, res) {
//   switch (req.params.endpoint) {
//     case undefined:
//     case '/':
//       res.sendFile(path.join(__dirname, 'home.html'))
//       break
//     case 'reserve':
//     res.sendFile(path.join(__dirname, 'reserve.html'))
//       break
//     case 'tables':
//     res.sendFile(path.join(__dirname, 'tables.html'))
//       break
//     default:
//     res.sendFile(path.join(__dirname, '404.html'))
//       break
//   }
// })


// app.get('/api/:endpoint?', function (req, res) {
//   switch (req.params.endpoint) {
//     case 'tables':
//       res.json(tables)
//       break
//     case 'waitlist':
//       res.json(tables.slice(5))
//       break
//     default:
//       res.status(404).json({error: 'Not Found'})
//       break
//   }
// })

// app.post('/tables', function (req, res) {
//   var table = req.body

//   let response
//     res.status(201)
//     tables.push(table)

//   res.json(response)
  
// })

// // Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// // this will be make reservation
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// // view tables - names should change
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// // Displays api tables
app.get("/api/tables", function(req, res) {
  res.json(tables);
});

// // Displays api waitlist
app.get("/api/waitlist", function(req, res) {
    res.json(waitlist);
  });

// clears reservations and pushes waitlist to reservationss
app.get("/api/clear", function(req, res) {
  tables = [];
  for (var i = 0; i < 5; i++) {
    var wait = waitlist.shift();
    console.log("Cleared reservations and updated waitlist.");
    console.log(wait);
    if (wait != null) {
      tables.push(wait);
    }
   }
  // Shows same page. Is there a better way to do this?
  res.sendFile(path.join(__dirname, "home.html"));
})

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
//whenever we make a post request to the post api /api/tables route, run this function:

//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body-parser middleware
//   //since the request sent by the client is New Character;
//   // we can use the body of the request to create the variable newReservation 
//   // on the server
app.post("/api/tables", function(req, res) {
  var newReservation = req.body;
  console.log(req.body);
  console.log(newReservation,"server");

//   // Using a RegEx Pattern to remove spaces from newReservation
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
// //   newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    if (tables.length === 5 ){
        waitlist.push(newReservation)
      
        res.json("wait");
    }
    else{
        tables.push(newReservation)
        res.json("go");  
    };

  
  });
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
