
/*
    Ttile: CDP API Creation..
    Members: Jahid, 
    Date: 
 */

    //Dependence
const koa = require("koa");
const router = require("koa-router");
const myfile =  require("./fileHandler.js");
const body = require("koa-body");


let apps = new koa();
let myRouter = new router();
let jsonData;
let bodyParser = new body();

//Show data using GET Method
myRouter.get('/',  async (ctx)=>{
 jsonData =  myfile.show('basic.json');
  try{
      ctx.body = jsonData;
  }
  catch(e){
     throw console.error();
  }
});
myRouter.get('/jahid',  async (ctx)=>{
    jsonData =  myfile.show('basic.json');
     try{
         ctx.body = jsonData;
     }
     catch(e){
        throw console.error();
     }
});
myRouter.get('/jahid/:pageName',  async (ctx)=>{
    let filename = ctx.params.pageName+'.json';
    jsonData =  myfile.show(filename);

     try{
         ctx.body = jsonData;
     }
     catch(e){
        throw console.error();
     }
});
myRouter.get('/jahid/:pageName/:item',  async (ctx)=>{
    let filename ;
    let jsonFile;
     try{
        if(ctx.params.pageName == "journey"){
            filename = ctx.params.pageName+'.json';
            jsonFile =  myfile.show(filename);
            if(ctx.params.item == 'education')
                jsonData = jsonFile.education;
            else if(ctx.params.item == 'training')
                jsonData = jsonFile.training;
            else if(ctx.params.item == 'projects')
                jsonData = jsonFile.projects;
            else if(ctx.params.item == 'skills')
                jsonData = jsonFile.skills;
            else if(ctx.params.item == 'awards')
                jsonData = jsonFile.awards;
             else
                jsonData = {message: "No Data Found"};
    
        }
        else if(ctx.params.pageName == "extra"){
            filename = ctx.params.pageName+'.json';
            jsonFile =  myfile.show(filename);
            if(ctx.params.item == 'activities')
                jsonData = jsonFile.activities;
            else if(ctx.params.item == 'onlinePlatform')
                jsonData = jsonFile.onlinePlatform;
            else if(ctx.params.item == 'languages')
                jsonData = jsonFile.languages;
            else if(ctx.params.item == 'whoknowsme')
                jsonData = jsonFile.whoknowsme;
            else
                jsonData = {message: "No Data Found"};
        }
        else{
            console.log("No Page found with "+ ctx.params.pageName +" name")
        }
         ctx.body = jsonData;
     }
     catch(e){
        throw console.error();
     }
});

myRouter.post('/:name/:pageName/:item', bodyParser,  async (ctx)=>{
    ctx.body = "Data is Inserting..."
    let receivedData = {
        rawData: JSON.parse(ctx.request.body),
        rawDataHeader: ctx.header,
        pageName: ctx.params.pageName.toLocaleLowerCase(),
        item: ctx.params.item.toLocaleLowerCase(),
        name: ctx.params.name.toLocaleLowerCase()
    }
    if(myfile.insertData(receivedData)){
        ctx.body = "Data Inserted Successfully";
    }
    else{
        ctx.body = "Data Inserted Failed" + ctx.params.name.toLocaleLowerCase();
    }
    
});
  



apps.use(myRouter.routes());
apps.listen(3000, ()=>{
    console.log("Server Listening on Port "+ 3000);
});