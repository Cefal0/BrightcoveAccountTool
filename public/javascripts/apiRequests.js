var processRequest = (function(window, document) {
  var $bearer_id = document.getElementById("bearer_id"),
    $requestType = document.getElementById("requestType"),
    $apiRequest = document.getElementById("apiRequest"),
    $apiBody = document.getElementById("apiBody"),
    $apiRequestButton = document.getElementById("apiRequestButton"),
    $response = document.getElementById("response");

  // is defined
  function isDefined(x) {
    if (x === "" || x === null || x === undefined) {
      return false;
    }
    return true;
  }

  // function to remove spaces and line breaks
  function cleanString(str) {
    if (str !== "") {
      // remove line breaks
      str = str.replace(/(\r\n|\n|\r)/gm, "");
      // remove spaces
      // here we have to be careful - spaces fine within strings
      // but not outside them
      str = JSON.stringify(JSON.parse(str));
      return str;
    } else {
      return;
    }
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

  // function to submit Request
  submitRequest = function() {
    var httpRequest = new XMLHttpRequest(),
      parsedData,
      options = {};
    if (isDefined($bearer_id.value)) {
      options.bearer_id = $bearer_id.value;
    }
    if (isDefined($apiBody.value)) {
      options.apiBody = cleanString($apiBody.value);
    }
    options.requestType = $requestType.value;
    options.apiRequest = $apiRequest.value;
    // console.log("options", options);
    getResponse = function() {
      try {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status >= 200 && httpRequest.status < 300) {
            // console.log("response", httpRequest.responseText);
            if (isJson(httpRequest.responseText)) {
              parsedData = JSON.parse(httpRequest.responseText);
              $response.textContent = JSON.stringify(parsedData, null, "  ");
            } else {
              $response.textContent = httpRequest.responseText;
            }
          } else {
            alert(
              "There was a problem with the request. Request returned " +
                httpRequest.status
            );
          }
        }
      } catch (e) {
        alert("Caught Exception: " + e);
      }
    };
    // set response handler
    httpRequest.onreadystatechange = getResponse;
    // open the request
    if ($requestType.value === 'GET' ) {
      httpRequest.open('GET', options.apiRequest);
    }
    if ($requestType.value === 'POST' ) {
      httpRequest.open('POST', options.apiRequest);
    }
    if ($requestType.value === 'PUT' ) {
      httpRequest.open('PUT', options.apiRequest);
    }
    if ($requestType.value === 'PATCH' ) {
      httpRequest.open('PATCH', options.apiRequest);
    }
    if ($requestType.value === 'DELETE' ) {
      httpRequest.open('DELETE', options.apiRequest);
    }

    // set request headers
    httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
    httpRequest.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    httpRequest.setRequestHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    httpRequest.setRequestHeader('Authorization', 'Bearer ' + $bearer_id.value);
    httpRequest.setRequestHeader('Content-type', 'application/json');
    // open and send request
    httpRequest.send(JSON.stringify(options));
  };
  $apiRequestButton.addEventListener("click", submitRequest);
})(window, document);
