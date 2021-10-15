const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const Task = require("./models/Task");

// const port = process.env.PORT || 3000;

const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//set view engine:
app.set("view engine", "ejs");

const dbURI =
  "mongodb+srv://dinesh19:c2zjkgKvCxxTaHZp@nodetuts.djld1.mongodb.net/codedojo?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get("*", checkUser);
app.get("/", (req, res) => res.render("home", { title: "Code Dojo" }));
app.get("/courses", requireAuth, (req, res) =>
  res.render("courses", { title: "Courses" })
);
app.get("/usertasks",(req,res)=>{
  Task.find().sort({ createdAt : -1})
  .then((result)=>{
    res.render('usertasks',{title:"Tasks",tasks: result})
  })
  .catch((err)=>{
    console.log(err);
  })
})


app.use(authRoutes);

