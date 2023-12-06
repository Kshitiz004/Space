const express = require('express');
const path = require("path");
const collection = require("./config");

const app = express();
// converting data into json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// using EJS as the viw engine app.set('view engine', 'ejs');
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Registering User
app.post("/signup", async (req, res) => {
const data = {
    name: req.body.username,
    password: req.body.password
}
    const userdata = await collection.insertMany(data);
    console.log(userdata);
    
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });

        if (!check) {
            res.send("User name cannot be found");
            return;
        }

        // Comparing the plaintext password from the request with the stored password
        if (req.body.password === check.password) {
            res.render("home");
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        console.error("Error:", error);
        res.send("Something went wrong");
    }
});

const port = 5000;
 app.listen(port, () => { console.log(`Server running on Port:${port}`);
})