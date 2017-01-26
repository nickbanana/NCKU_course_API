var express = require('express'); // dependency
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express(); // add the object
var router = express.Router();
var pattern = /\( ([\w\d]{2}) \W([^ ]*)/;
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //set the view engine to ejs
app.set('port', process.env.PORT || 8080);

// use res.render to load up an ejs view file

app.get('/', function(req,res){
    res.render('pages/index');
});


router.get('/db_update',function(req,res){
    var dept_url = 'http://course-query.acad.ncku.edu.tw/qry/';
    var detail_url = 'http://course-query.acad.ncku.edu.tw/qry/qry001.php?dept_no=';
    var list = [];
    var class_list = [];

    request(dept_url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var dept_name, dept_code, category, whole_dept_name;
            var dept_json = { "dept_name": "", "dept_code": "" , "category": "", "institute": 0};
            $('ul[id="dept_list"]').find('li').each(function(index,element){
                category = $(element).find('.theader').attr('title');
                $(element).find('.tbody').find('.dept').each(function(index,element){
                    whole_dept_name = $(element).find('a').text();
                    var result = pattern.exec(whole_dept_name);
                    dept_code = result[1];
                    dept_name = result[2];
                    dept_json.dept_name = dept_name;
                    dept_json.dept_code = dept_code;
                    dept_json.category = category;
                    dept_json.institute = 0;
                    list.push(dept_json);
                    dept_json = { "dept_name": "", "dept_code": "" , "category": "", "institute": 0};
                });
                $(element).find('.tbody').find('.institute').each(function(index,element){
                    whole_dept_name = $(element).find('a').text();
                    var result = pattern.exec(whole_dept_name);
                    dept_code = result[1];
                    dept_name = result[2];
                    dept_json.dept_name = dept_name;
                    dept_json.dept_code = dept_code;
                    dept_json.category = category;
                    dept_json.institute = 1;
                    list.push(dept_json);
                    dept_json = { "dept_name": "", "dept_code": "" , "category": "", "institute": 0};
                });
            });
            //res.send(list);
            fs.writeFile('dept.json', JSON.stringify(list,null,4), function(err){
                console.log('output complete');
            })
        }
    });

    list.forEach(function(value,index,array){
                var get_data = detail_url + value.dept_code;
                request(get_data, function(error, response, html){
                    if(!error)
                    {
                        var $ = cheerio.load(html);
                        var course_json = { "dept_code":"", "serial_number":"", "course_code":"", "grade":"", "course_name":"","class_time":[],"location":""};
                        var time_json = {"course_day":"","course_start":"","course_end":""};
                        $('table').find('.tbody').find('.tr').filter(function(){
                            return 
                        })
                    }
                });
                
    })

});







router.get('/test', function(req, res){
    res.json({"message": "hello test"});
});

app.use('/api', router);
app.listen(app.get('port'),function(){
    console.log('Node app is running on port', app.get('port'));
});
