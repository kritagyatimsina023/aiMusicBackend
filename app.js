const express = require('express');

const app = express();
const cors = require('cors');
const reviewRouter = require('./routes/reviewRoute');
const userRouter = require('./routes/userRouter');
const promptRouter = require('./routes/promptRoute');
const outputRoute = require('./routes/outputRoute');

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/prompts', promptRouter);
app.use('/api/v1/outputPrompts', outputRoute);
module.exports = app;
