<?php
if(!$_SESSION['reset_token_verified']) {
  errorResponse(400, array("msg"=> "Bad Token"));
}
$mailError = array(
	"msg" => "Bad Email",
	"type" => "Bad Format"
)
if (!filter_var($response['email'], FILTER_VALIDATE_EMAIL) || get_user_by_email($response['email'])) {
	errorResponse(400, $mailError);
}
$new_password = pw_hasher($response['password']);

$update_package = array(
  "db" => "users",
  "update_column" => "password",
  "update_value" => $new_password,
  "selector_key" => "email",
  "selector_value" => $response['email']
)

$updated_pass = update_item($update_package);

if(!$updated_pass) {
  $error = array(
    "msg" => "Couldn't Update"
  )
  errorResponse(500, $error);
}
echo json_encode(array(
  "msg" => "Password updated Successfully",
  "success" => true
));
die();

?>
