const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error: ', err));
const createAdmin = async () => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin@123';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const user = new User({
    idNo: '1',
    email: adminEmail,
    password: hashedPassword,
    name: 'Admin',
    dateOfBirth: new Date(1980, 12, 12) // Example date
  });

  await user.save();
  console.log('Admin user created');
  mongoose.disconnect();
};

createAdmin().catch(err => console.error(err));
