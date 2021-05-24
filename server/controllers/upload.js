const aws = require('aws-sdk');
const asyncHandler = require("express-async-handler");

exports.uploadPhotos = asyncHandler((req,res,next)=>{

	aws.config.setPromisesDependency();
	aws.config.update({
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
		region: process.env.REGION
	});

	const files = req.files;
	const urlArray = [];
	
	if(files){ 
		const s3 = new aws.S3();
		files.map(async (file)=>{
			const params = {
				ACL: 'public-read',
				Bucket: process.env.BUCKET_NAME,
				Body: file.buffer,
				Key: file.originalname
			};

			try{
				const data = await s3.upload(params).promise();
				urlArray.push(data.Location);

				/* check whether the result urlArray is equal to files that need to
					 uploaded, if and only if they are equal, the result json can be 
					 sent
				*/
				if(urlArray.length === files.length){
					res.status(200)
						.json({
							success:{
								message:'Photos have been successfully uploaded',
								urlArray
							}
						})
				}
			} catch(err){
				console.log('Error occured while trying to upload to S3 bucket', err);
			}
		})
	}
})