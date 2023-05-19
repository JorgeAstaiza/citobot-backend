const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } = require('./config.js');

const fs = require('fs');

const client = new S3Client({
	region: AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: AWS_PUBLIC_KEY,
		secretAccessKey: AWS_SECRET_KEY
	}
});

const uploadFile = async (file, name) => {
	const stream = fs.createReadStream(file.tempFilePath);
	const uploadParams = {
		Bucket: AWS_BUCKET_NAME,
		Key: name,
		Body: stream
	};
	const command = new PutObjectCommand(uploadParams);
	return await client.send(command);
};

const getFile = async fileName => {
	if (fileName) {
		const command = new GetObjectCommand({
			Bucket: AWS_BUCKET_NAME,
			Key: fileName
		});
		return await client.send(command);
	}
};

const downloadFile = async fileName => {
	if (fileName) {
		const command = new GetObjectCommand({
			Bucket: AWS_BUCKET_NAME,
			Key: fileName
		});
		try {
			const result = await client.send(command);
			console.log(result);
			result.Body.pipe(fs.createWriteStream(`./images/${fileName}`));
		} catch (error) {
			console.log('error ', error);
		}
	}
};

const getFileURL = async fileName => {
	if (fileName) {
		const command = new GetObjectCommand({
			Bucket: AWS_BUCKET_NAME,
			Key: fileName
		});
		return await getSignedUrl(client, command, { expiresIn: 3600 });
	}
};

module.exports = { uploadFile, getFile, downloadFile, getFileURL };
