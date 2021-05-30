
var express = require('express');
var path = require('path');
const session = require('express-session');
var app = express();
var fs = require('fs');
var alert = require ('alert');

const { title } = require('process');


function loadJSON (filename = '' ){
  return JSON.parse (
    fs.readFileSync(filename).toString());    
  
}
function saveJSON (filename = '' , json = '""') {
  return fs.writeFileSync(filename , JSON.stringify(json))
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh' , 
resave: false,   saveUninitialized: false,}));



app.get('/', function(req,res){
  res.render('login' , {err : ""});
});

app.get('/registration', function (req,res) {
  res.render('registration' , {err : ""}) ;
});
app.get('/register', function (req,res) {
  res.render('register');
});
app.get('/home', function(req, res){
  res.render('home');

});
app.get('/novel', function(req,res){
  res.render('novel');
});
app.get('/poetry', function(req,res){
  res.render('poetry');
});
app.get('/fiction', function(req,res){
  res.render('fiction');
});
app.get('/flies', function(req,res){
  res.render('flies' , {err : ""});
});
app.get('/grapes', function(req,res){
  res.render('grapes' , {err : ""});
});
app.get('/leaves', function(req,res){
  res.render('leaves' , {err : ""});
});
app.get('/sun', function(req,res){
  res.render('sun' , {err : ""});
});
app.get('/mockingbird', function(req,res){
  res.render('mockingbird' , {err : ""})
});
app.get('/dune', function(req,res){
  res.render('dune' , {err : ""})
});
app.get('/readlist', function(req,res){
  
  var data = loadJSON('readlists.json');
  var search = loadJSON('Search.json');
  var Search = [] ; 
  var List ; 
  
  for (i = 0 ;  i < data.length ; i ++ ){
    if (data[i].user == req.session.username){
      List = data[i].list ; 
      break ;}}
  for (j = 0 ; j < List.length ; j ++ ){
    for (k = 0 ; k < search.length ; k ++ ){
      if (List[j] == search[k].ejs ){
        Search.push(search[k]);
      }
    }
    

  }

  res.render('readlist' , { posts :Search});
});
app.get('/searchresults', function(req,res){
  res.render('searchresults', {posts : [] ,err:"" } );
});
app.post('/register', function (req,res){
  var x = req.body.username;
  var y = req.body.password;
  var users = loadJSON('users.json');
  var s = "";
  
  if (users.username.includes(x)){
    s = ("USERNAME already registered , Please use another one");
    res.render('registration.ejs' , {err : s});
  }
  else {
    var readlist = {user:x , list:[]};
    var readlists = loadJSON("readlists.json");
    readlists.push(readlist);
    saveJSON("readlists.json",readlists);
    users.username.push(x);
    users.password.push(y);
    alert("Registeration Successful")
    res.redirect('/')
  }
  saveJSON('users.json',users);
  
});
app.post('/',function (req,res){
  var x = req.body.username ;
  var y = req.body.password ;
  var users = loadJSON('users.json');
  var s = ""

  if (users.username.includes(x)){
    i = users.username.indexOf(x);
    var pas = users.password[i];
    if (pas == y ){
      res.locals.session = req.session;
      req.session.username = x ; 
      res.redirect('/home'); 
      
    }
    else {
      s = ("Password Incorrect, please resubmit ");
      res.render("login" , {err:s});

    }}
    else {
      s = ("Username Not Found, please register a new account");
      res.render("login" , {err:s});
  }});
app.post('/search',function(req,res){
  var x = loadJSON("Search.json");
  var data = [] ;
  var search =  req.body.Search.toUpperCase() ;
  var s = "" ; 
  for (i = 0 ; i < x.length ; i++){
    if (search == ''){
      break ;
    }
    if (x[i].name.toUpperCase().includes(search)){
      data.push(x[i]);
    }
  }
  if (data.length == 0 ){
    s = "Book not Found"
  }
  res.render('searchresults',{ posts :  data , err : s }  );
});
app.post('/flies' , function(req,res){
 var name = (req.originalUrl.slice(1)).toString(); 
 var readlist = loadJSON('readlists.json');
 var sess = req.session
 var s = ""
 for (i = 0 ;  i < readlist.length ; i ++ ){
   
  if ((readlist[i].user).toString() == sess.username ){
    if (readlist[i].list.includes(name)){
     s =  "Already in Readlist";
    }
    else {
    readlist[i].list.push(name); 
    saveJSON('readlists.json', readlist);
    s = ("Added to Readlist Successfully");
    break
    
  }}
  
}
res.render(name , {err :s }); 
});
app.post('/dune' , function(req,res){
  var name = (req.originalUrl.slice(1)).toString(); 
 var readlist = loadJSON('readlists.json');
 var sess = req.session
 var s = ""
 for (i = 0 ;  i < readlist.length ; i ++ ){
   
  if ((readlist[i].user).toString() == sess.username ){
    if (readlist[i].list.includes(name)){
     s =  "Already in Readlist";
    }
    else {
    readlist[i].list.push(name); 
    saveJSON('readlists.json', readlist);
    s = ("Added to Readlist Successfully");
    break
    
  }}
  
}
res.render(name , {err :s }); 
 });
 app.post('/grapes' , function(req,res){
  var name = (req.originalUrl.slice(1)).toString(); 
 var readlist = loadJSON('readlists.json');
 var sess = req.session
 var s = ""
 for (i = 0 ;  i < readlist.length ; i ++ ){
   
  if ((readlist[i].user).toString() == sess.username ){
    if (readlist[i].list.includes(name)){
     s =  "Already in Readlist";
    }
    else {
    readlist[i].list.push(name); 
    saveJSON('readlists.json', readlist);
    s = ("Added to Readlist Successfully");
    break
    
  }}
  
}
res.render(name , {err :s }); 
 });
 app.post('/leaves' , function(req,res){
  var name = (req.originalUrl.slice(1)).toString(); 
 var readlist = loadJSON('readlists.json');
 var sess = req.session
 var s = ""
 for (i = 0 ;  i < readlist.length ; i ++ ){
   
  if ((readlist[i].user).toString() == sess.username ){
    if (readlist[i].list.includes(name)){
     s =  "Already in Readlist";
    }
    else {
    readlist[i].list.push(name); 
    saveJSON('readlists.json', readlist);
    s = ("Added to Readlist Successfully");
    break
    
  }}
  
}
res.render(name , {err :s }); 
 });
 app.post('/mockingbird' , function(req,res){
  var name = (req.originalUrl.slice(1)).toString(); 
 var readlist = loadJSON('readlists.json');
 var sess = req.session
 var s = ""
 for (i = 0 ;  i < readlist.length ; i ++ ){
   
  if ((readlist[i].user).toString() == sess.username ){
    if (readlist[i].list.includes(name)){
     s =  "Already in Readlist";
    }
    else {
    readlist[i].list.push(name); 
    saveJSON('readlists.json', readlist);
    s = ("Added to Readlist Successfully");
    break
    
  }}
  
}
res.render(name , {err :s }); 
 });
 app.post('/sun' , function(req,res){
  var name = (req.originalUrl.slice(1)).toString(); 
  var readlist = loadJSON('readlists.json');
  var sess = req.session
  var s = ""
  for (i = 0 ;  i < readlist.length ; i ++ ){
    
   if ((readlist[i].user).toString() == sess.username ){
     if (readlist[i].list.includes(name)){
      s =  "Already in Readlist";
     }
     else {
     readlist[i].list.push(name); 
     saveJSON('readlists.json', readlist);
     s = ("Added to Readlist Successfully");
     break
     
   }}
   
 }
 res.render(name , {err :s }); 
 });
 
      
if(process.env.PORT){
  app.listen(process.env.PORT, function(){
    console.log("server started")
  })
}
else {
  app.listen(3000,function(){
    console.log("server started on port 3000")
  } )
}

 








