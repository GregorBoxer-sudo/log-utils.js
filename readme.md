# log-utils.js
log your stuff with colors!

## get started
```javascript
    const logJS = require('log-utils.js');

    // initialize logger
    const Logger = new logJS('./log.json');
    
    // print log to console
    async function run() {
        await Logger.printLog("all");
    }
    
    run();
```