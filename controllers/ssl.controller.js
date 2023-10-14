const getSSL = (req = request, res = response) => {
	res.sendFile('/home/ubuntu/citobot-backend/.well-known/pki-validation/E47563CD58A1705D29BB63CBE2714737.txt');
};
module.exports = {
	getSSL
};
