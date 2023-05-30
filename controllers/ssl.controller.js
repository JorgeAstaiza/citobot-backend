const getSSL = (req = request, res = response) => {
	res.sendFile(
		'/Users/jorge.astaiza/Documents/projects/citobot/backend/.well-known/590FA4162D798F2C4B3DED515776A14B.txt'
	);
};
module.exports = {
	getSSL
};
