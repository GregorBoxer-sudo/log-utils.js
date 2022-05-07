const logJS = require('log-utils.js');

const Logger = new logJS('./log.json');

async function run() {
    await Logger.printLog("all");
}

run();