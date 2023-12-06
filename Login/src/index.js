const express = require('express');
const { collection, planet } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password
  };
  const userdata = await collection.insertMany(data);
  console.log(userdata);
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });

    if (!check) {
      res.send("User name cannot be found");
      return;
    }

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

app.get("/planet/:name", async (req, res) => {
    try {
      const planetName = req.params.name;
      const planetData = await planet.findOne({});
  
      if (!planetData || !planetData.descriptions || !planetData.descriptions[planetName]) {
        res.status(404).json({ error: "Planet not found" });
        return;
      }
  
      res.json({ description: planetData.descriptions[planetName] });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port:${port}`);
});