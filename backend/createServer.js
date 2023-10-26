const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path');
require('dotenv').config();
// import Models
require("./model/User.model");
require("./model/Suppliers.model");
require("./model/Product.model");
require("./model/ProductCategory.model");
require("./model/ProductUnit.model");
function createServer() {
    app.use(cors({}));
    // Add body parser
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.static('client'))
    app.use('/uploads', express.static('uploads'));
    // Add routes
    require("./routes")(app)

    //set static folder
    app.use(express.static('../frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
    });

    // default error handler
    app.use((err, req, res, next) => {
        if (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    });

    return app;
}

module.exports = createServer