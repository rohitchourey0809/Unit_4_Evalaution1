const  express = require('express')
const app = express()

// <=========Middleware========>
app.use(logger)
app.get("/books",logger, (req, res) => {
    return res.send({ route: "/books"})
})

app.get("/libraries",logger,checkPermission("librarian"), (req, res) => {
    return res.send({ route: "/libraries", permission: true,role:req.role})
})
app.get("/authors",logger,checkPermission("author"), (req, res) => {
    return res.send({ route: "/authors", permission: true,role:req.role})
})

function logger(req,res,next){
    if(req.path == "/books")
    { 
        req.role = "/books"
    }
    else if(req.path == "/libraries")
    { 
        req.role = "/libraries"
    }
    else if(req.path == "/authors")
    { 
        req.role = "/authors"  
    }
    next()
      

}
// req.path = permission: true
// role ={permission: true}
function checkPermission(role)
{ 
  return function logger(req,res,next)
  { 
if(role == "librarian" && req.path == "/librarian" || role == "author" && req.path == "/author")
{ 
    return next()  
}
return res.send("notallowed")
// 
  
}
}



// if(req.path === "/libraries")
//  { 
     
//      return res.send(role)
//  }
//  else if(req.path === "/authors")
//  { 
//      return res.send(role)
//  }

app.listen(5001,()=>{
console.log("listening on")
})
