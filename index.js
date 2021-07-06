
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
let jsonData = null;
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
myRouter.get('/:name',  async (ctx)=>{
    if(ctx.params.name == "jahid"){
        jsonData =  myfile.show('basic.json');
        try{
            ctx.body = jsonData;
        }
        catch(e){
           throw console.error();
        }
    }
    else{
        ctx.body = "Check Url Please!";
    }
   
});
myRouter.get('/:name/:pageName',  async (ctx)=>{
    if(ctx.params.name == "jahid"){
        let filename = ctx.params.pageName+'.json';
        jsonData =  myfile.show(filename);
    
         try{
             ctx.body = jsonData;
         }
         catch(e){
            throw console.error();
         }
    }
    else{
        ctx.body = "Check Url Please";
    }
    
});
myRouter.get('/:name/:pageName/:item',  async (ctx)=>{
    if(ctx.params.name == "jahid"){
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
            console.log(jsonFile)

            if(ctx.params.item == 'activities')
                jsonData = jsonFile.activities;
            else if(ctx.params.item == 'onlineplatform'){
                jsonData = jsonFile.onlineplatform;
            }
            else if(ctx.params.item == 'languages')
                jsonData = jsonFile.languages;
            else if(ctx.params.item == 'whoknowsme')
                jsonData = jsonFile.whoknowsme;
            else{
                jsonData = {message: "No Data Found"};
                console.log(ctx.params.item);
            }
        }
        else{
            console.log("No Page found with "+ ctx.params.pageName +" name")
        }
        console.log(ctx.params.item);
         ctx.body = jsonData;
     }
     catch(e){
        throw console.error();
     }
    }
    else{
        ctx.body = "Check Url Please!"
    }
    
});
myRouter.get('/:name/:pageName/:item/:id',  async (ctx)=>{
    if(ctx.params.name == "jahid"){
         let filename ;
         let jsonFile;
     try{
        if(ctx.params.pageName == "journey"){
            filename = ctx.params.pageName+'.json';
            jsonFile =  myfile.show(filename);
            if(ctx.params.item == 'education')
                jsonData = jsonFile.education[ctx.params.id-1];
            else if(ctx.params.item == 'training')
                jsonData = jsonFile.training[ctx.params.id-1];
            else if(ctx.params.item == 'projects')
                jsonData = jsonFile.projects[ctx.params.id-1];
            else if(ctx.params.item == 'skills')
                jsonData = jsonFile.skills[ctx.params.id-1];
            else if(ctx.params.item == 'awards')
                jsonData = jsonFile.awards[ctx.params.id-1];
             else
                jsonData = {message: "No Data Found"};
    
        }
        else if(ctx.params.pageName == "extra"){
            filename = ctx.params.pageName+'.json';
            jsonFile =  myfile.show(filename);

            if(ctx.params.item == 'activities')
                jsonData = jsonFile.activities[ctx.params.id-1];
            else if(ctx.params.item == 'onlineplatform'){
                jsonData = jsonFile.onlineplatform[ctx.params.id-1];
            }
            else if(ctx.params.item == 'languages')
                jsonData = jsonFile.languages[ctx.params.id-1];
            else if(ctx.params.item == 'whoknowsme')
                jsonData = jsonFile.whoknowsme[ctx.params.id-1];
            else{
                jsonData = {message: "No Data Found"};
            }
        }
        else{
            console.log("No Page found with "+ ctx.params.pageName +" name")
        }
         ctx.body = jsonData;
     }
     catch(e){
        throw console.error();
     }
    }
    else{
        ctx.body = "Check Url Please!"
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
        ctx.body = "Data Inserted Failed " + ctx.params.name.toLocaleLowerCase();
    }
    console.log(myfile.insertData(receivedData));   
});
  



apps.use(myRouter.routes());
apps.listen(3000, ()=>{
    console.log("Server Listening on Port "+ 3000);
});