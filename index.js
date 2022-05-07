const colors = require('colors');
const FileHandler = require('file-utils.js');
const fs = require('fs');

class Logger {

    fileHandler = new FileHandler();

    path = ""
    lock = false;

    /**
     * @param path - the path to the log file
     * @constructor
     * @returns A new Log instance
     */
    constructor(path) {
        this.path = path;
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify({ log: [] }));
        }
        try {
            JSON.parse(fs.readFileSync(path));
        } catch (e) {
            fs.writeFileSync(path, JSON.stringify({ log: [] }));
        }
    }

    /**
     * Given a message object, write the message to the log file.
     * @param msgObject - the message object to write to the log file
     */
    writeLogFile = async(msgObject) => {
        let json = JSON.parse(await this.fileHandler.read(this.path));
        json.log.push(msgObject);
        this.fileHandler.write(this.path, JSON.stringify(json));
    }

    /**
     * Prints the whole log to the console
     * @param type - the type of the message (info, warning, error, success, debug)
     */
    printLog = async(type = "all") => {
        try {
            const json = JSON.parse(await this.fileHandler.read(this.path));
            switch (type) {
                case "all":
                    json.log.forEach(log => {
                        console.log(log);
                    });
                    break;
                case "error":
                    json.log.forEach(log => {
                        if (log.type === "error") {
                            console.log(log);
                        }
                    });
                    break;
                case "warning":
                    json.log.forEach(log => {
                        if (log.type === "warning") {
                            console.log(log);
                        }
                    });
                    break;
                case "info":
                    json.log.forEach(log => {
                        if (log.type === "info") {
                            console.log(log);
                        }
                    });
                    break;
                case "debug":
                    json.log.forEach(log => {
                        if (log.type === "debug") {
                            console.log(log);
                        }
                    });
                    break;
                case "success":
                    json.log.forEach(log => {
                        if (log.type === "success") {
                            console.log(log);
                        }
                    });
                    break;
                default:
                    json.log.forEach(log => {
                        console.log(log);
                    });
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Logs a debug message to the console and optionally to the log file.
     * @param {*} msg - the message to log 
     * @param {*} log = true - if true, the message will be logged
     */
    debug = async(msg, log = false) => {
        console.log(colors.white("[DEBUG] ") + msg);
        if (log) {
            await this.writeLogFile({
                message: msg,
                type: "debug",
                timeStamp: new Date().toLocaleString()
            });
        }
    }

    /**
     * Logs an info message to the console and to the log file.
     * @param msg - the message to log
     * @param [log=true] - whether to log the message to the log file
     */
    info = async(msg, log = true) => {
        console.log(colors.magenta(msg));
        if (log) {
            await this.writeLogFile({
                message: msg,
                type: "info",
                timeStamp: new Date().toLocaleString()
            });
        }
    }

    /**
     * Prints a message to the console in green text and writes it to the log file.
     * @param msg - the message to print
     * @param [log=true] - whether to write the message to the log file
     */
    success = async(msg, log = true) => {
        console.log(colors.green(msg));
        if (log) {
            await this.writeLogFile({
                message: msg,
                type: "success",
                timeStamp: new Date().toLocaleString()
            });
        }
    }

    /**
     * Prints a warning message to the console and writes it to the log file.
     * @param msg - the message to print
     * @param log - whether to write the message to the log file
     */
    warning = async(msg, log = true) => {
        console.log(colors.yellow(msg));
        if (log) {
            await this.writeLogFile({
                message: msg,
                type: "warning",
                timeStamp: new Date().toLocaleString()
            });
        }
    }

    /**
     * This function is used to log errors to the console and to a log file.
     * @param msg - the error message to log
     * @param [log=true] - whether or not to log the error to a log file
     * @returns The function returns nothing.
     */
    error = async(msg, log = true) => {
        console.log(colors.red(msg));
        if (log) {
            await this.writeLogFile({
                message: msg,
                type: "error",
                timeStamp: new Date().toLocaleString()
            });
        }
    }
}

module.exports = Logger;