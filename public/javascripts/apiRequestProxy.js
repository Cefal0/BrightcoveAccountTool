var makeApiRequest = (function(window, document) {
	var bearer_id = document.getElementById('bearer_id'),
    requestType = document.getElementById('requestType'),
    apiBase = document.getElementById('apiBase'),
    apiRequest = document.getElementById('apiRequest'),
    apiBody = document.getElementById('apiBody'),
		options = {},
		proxyURL = 'https://cs1.brightcodes.net/jcefalo/acct_tool/proxy.php',
		apiResponse;

	apiRequestButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		let body = {
      bearer_id: accessTokenForm.elements.bearer_id.value,
      requestType: accessTokenForm.elements.requestType.value,
      apiBase: accessTokenForm.elements.apiBase.value,
      apiRequest: accessTokenForm.elements.apiRequest.value,
      apiBody: accessTokenForm.elements.apiBody.value
		};
		if (isDefined(bearer_id.value) && isDefined(apiRequest.value)) {
		// console.log(body); // checking purposes
		fetch('/makeApiRequest', {
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
				// console.log(data); // checking purposes
				apiResponse.innerText = data;
			});
		}
		else {
			alert("Bearer Token & API Request Required");
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
