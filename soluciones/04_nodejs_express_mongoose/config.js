var winston = require('winston');

module.exports = {
    PORT: 8080,
    DB_URI: "mongodb://localhost/ejercicio_04",
    WINSTON_LOGGER_OPTS: {
        transports: [
            new winston.transports.Console({
                colorize: true
            })
        ],
        msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
        expressFormat: true,
        meta: false,
        colorStatus: true
    }    
}