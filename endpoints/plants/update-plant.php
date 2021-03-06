<?php

require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";

if( !$url_sections[1] || !is_numeric($url_sections[1])) {
	errorResponse();
}

$update_id = intval($url_sections[1]);

$plant = get_plant_by_id($update_id);

if(!$plant) {
	errorResponse(404);
}

$to_update = [];

$allowed_values = ["title","watering_frequency"];

foreach($response as $k => $v) {
	if($v !== $plant[$k] && in_array($k, $allowed_values)) {
		$to_update[$k] = $k;
	}
}

//MAKE SURE TITLE IS OK
if(in_array("title", array_keys($to_update)) && !$response['title']) {
	errorResponse(400, "no title");
}

if(plant_title_exists($response['title'])) {
	errorResponse(400,"title exists");
}

//MAKE UPDATE PACKAGE
if(!empty($response['photo_data']) && $response['photo_data'] !== get_photo_by_id($plant['photo_id']) ) {
	$photo_id = upload_image($to_update['photo_data'], "plant_img");
	if(!$photo_id) {
		errorResponse(500,"image_error");
	}
	$to_update['photo_id'] = $photo_id;
}
if(empty($to_update)) {
	errorResponse(304, "not_modified");
}
$to_update['date_modified'] = time();
$to_update['modified_by'] = $_SESSION['user']['id'];
$updated_item = update_item(array(
	"table" => "plants",
	"selector_value" => $plant['id'],
	"selector_key" => "id",
	"update_array" => $to_update
));


if(!$updated_item) {
	errorResponse(500, "not_updated");
}
echo json_encode(get_plant_by_id($updated_item['id']));
die();



	

?>
