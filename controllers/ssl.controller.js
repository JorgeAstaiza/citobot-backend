const getSSL = (req = request, res = response) => {
	res.sendFile('/home/ubuntu/citobot-backend/.well-known/2A6C7761D4D4C8DAFD0E56D4048937B4.txt');
};
module.exports = {
	getSSL
};
