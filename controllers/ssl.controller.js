const getSSL = (req = request, res = response) => {
	res.sendFile('/home/ubuntu/citobot-backend/.well-known/pki-validation/3C354193A6BA8D8627B16431AA041FB2.txt');
};
module.exports = {
	getSSL
};
