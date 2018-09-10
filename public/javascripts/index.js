var getAccessToken = (function(window, document) {
	var clientId = document.getElementById('clientId'),
		clientSecret = document.getElementById('clientSecret'),
		accessToken = document.getElementById('accessToken'),
		accessTokenForm = document.getElementById('accessTokenForm'),
		accessTokenButton = document.getElementById('accessTokenButton'),
		apiResponse = document.getElementById('apiResponse'),
		options = {},
		proxyURL = 'https://cs1.brightcodes.net/jcefalo/acct_tool/proxy.php',
		access_token;

	accessTokenButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		let body = {
			clientId: accessTokenForm.elements.clientId.value,
			clientSecret: accessTokenForm.elements.clientSecret.value
		};
		console.log("Button is Clicked");
		if (isDefined(clientId.value) && isDefined(clientSecret.value)) {
		console.log(body); // checking purposes
		fetch('/getAccessToken', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				return response.json();
			})
			.then(function(data) {
				// `data` is the parsed version of the JSON returned from the above endpoint.
				console.log(data); // checking purposes
				accessToken.innerText = data;
			});
		}
		else {
			alert("Client ID & Client Secret Required");
		}
	});

	/**
	 * tests for all the ways a variable might be undefined or not have a value
	 * @param {*} x the variable to test
	 * @return {Boolean} true if variable is defined and has a value
	 */
	function isDefined(x) {
		if (x === '' || x === null || x === undefined) {
			return false;
		}
		return true;
	}

	/*
 * tests to see if a string is json
 * @param {String} str string to test
 * @return {Boolean}
 */
	function isJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	/**
	 * send API request to the proxy
	 * @param  {Object} options options for the request
	 * @param  {String} requestID the type of request = id of the button
	 * @param  {Function} [callback] callback function
	 */
	function makeRequest(options, callback) {
		var httpRequest = new XMLHttpRequest(),
			responseRaw,
			requestParams,
			// response handler
			getResponse = function() {
				try {
					if (httpRequest.readyState === 4) {
						if (httpRequest.status >= 200 && httpRequest.status < 300) {
							// check for completion
							responseRaw = httpRequest.responseText;
							callback(responseRaw);
						}
					}
				} catch (e) {
					alert('Caught Exception: ' + e);
				}
			};
		// set up request data
		requestParams = 'client_id=' + options.client_id + '&client_secret=' + options.client_secret;

		// set response handler
		httpRequest.onreadystatechange = getResponse;
		// open the request
		httpRequest.open('POST', proxyURL);
		// set headers
		httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// open and send request
		httpRequest.send(requestParams);
	}
})(window, document);
