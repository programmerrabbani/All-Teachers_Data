const express = require('express');
const { getAllTeacher, createTeacher, teacherDataStore } = require('../controller/teacherController');
const multer = require('multer');
const path = require('path');

// init routes

const router = express.Router();

// multer config

const storage = multer.diskStorage({

    destination: (req , file , cb) =>{
        cb(null , path.join(__dirname , '../public/images/teachers'));
        cb(null , path.join(__dirname , '../public/videos/teachers'));
        cb(null , path.join(__dirname , '../public/audios/teachers'));
    },
    filename: (req , file , cb) =>{
        cb(null , Date.now() + '_' + file.originalname);
    }

});

const teacherPhotoMulter = multer({
    storage : storage
}).single('teacher-photo');
const teacherVideoMulter = multer({
storage: storage
}).single('teacher-video');
const teacherAudioMulter = multer({
storage: storage
}).single('teacher-audio');

// make route

router.get('/', getAllTeacher);
router.get('/create', createTeacher );
router.post('/create', teacherPhotoMulter , teacherVideoMulter , teacherAudioMulter ,teacherDataStore );


// export router

module.exports = router;
