const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running in the port ${port} `);
});
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
const startDbServer = async () => {
  try {
    await mongoose.connect(DB);
    console.log('DB connected successfully');
  } catch (error) {
    console.log(error);
  }
};
startDbServer();
