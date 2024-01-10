const ryanRoute = (req, res) => {
    res.send('Hello Ryan!');
}

const alyssaRoute = (req, res) => {
    res.send('Hello Alyssa!');
}

const homeRoute = (req, res) => {
    res.send('Hello world!');
}

module.exports = {
    ryanRoute,
    alyssaRoute,
    homeRoute
}
