const { createLogger, format, transports } = require("winston");

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(
            (info) => `[${info.timestamp}] ${info.level} ${info.message}`
        )
    ),
    transports: [
        new transports.File({
            filename: 'logs/log-test-user.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
        }),
        new transports.Console({
            level: "debug",
        }),
        
    ],
});