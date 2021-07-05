
const fs = require('fs');

let file = {};
file.show = (fileName)=>{
    let data = fs.readFileSync('./Jahid/'+fileName, (e, d)=>{
        if(e){
            
            return  { message: "Error"}  
        }
        else{
            return d;
        }
    });
    return JSON.parse(data);
    
}
file.write = (filename, data)=>{
    fs.writeFileSync('./Jahid/' + filename+'.json', JSON.stringify(data), (e)=>{
        if(e) console.log("Error occuared")
        else return console.log("Successful");
    } );

}

file.insertData = (fileObject)=>{
    if(fileObject.name == "jahid"){
        if(fileObject.pageName == "journey" || fileObject.pageName == "extra"){
            if(fileObject.item == "education" || fileObject.item == "training" || fileObject.item == "projects" || fileObject.item == "skills" || fileObject.item == "awards"
            || fileObject.item == "activities" || fileObject.item == "onlinePlatform"|| fileObject.item == "languages" || fileObject.item == "whoknowsme"){
               insertIntoFile(fileObject, file.write);
               return 1;
            }
            else{
                return 0;
            }
        }else if(fileObject.pageName == "extra"){
            return 1;
        }
        else{
            return 0;
        }
    }
    else{
        console.log("OK");
        return 0;
    }
    
}
 function insertIntoFile(fileObject, callback){
    let existingData = file.show(fileObject.pageName + ".json");
    let insertObject = {};
    if(fileObject.item == "education"){
        insertObject =  {
            id: existingData[fileObject.item].length + 1,
            level: fileObject.rawData.level,
            instituteName: fileObject.rawData.instituteName,
            certificationName: fileObject.rawData.certificationName,
            disciplineMajor: fileObject.rawData.disciplineMajor,
            resultInCGPA: fileObject.rawData.resultInCGPA,
            passingTime: fileObject.rawData.passingTime
        }
    }
    else if(fileObject.item == "training"){
        insertObject =  {
            id: existingData[fileObject.item].length + 1,
            trainingTitle: fileObject.rawData.trainingTitle,
            instituteName: fileObject.rawData.instituteName,
            jobType: fileObject.rawData.jobType,
            description: fileObject.rawData.description
        }
    }
    else if(fileObject.item == "skills"){
        insertObject =  {
            id: existingData[fileObject.item].length + 1,
            title: fileObject.rawData.title,
            skill: fileObject.rawData.skill,
            level: fileObject.rawData.level
        }
    }
    else if(fileObject.item == "awards"){
        insertObject =  {
            id: existingData[fileObject.item].length + 1,
            awardTitle: fileObject.rawData.awardTitle,
            rank: fileObject.rawData.rank,
            description: fileObject.rawData.description
        }
    }
    else if(fileObject.item == "activities"){
        insertObject =  {
            id: existingData[fileObject.item].length + 1,
            club: fileObject.rawData.club,
            position: fileObject.rawData.position,
            time: fileObject.rawData.time,
            description: fileObject.rawData.description
        }
    }
    else if(fileObject.item == "onlinePlatform"){
        insertObject =  {
            id: existingData[fileObject.item].length + 1,
            platformName: fileObject.rawData.platformName,
            username: fileObject.rawData.username
        }
    }
    else if(fileObject.item == "languages"){
        insertObject =  {
            id: existingData[fileObject.item].length + 1,
            languageName: fileObject.rawData.languageName,
            proficiency: fileObject.rawData.proficiency,
            speaking: fileObject.rawData.speaking,
            writing: fileObject.rawData.writing,
            reading: fileObject.rawData.reading,
        }
    }
    else if(fileObject.item == "whoknowsme"){
        insertObject =  {
            id: existingData[fileObject.item].length + 1,
            name: fileObject.rawData.name,
            designation: fileObject.rawData.designation,
            address: fileObject.rawData.address,
            mob: fileObject.rawData.mob,
            email: fileObject.rawData.email
        }
    }
    if(existingData!=null || existingData!="undefined"){
        existingData[fileObject.item].push(insertObject);
        callback(fileObject.pageName, existingData);
    }
    else{
        console.log("Data Not Found! ");
    } 
}



module.exports = file;

