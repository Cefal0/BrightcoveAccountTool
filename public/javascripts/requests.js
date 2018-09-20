var makeApiRequest = (function(window, document) {
  var bearer_id = document.getElementById("bearer_id"),
    policy_key = document.getElementById("policy_key"),
    requestType = document.getElementById("requestType"),
    apiBase = document.getElementById("apiBase"),
    apiPath = document.getElementById("apiPath"),
    apiRequest = document.getElementById("apiRequest"),
    apiBody = document.getElementById("apiBody"),
    apiResponse = document.getElementById("apiResponse"),
    apiRequestButton = document.getElementById("apiRequestButton"),
    apiRequestForm = document.getElementById("apiRequestForm"),
    response_status = document.getElementById("response_status"),
    options = {},
    api_response;

  apiRequestButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    let body = {
      bearer_id: apiRequestForm.elements.bearer_id.value,
      policy_key: apiRequestForm.elements.policy_key.value,
      apiBase: apiRequestForm.elements.apiBase.value,
      requestType: apiRequestForm.elements.requestType.value,
      apiRequest: apiRequestForm.elements.apiRequest.value,
      apiBody: apiRequestForm.elements.apiBody.value
    };
    // console.log("Button is Clicked");
    if (isDefined(bearer_id.value) && isDefined(apiRequest.value) || isDefined(policy_key.value) && isDefined(apiRequest.value)) {
      // console.log(body); // checking purposes
      fetch("/makeApiRequest", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          // console.log(response);
          if(response.status >= 200 && response.status < 300) {
            response_status.innerText = response.status;
            return response.json();
          }
        })
        .then(function(data) {
          // `data` is the parsed version of the JSON returned from the above endpoint.
          // console.log(data); // checking purposes
          // console.log(data.statusCode);
          if(apiRequestForm.elements.apiBase.value === "https://edge.api.brightcove.com/playback/v1") {
            if(data.statusCode >= 400) {
              response_status.innerText = data.statusCode;
              apiResponse.innerText = data.error;
            } else {
              apiResponse.innerText = JSON.stringify(data, null, 4);
            }
          }
          else if(apiRequestForm.elements.requestType.value === "GET") {
            if(data.statusCode >= 400) {
            response_status.innerText = data.statusCode;
            apiResponse.innerText = data.error;
            } else {
              apiResponse.innerText = data;
            }
          }
          else {
            if(data.statusCode >= 400) {
              response_status.innerText = data.statusCode;
              apiResponse.innerText = data.error;
            } else {
              apiResponse.innerText = JSON.stringify(data, null, 4);
            }
          }
        })
        .catch(err => {
          // console.log(err);
          apiResponse.innerText = err;
        });
    } else {
      alert("Bearer Token/Policy Key & API Call Required");
    }
  });

  /**
   * tests for all the ways a variable might be undefined or not have a value
   * @param {*} x the variable to test
   * @return {Boolean} true if variable is defined and has a value
   */
  function isDefined(x) {
    if (x === "" || x === null || x === undefined) {
      return false;
    }
    return true;
  }
})(window, document);
