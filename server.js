const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middleware
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next();
});
//Maintenance page whatever path is given.  Note the placement order of app.use and app.get commands
app.use((req, res, next) =>{
    res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public')) // use files in public without routing every single file

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
})
app.get('/', (req, res) =>{
//    res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Andrew',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'welcome to my website',
    });

});

app.get('/about', (req,res) =>{
//    res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

// /bad simulate what happens with response fails -- send back json with errorMessage property
app.get('/bad', (req,res) =>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

app.listen(port,()=>{
    console.log('Server is up on port ' + port);
});