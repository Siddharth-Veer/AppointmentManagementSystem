const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Create a MongoDBStore instance with your MongoDB URI and collection name
const store = new MongoDBStore({
  uri: 'mongodb+srv://MediSyncAdmin:CiX9ErmywVkyEHHj@cluster0.kulzz2e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  collection: 'sessions',
});

// Error handling for MongoDBStore
store.on('error', function(error) {
  console.log('Session store error:', error);
});

require('dotenv').config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
  }
});

module.exports = sessionMiddleware;
