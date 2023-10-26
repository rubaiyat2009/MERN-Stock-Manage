const routes = (app) => {
    app.use('/api/auth', require('./_auth'))
    app.use('/api/users', require('./_users'))
    app.use('/api/suppliers', require('./_suppliers'))
    app.use('/api/products', require('./_products'))
    app.use('/api/dashboard', require('./_dashboard'))


}

module.exports = routes