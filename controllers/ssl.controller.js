const getSSL = (req = request, res = response) => {
	res.sendFile('/home/ubuntu/citobot-backend/.well-known/pki-validation/AC28822CE4F02AE6E290E5322AD73EE8.txt');
};
module.exports = {
	getSSL
};
