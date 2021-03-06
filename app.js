const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
// Set EJS
app.set("view engine", "ejs");
app.set("views", require("path").join(__dirname, "views"));

// Express-sessions init
app.use(
  session({
    secret: "keyboard cat",
    resave: false, // dont save session when nothing is modified
    saveUninitialized: false, // dont create session until something is stored
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Set passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set static dir
app.use(express.static(require("path").join(__dirname, "public")));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));
////////////////////////// Setup initialisation /////////////////////////////////

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`);
});
