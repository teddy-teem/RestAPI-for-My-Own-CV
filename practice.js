
/*
    Ttile: CDP API Creation..
    Members: Jahid, 
    Date: 
 */

    //Dependence
    const koa = require("koa");
    const router = require("koa-router");
    const myfile =  require("./fileHandler.js");
    
    
    let apps = new koa();
    let myRouter = new router();
    
    //Show data using GET Method
    myRouter.get('/iam',  async (ctx)=>{
     ctx.body = "I am"
    });

      
    
    
    
    apps.use(myRouter.routes());
    apps.listen(3000, ()=>{
        console.log("Server Listening on Port "+ 3000);
    });