<?php
// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection");

// note that if you are using this proxy for a single credential
// you can just hardcode the client id and secret below instead of passing them

$bearer_id     = $_POST["bearer_id"];
$request       = $_POST["apiRequest"];
$ch            = curl_init($request);
curl_setopt_array($ch, array(
        CURLOPT_POST           => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_SSL_VERIFYPEER => FALSE,
        CURLOPT_HTTPHEADER     => array(
            'Authorization: Bearer $bearer_id',
            'Content-type: application/json',
        )
    ));
$response = curl_exec($ch);
curl_close($ch);

// Check for errors
if ($response === FALSE) {
    die(curl_error($ch));
    echo 'An error occurred';
} else {
  echo $response;
}

?>
