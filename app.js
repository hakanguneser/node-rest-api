const express = require('express');
const memberRoutes = require('./routes/member.routes');
const app = express();
const PORT = 3000;

app.use('/members',memberRoutes);

app.use('/', (req, res, next) => {
    console.log("123");
    res.json("Welcome to base URL");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})