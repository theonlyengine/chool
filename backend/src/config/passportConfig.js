// backend/src/config/passportConfig.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

// Setting up Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Google client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google client secret from environment variables
      callbackURL: '/api/auth/google/callback', // Callback URL after Google OAuth
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      // Look for the user in the database by email
      let user = await User.findOne({ email });

      // If user does not exist, create a new one
      if (!user) {
        user = await User.create({
          name: displayName,
          email,
          password: id, // Password is being set to the Google ID, which is not recommended
          role: 'student', // Default role for new users
        });
      }

      // Return the user object
      return done(null, user);
    }
  )
);

// Serialize user instance to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user instance from session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
