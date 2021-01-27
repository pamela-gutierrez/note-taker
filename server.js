// Dependencies aka Packages that give the server functionality
const express = require("express");
const fs = require("fs");
const path = require("path");

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port, I'll use this later in our listener.
const PORT = process.env.PORT || 4040;

// LOOOK THIS UP BECAUSE YOU DON'T REALLY UNDERSTAND IT. Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// ROUTES/REDIRECTS
// notes.html
// app.get("/", function (request, response) {
//     response.sendFile(path.join(__dirname, "index.html"));
// });

// index.html
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "public/notes.html"))
});

// api/display notes
app.get("/api/notes", function (request, response) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err
        return response.json(data);
    });

});

app.delete("/api/notes/:id"), function (request, response) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        // if (err) throw err;
        var index = request.body.index;
        var newNotes = [];
        for (let i = 0; i < db.length; i++) {
            if (i !== JSON.parse(index)) {
                newNotes.push(db[i]);
            }
        }
        response.send("Note removed!")
    })
}

// POST / api / notes
app.post("/api/notes", function (request, response) {
    var newNotes = request.body
    fs.writeFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        response.send("Successfully wrote new note!")
    })
})

// Listener: this code "starts" the server.
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT)
})