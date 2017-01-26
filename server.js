var express = require('express'); // dependency
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express(); // add the object
var router = express.Router();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //set the view engine to ejs
app.set('port', process.env.PORT || 8080);

// use res.render to load up an ejs view file

app.get('/', function(req,res){
    res.render('pages/index');
});


router.get('/db_update',function(req,res){
    var dept_url = 'http://course-query.acad.ncku.edu.tw/qry/';

    request(dept_url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var list = [];
            var dept_name, dept_code, category, whole_dept_name;
            var json = { "dept_name": "", "dept_code": "" , "category": ""};

            $('ul[id="dept_list"]').find('li').each(function(index,element){
                category = $(element).find('.theader').attr('title');
                $(element).find('.tbody').find('.dept').each(function(index,element){
                    whole_dept_name = $(element).find('a').text();
                    console.log("類別" + category +"部門"+ whole_dept_name);
                });
                $(element).find('.tbody').find('.institute').each(function(index,element){
                    whole_dept_name = $(element).find('a').text();
                    console.log("類別" + category +"研究所"+ whole_dept_name);
                });
            })



        }
    });

});







router.get('/test', function(req, res){
    res.json({"message": "hello test"});
});

app.use('/api', router);
app.listen(app.get('port'),function(){
    console.log('Node app is running on port', app.get('port'));
});
