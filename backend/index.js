const createServer = require('./createServer');

const port = process.env.PORT || 5003;

// connect database
require("./config/database");


async function startServer() {

    try {
        const app = createServer()
        app.listen(port, () => { console.log("server started on port " + port) })
    } catch (err) {
        console.log(err)
    }
}

startServer()