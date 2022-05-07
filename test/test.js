const logJS = require('../index');

const Logger = new logJS('./log.json');

async function run() {
    await Logger.print("hallo");
    await Logger.printLog("all");
}

run();