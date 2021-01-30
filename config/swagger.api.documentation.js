const swaggerJsDoc = require('swagger-jsdoc');

//Extended: https://swagger.io/specification/#infoObject/
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Membership Management AP",
            version: "1.0.0",
            description: "This API developed for managing membership module",
            contact: {
                name: "Hakan Guneser",
                email: "hakan.guneser@gmail.com"
            }
        },
        servers: [{
            url: 'http://localhost:3000',
            description: 'Development server',
          }]
    },
    apis: ['app.js', './routes/*.js']
}

module.exports = swaggerJsDoc(swaggerOptions);