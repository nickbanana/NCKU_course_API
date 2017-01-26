var express = require('express'); // dependency
var app = express(); // add the object
var router = express.Router();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //set the view engine to ejs
app.set('port', process.env.PORT || 8080);

// use res.render to load up an ejs view file

app.get('/', function(req,res){
    res.render('pages/index');
});



router.get('/test', function(req, res){
    res.json({"message": "hello test"});
});






app.use('/api', router);
app.listen(port);
console.log('8080 so magic');