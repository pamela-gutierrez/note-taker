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
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// index.html


// api/display notes
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err
        return res.json(data);
    });

});

app.delete("/api/notes/:id"), function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        // if (err) throw err;
        var dbNotes = JSON.parse(data)
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
app.post("/api/notes", function (req, res) {
    fs.readFile("db/db.json", res, function (err, data) {
        if (err) throw err;
        var dbNotes = JSON.parse(data)
        var newNotesArr = [];
        // var newNotes = request.body
        dbNotes.push(req.body)
        for (var i = 0; i < dbNotes.length; i++) {
            var newNote =
            {
                title: dbNotes[i].title,
                text: djNotes[i].text,
                id: i
            }
            newNotesArr.push(newNote);
        }
        var dataInNotes = JSON.stringify(newNotesArr)
        fs.writeFile(path.join(__dirname, "/db/db.json"), dataInNotes, function (err, data) {
            if (err) throw err;
            res.json(req.body)
        });
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// Listener: this code "starts" the server.
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT)
})