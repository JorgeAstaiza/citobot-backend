const getSSL = (req = request, res = response) => {
	res.sendFile('/home/ubuntu/citobot-backend/.well-known/pki-validation/F746520E45C85532499CBEA4CA728FF8.txt');
};
module.exports = {
	getSSL
};
