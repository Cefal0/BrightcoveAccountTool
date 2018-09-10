var makeApiRequest = (function(window, document) {
	var bearer_id = document.getElementById('bearer_id'),
		requestType = document.getElementById('requestType'),
		apiBase = document.getElementById('apiBase'),
		apiPath = document.getElementById('apiPath'),
		apiRequest = document.getElementById('apiRequest'),
    apiBody = document.getElementById('apiBody'),
		apiResponse = document.getElementById('apiResponse'),
    apiRequestButton = document.getElementById('apiRequestButton'),
    apiRequestForm = document.getElementById('apiRequestForm'),
		options = {},
		proxyURL = './requestProxy.php',
		api_response;

	apiRequestButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		let body = {
			apiRequest: apiRequestForm.elements.apiRequest.value,
			apiBody: apiRequestForm.elements.apiBody.value
		};
    console.log("Button is Clicked");
		if (isDefined(bearer_id.value) && isDefined(apiRequest.value)) {
		console.log(body); // checking purposes
		fetch('/makeApiRequest', {
			method: 'GET',
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
				apiResponse.innerText = data;
			});
		}
		else {
			alert("Bearer Token & API Call Required");
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
							console.log("response", httpRequest.responseText);
							// check for completion
							responseRaw = JSON.parse(httpRequest.responseText);
							callback(responseRaw);
						}
					}
				} catch (e) {
					alert('Caught Exception: ' + e);
				}
			};
		// set up request data
		requestParams = 'bearer_id=' + options.bearer_id + '&apiRequest=' + options.apiRequest;
		// set response handler
		httpRequest.onreadystatechange = getResponse;
		// open the request
		httpRequest.open('GET', proxyURL);
		// set headers
		httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
		httpRequest.setRequestHeader('Content-Type', 'application/json');
		// open and send request
		httpRequest.send(requestParams);
	}
})(window, document);
