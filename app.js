const express = require('express');


const app = express();
const PORT = 3000;

app.use('/', (req, res, next) => {
    res.json("Welcome to base URL");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})