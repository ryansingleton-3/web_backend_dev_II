const ryanRoute = (req, res) => {
    res.send('Hello Ryan!');
}

const alyssaRoute = (req, res) => {
    res.send('Hello Alyssa!');
}

const benjaminRoute = (req, res) => {
    res.send('Benjamin Singleton!');
}

module.exports = {
    ryanRoute,
    alyssaRoute,
    benjaminRoute
}
