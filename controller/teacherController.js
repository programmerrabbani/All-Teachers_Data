const path = require('path');
const { readFileSync, writeFileSync } = require('fs');


// control init

const teachers = JSON.parse(readFileSync(path.join(__dirname , '../db/teachers.json')));

//get teachers data 

const getAllTeacher = (req , res) =>{

    res.status(200).render('teacher/index' , {

        teachers : teachers

    });

}

//create teachers data 

const createTeacher = (req , res) =>{

    res.status(200).render('teacher/create')

}

// teachers data store

const teacherDataStore = (req , res) =>{

    // get all data

    const { name , cell , email , location } = req.body;


    // get last id

    let last_id = 1;

    if (teachers.length > 0) {
        
        last_id = teachers[teachers.length - 1].id + 1;

    }

    //  add new teachers

    teachers.push({
        id : last_id,
        name : name,
        email : email,
        cell : cell,
        location : location,
        photo : req.file ? req.file.filename :  "avatar.png",
        video: req.file ? req.file.filename : "video.png",
        audio: req.file ? req.file.filename : "audio.png"
    });

    // now write data to json db

    writeFileSync(path.join(__dirname , '../db/teachers.json') , JSON.stringify( teachers ));

    // redirect

    res.redirect('/teacher');

}




// exports control

module.exports = {
    getAllTeacher,
    createTeacher,
    teacherDataStore
};