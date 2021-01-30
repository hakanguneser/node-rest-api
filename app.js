const express = require('express');
const memberRoutes = require('./routes/member.routes');
const mongoDB = require('./mongodb/mongodb.connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger.api.documentation');

const app = express();
app.use(express.json());
mongoDB.connect();

//Documentation route
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// Routes
app.use('/members', memberRoutes);
app.use('/', (req, res, next) => {
    res.json("Welcome to base URL");
});

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message
    });
});

module.exports = app;