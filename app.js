const express = require('express');
const path = require('path');
// const fs = require('fs');
const mongoose = require('mongoose')

main().catch(err => console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/KdTest');
    console.log('We are connected with KdTest db');
}
const kittySchema = new mongoose.Schema({
    name: String,
    "Phone Number": String,
    "Adhar Number": String,
    DOB: String,
    gender: String
})
const kitten = mongoose.model("DanceWeb", kittySchema);


const app = express();
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded());


// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'static/forPug'));


// Our pug demo endpoint
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})
app.get('/contect', (req, res) => {
    res.status(200).render('contect.pug');
})
app.post('/contect', (req, res) => {
    // console.log(req.body);
    let data = req.body;
    const UserKitty = new kitten({
        name: data.name,
        "Phone Number": data['Phone Number'],
        "Adhar Number": data['Adhar Number'],
        DOB: data.DOB,
        gender: data.gender 
    
    })
    // console.log(data);
    UserKitty.save();
    kitten.find()
        .then(dancewebs => {
            console.log(dancewebs);
        })
        .catch(err => {
            console.log(err);
        })
    res.status(200).render('contect.pug');
})


// STARTING THE SERVER
app.listen(80, () => {
    console.log('Web running on port 80.');
})