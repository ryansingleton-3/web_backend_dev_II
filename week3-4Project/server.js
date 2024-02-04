const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("./models/users");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
const corsOptions = {
  origin: [
    "http://localhost:8080",
    "https://reviews-ya3k.onrender.com",
    "http://reviews-ya3k.onrender.com",
  ],
  credentials: true, // If your API expects cookies, HTTP authentication, or client-side SSL certificates
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));

app.use(express.json());
app.use("/", require("./routes"));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Search for an existing user by their GitHub ID
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          user = await User.create({
            githubId: profile._json.id,
            fullName: profile._json.name,
            url: profile._json.html_url,
          });

          return done(null, user);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected via Mongoose");
    app.listen(port, () => {
      console.log(`Server listening at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
