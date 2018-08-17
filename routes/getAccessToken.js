const express = require('express');
const router = express.Router();
const request = require('request-promise-native');
/* GET home page. */
router.post('/', function(req, res, next) {
	console.log(req);
	const authString = Buffer.from(`${req.body.clientId}:${req.body.clientSecret}`).toString('base64');
	const getAccessToken = request({
		method: 'POST',
		url: 'https://oauth.brightcove.com/v3/access_token?grant_type=client_credentials',
		headers: {
			Authorization: `Basic ${authString}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: 'grant_type=client_credentials'
	}).then(response => {
		const accessToken = JSON.parse(response).access_token;
		console.log(accessToken);
		res.json(accessToken);
	});
});

module.exports = router;
