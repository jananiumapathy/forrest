var express = require('express')   // express for routing* - (i.e) user when requests like /login /register /home express will route particular path in here 
 
var server = express()   //  initializing that damn express into our server(node)(often calling it as Express App)
var path = require('path')  // path is declared. bcz we have to go into out html files folder. path will guide you home
var bodyparser = require('body-parser') // getting data from client(body)
server.use(bodyparser.urlencoded({extended:true}))
server.use(bodyparser.json())

var mongodb = require('./Databse/mongodb.js') // integrating out Mongodb Databas file..it is inside Database/ filder.. we can access that file using this varialble


server.use(express.static(path.join(__dirname,'client')))  // starting journey to get that shit login.html



// hairpin-bend - zero
server.get('/', function(req, res){ //now express came to action.   '/' is for default behavior. server get a initial request 
   res.sendFile(__dirname+"/client/views/login.html") // we will send that login.html for User
})





// hairpin-bend - one
// when Login //user requests its a login
server.post('/login ', function(req, res){ // oh someone sending his details from frontend ... we have to check those
      console.log(req.body)  // usually incomming data's are where is in query* . or inside body*
      // console.log(req.body) // if you want to see...that... uncomment this line. &run 
      res.send("Okay")// if someone asking ..we have to be respond. even it would be a look . Is shows in browser console
})


// im creating a insertiion to db from postman(request) 


server.post('/addvalue/frompost', function(req, res){ //postman request 

    //body has values
    console.log(req.body)
        // cool stuff with mongoose and nodejs
    mongodb.accounts({"name":req.body.name,"age":req.body.age})

})  //every request has a response


// hairpin-bend - two
// Registration
server.post('/register', function(req, res){  // we are goind to store the data to database

   console.log(req.body) // user have to give name,email details..
   
   // writing some database code

   // 1. check the user detail is already in db
   mongodb.accounts.findOne({name : req.body.name}, function(err, data){  // chekcing name, and it will give a callback(error and data)
      if(err){console.log(err)}
      else {
         console.log(data)  
         if(data==null){  // is null user details not available,..we have to add that new user
            mongodb.accounts({name:req.body.name,age:req.body.age}).save() // it will create new user in db
            .then((out)=>{
               console.log(out)
               res.send(out) // accoutn created
            })
            .catch((e)=>{
               console.log(e)
               res.send("error dod")
            })
         }
         else {   // throw him to login page if he is already registered
            res.redirect(301,'/login')
         }
      }
   }) 
   
})




server.listen(8080,(()=>{   // server starting listening on localhost = its 127.0.0.1:port   =>port is 8080
   console.log("visit http://localhost:8080")  // printing for our reference
})) /// you know these are... closing brackets.  :)



// files 
// package.json is an npm shit = its have all the details about our damn project.
// node_modules folder tons of nodejs Packages like express , body-parser, path, mongoose......