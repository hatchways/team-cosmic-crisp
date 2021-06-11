const aws = require('aws-sdk');
const asyncHandler = require('express-async-handler');

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

exports.uploadPhotos = asyncHandler((req, res, next) => {
  const files = req.files;
  const urlArray = [];

  if (files) {
    const s3 = new aws.S3();
    files.map(async (file) => {
      const params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: file.buffer,
        Key: file.originalname,
      };

      try {
        const data = await s3.upload(params).promise();
        urlArray.push(data.Location);

        /* check whether the result urlArray is equal to files that need to
					 uploaded, if and only if they are equal, the result json can be 
					 sent
				*/
        if (urlArray.length === files.length) {
          res.status(200).json({
            success: {
              message: 'Photos have been successfully uploaded',
              urlArray,
            },
          });
        }
      } catch (err) {
        res.status(400);
        throw new Error('Error occured during uploading');
      }
    });
  }
});

exports.deletePhotos = asyncHandler(async (req, res, next) => {
  const { urls } = req.body;
  const arr = [];
  if (urls && urls.length > 0) {
    urls.forEach((url) => {
      let key = url.split('/').pop();
      arr.push({ Key: key });
    });
  }

  const s3 = new aws.S3();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Delete: { Objects: arr },
  };
  try {
    const data = await s3.deleteObjects(params).promise();
    res.status(200).json({
      success: {
        message: 'Successfully deleted image',
        data: data,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error('Error when delete images');
  }
});
