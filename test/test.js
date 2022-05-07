const logJS = require('../index');

const Logger = new logJS('./log.json');

async function run() {
    await Logger.log("hallo");
    await Logger.printLog("all");
}

run();