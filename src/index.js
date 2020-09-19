const express = require('express')
const path = require('path')
const wet = require('./app.js')
const fs = require('fs')
const chalk = require('chalk')
const request = require('request')
const { ESRCH, SSL_OP_EPHEMERAL_RSA } = require('constants')
const { clear, time } = require('console')

const stat = path.join(__dirname,'../static')
const myviews = path.join(__dirname,'/templates/views')
const app = express()

app.set('view engine', 'hbs')
app.set('views',myviews)
app.use(express.static(stat))

let locate = ''

app.get('',(req,res) => {
   if(req.query.LocationBox===undefined || req.query.LocationBox===null){
       locate = 'Ranchi'
   }
   else{
       locate = req.query.LocationBox
   }
   wet.callRealData(locate)

   function callu(callback) {
    setTimeout(function() {
    const data = fs.readFileSync('Weather.json');
    const toh = data.toString();
    const par = JSON.parse(toh);
    res.render('index',{
        temp : par.current.temperature + "ºC",
        cond : par.current.weather_descriptions[0],
        place: par.request.query,
        region:par.location.timezone_id,
        time:par.location.localtime,
        ws:par.current.wind_speed + " mph",
        pre:par.current.pressure + " atm",
        hum:par.current.humidity,
        cc:par.current.cloudcover,
        uv:par.current.uv_index,
        day:par.current.is_day
    })
},2000);
}
    callu()
})

app.listen(5000,() => {
    console.log('App has started on port 5000')
})