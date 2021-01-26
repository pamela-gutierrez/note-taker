// Dependencies aka Packages that give the server functionality
var express = require("express");
var fs = require("fs");
var path = require("path");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port, I'll use this later in our listener.
var PORT = process.env.PORT || 4040;

// LOOOK THIS UP BECAUSE I DON'T REALLY UNDERSTAND IT. Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// where all the new notes go
var newNotes = [];

// ROUTES/REDIRECTS
// index.html
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "index.html"))
});

// notes.html
app.get("/notes", function (request, response) {
    response.sendFile(path.join(__dirname, "notes.html"))
});

// api/display notes
app.get("/api/notes", function (request, response) {
    fs.readFile("db/db.json", "utf-8", function (err, data) {
        if (err) throw err
        return response.json(data);
    })

});

app.delete("/api/notes/:id"), function (request, response) {
    var index = req.body.db
    response.send("note removed")
}




// // api/delete notes
// app.put("/api/delete", function (request, response) {
//     newNotes = [];
//     response.send("delete")
// })

// POST/api/notes
app.post("/api/notes", function (request, response) {
    var newNote = request.body
    console.log(newNote)

})

// This points the server to a series files that will give the server a "map" of how to respond when users visit or request data from various URLS.
require("./index.js")(app);

// Listener: this code "starts" the server.
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

