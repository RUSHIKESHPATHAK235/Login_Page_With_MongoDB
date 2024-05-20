const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const views_directory = path.join(__dirname,'../views');
const collection = require('./config')

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.set('view engine', 'ejs');
app.set('views', views_directory);

app.get('/', (req, res)=>{
    res.render('login');
})
app.get('/login', (req, res)=>{
    res.render('login');
})
app.get('/registration', (req, res)=>{
    res.render('registration');
})

app.post('/signup', async (req, res)=>{
    const data = {
        name : req.body.name,
        password : req.body.password
    }

    const postData = await collection.insertMany(data);
    console.log(postData)
    res.render('login')
})

app.post('/login', async (req,res)=>{
    try{
        const checkEmail = await collection.findOne({name: req.body.name});
        if(!checkEmail){
            res.send('Invalid Email');
        }
        const passwordMatch = await collection.findOne({password: req.body.password});
        if(!passwordMatch){
            res.send('Invalid Password');
        }
        else{
            res.render('home')
        }
    }
    catch{
        res.send('Invalid Details');
    }
})



app.listen(port, (req, res)=>{
    console.log(`Server Listening on Port ${port}`);
})