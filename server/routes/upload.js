const express = require('express');
const router = express.Router();
const multer = require('multer');
const {uploadPhotos} = require('../controllers/upload');
// const {check_max_photos} = require('../middleware/upload');

// const {check_max_photos} = require('../middleware/upload')

const storage = multer.memoryStorage({
	destination: function(req,file,callback){
		callback(null,'')
	}
});

const MAX_PHOTO_SIZE = 5;
const FOLDER_NAME = 'photos';

const multipleUpload = multer({storage:storage})
	.array(FOLDER_NAME,MAX_PHOTO_SIZE);

router.route('/upload').post(
	multipleUpload, uploadPhotos
);

module.exports = router;