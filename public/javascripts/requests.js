var makeApiRequest = (function(window, document) {
  var bearer_id = document.getElementById("bearer_id"),
    requestType = document.getElementById("requestType"),
    apiBase = document.getElementById("apiBase"),
    apiPath = document.getElementById("apiPath"),
    apiRequest = document.getElementById("apiRequest"),
    apiBody = document.getElementById("apiBody"),
    apiResponse = document.getElementById("apiResponse"),
    apiRequestButton = document.getElementById("apiRequestButton"),
    apiRequestForm = document.getElementById("apiRequestForm"),
    options = {},
    api_response;

  apiRequestButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    let body = {
      bearer_id: apiRequestForm.elements.bearer_id.value,
      requestType: apiRequestForm.elements.requestType.value,
      apiRequest: apiRequestForm.elements.apiRequest.value,
      apiBody: apiRequestForm.elements.apiBody.value
    };
    console.log("Button is Clicked");
    if (isDefined(bearer_id.value) && isDefined(apiRequest.value)) {
      console.log(body); // checking purposes
      fetch("/makeApiRequest", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(function(data) {
          // `data` is the parsed version of the JSON returned from the above endpoint.
          console.log(data); // checking purposes
          apiResponse.innerText = JSON.stringify(data);
        });
    } else {
      alert("Bearer Token & API Call Required");
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
})(window, document);
