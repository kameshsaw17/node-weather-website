const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Various routers
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather ',
        name: 'Kamesh Saw'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Kamesh Saw' 
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'Hello, this is Kamesh. Follow the link for help',
        title:'Help',
        name: 'Kamesh saw'
    })
})
app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error:' You must provide an address.',
            
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData = {}) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    
})

app.get('/products',(req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term '
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Kamesh',
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Kamesh',
        errorMessage: 'Page Not Found'
    })
})
app.listen(port, () => {
    console.log('server is up on port ' + port)
})