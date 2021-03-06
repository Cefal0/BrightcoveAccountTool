const express = require("express");
const router = express.Router();
const request = require("request-promise-native");
/* post requets */
router.post("/", function(req, res, next) {
  // console.log(req.body);
  const bearerToken = req.body.bearer_id;
  const policyKey = req.body.policy_key;
  const apiBase = req.body.apiBase;
  if(req.body.apiBase === "https://edge.api.brightcove.com/playback/v1") {
    // console.log("Using Policy Key");
    const makeApiRequest = request ({
      method: req.body.requestType,
      url: `${req.body.apiRequest}`,
      headers: {
        Authorization: `BCOV-Policy ${policyKey}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      // console.log(response);
      const apiResponse = JSON.parse(response);
      return res.json(apiResponse);
    })
    .catch(err => {
      // console.log(err);
      return res.json(err);
    });
  }
  else if(req.body.requestType === "GET") {
    // console.log("Method is GET");
    const makeApiRequest = request({
      method: req.body.requestType,
      url: `${req.body.apiRequest}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        // const apiResponse = JSON.parse(response).api_response;
        // console.log(response);
        const apiResponse = response;
        return res.json(apiResponse);
      })
      .catch(err => {
        // console.log(err);
        return res.json(err);
      });
  } else {
    const makeApiRequest = request({
      method: req.body.requestType,
      url: `${req.body.apiRequest}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json"
      },
      body: req.body.apiBody
    })
      .then(response => {
        const apiResponse = JSON.parse(response);
        // console.log("Response from Request: " + apiResponse);
        return res.json(apiResponse);
      })
      .catch(err => {
        return res.json(err);
      });
  }
});

module.exports = router;
