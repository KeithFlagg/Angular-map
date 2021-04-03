const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bp = require("body-parser");
//front and backend run on different ports so we install cors

const app = express()
const port = 3000

//body parser
app.use(bp.json())

app.use(bp.urlencoded({extended: true}))

//calls cors before get and listen
app.use(cors())

app.get('/schooldata', (req, res) => {
    let rawdata = fs.readFileSync("Private_School_Locations_-_Current.geojson");
    let school = JSON.parse(rawdata);

    //Use data from Value and Key
     if ((req.query.value !== '') && (req.query.key !== '')){
        const data = school.features.filter(feature=>
            feature.properties[req.query.key].includes(req.query.value.toUpperCase())
            );
            res.send({
                ...school,
                features: data
            });
     }
     else{
        // TODO filter data by query
        console.log(req.query);
        res.send({
            ...school,
        });
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})