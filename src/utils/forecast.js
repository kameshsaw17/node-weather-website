const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=c8db8f52853148d680b153111210502&q=' + latitude + ',' + longitude
    request({url, json: true},(error,{ body }) => {
        if(error){
            callback('Unable to connect to the weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find the loacation', undefined)
        }
        else{
            callback(undefined, 'It is currently '+ body.current.temp_c + ' degrees out there. '+ 'There is a ' +
            body.current.precip_in + '% chance of rain.')
        }

})

}
module.exports = forecast
