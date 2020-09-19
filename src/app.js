const request = require('request')
const fs = require('fs')
const chalk = require('chalk')

const callRealData = (loc) => {
    const urler = "http://api.weatherstack.com/current?access_key=b2ed63e18cb7274ddc9bc4f29e8fe47e&query=" + loc
request({url:urler},(request,response) => {
    const data = response.body
    fs.writeFileSync('Weather.json',data)
})

}

const prin = (a) => {
    console.log(chalk.blueBright.inverse("Region :") + chalk.redBright.inverse(a.request.query))
    console.log(chalk.blueBright.inverse("Lat / Long :") + chalk.redBright.inverse(a.location.lat + " / " + a.location.lon))
    console.log(chalk.blueBright.inverse("TimeZone :") + chalk.redBright.inverse(a.location.timezone_id))
    console.log(chalk.blueBright.inverse("Fetch Time :") + chalk.redBright.inverse(a.location.localtime))
    console.log(chalk.blueBright.inverse("Current Temperature :") + chalk.redBright.inverse(a.current.temperature + " deg C"))
    console.log(chalk.blueBright.inverse("Weather :") + chalk.redBright.inverse(a.current.weather_descriptions + 'y'))
    console.log(chalk.blueBright.inverse("Wind_Speed :") + chalk.redBright.inverse(a.current.wind_speed + " mph"))
    console.log(chalk.blueBright.inverse("Pressure :") + chalk.redBright.inverse(a.current.pressure + " atm"))
    console.log(chalk.blueBright.inverse("Humidity :") + chalk.redBright.inverse(a.current.humidity))
    console.log(chalk.blueBright.inverse("Cloud Cover :") + chalk.redBright.inverse(a.current.cloudcover))
    console.log(chalk.blueBright.inverse("Feels like :") + chalk.redBright.inverse(a.current.feelslike))
    console.log(chalk.blueBright.inverse("UV Index :") + chalk.redBright.inverse(a.current.uv_index))
    console.log(chalk.blueBright.inverse("Is Day :") + chalk.redBright.inverse(a.current.is_day))
}

const fetch = () => {
    const avail = fs.readFileSync('Weather.json') 
    const da = avail.toString()
    const bal = JSON.parse(da)
    return bal
} 

module.exports = {
    callRealData : callRealData,
    fetch : fetch,
    prin : prin,
}


