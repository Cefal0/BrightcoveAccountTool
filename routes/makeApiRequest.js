const express = require('express');
const router = express.Router();
const request = require('request-promise-native');
/* GET requets */
router.post('/', function(req, res, next) {
	console.log(req);
	const bearerToken = Buffer.from(`${req.body.bearer_id}`).toString('base64');
	const makeApiRequest = request({
		method: 'GET',
		url: `${req.body.apiRequest}`,
		headers: {
			Authorization: `Bearer ${bearerToken}`,
			'Content-Type': 'application/json'
		}
	}).then(response => {
		const apiResponse = JSON.parse(response).api_response;
		console.log(apiResponse);
		res.json(apiResponse);
	});
});

module.exports = router;
