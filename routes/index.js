const express = require('express');
const rootRouter = express.Router()
const shoppingRouter = require('./shopping.routes');
require('dotenv').config()

rootRouter.use('/shopping', shoppingRouter);

const applyRoutes = (app) => {
    app.use('/api/v1', rootRouter)
}

module.exports = applyRoutes;