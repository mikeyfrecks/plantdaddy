<?php
require 'db_connect.php';
if(!$need_to_install) {
  $info_box_content='<p>You&rsquo;ve already installed Plantdaddy.</p> <a href="/login/">Login Now</a>';
	require "info_box.php";
	die();
}
$errors = false;

$users_table = "CREATE TABLE users (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL DEFAULT '',
  password VARCHAR(255) NOT NULL ,
first_name VARCHAR(255) NOT NULL,
photo_id VARCHAR(255),
telephone INT(10),
color VARCHAR(255) NOT NULL,
reset_asked TINYINT(1) DEFAULT 0,
reset_token char(64) DEFAULT NULL,
reset_expires  BIGINT(20) NOT NULL DEFAULT 0,
  date_created BIGINT(20) NOT NULL DEFAULT 0,
  date_modified BIGINT(20) NOT NULL DEFAULT 0
)";

$tokens_table = "CREATE TABLE tokens (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  selector BIGINT(20) NOT NULL DEFAULT 0,
  hashedValidator char(64),
  user_id BIGINT(20) UNSIGNED NOT NULL default 0,
  expires BIGINT(20) NOT NULL DEFAULT 0
)";

$plants_table = "CREATE TABLE plants (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  photo_id VARCHAR(255),
  watering_frequency SMALLINT(10) NOT NULL DEFAULT 3,
	on_alert TINYINT(1) NOT NULL DEFAULT 0,
  created_by BIGINT(20) UNSIGNED NOT NULL default 0,
  date_created BIGINT(20) NOT NULL DEFAULT 0,
	date_modified BIGINT(20) NOT NULL DEFAULT 0,
	modified_by BIGINT(20) UNSIGNED NOT NULL default 0
)";

$waterings_table = "CREATE TABLE waterings (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  plant_id BIGINT(20) UNSIGNED NOT NULL,
  created_by BIGINT(20) UNSIGNED NOT NULL default 0,
  date_created BIGINT(20) NOT NULL DEFAULT 0
)";

$images_table = "CREATE TABLE images (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url TEXT NOT NULL,
  created_by BIGINT(20) UNSIGNED NOT NULL default 0,
  date_created BIGINT(20) NOT NULL DEFAULT 0,
	date_modified BIGINT(20) NOT NULL DEFAULT 0,
	modified_by BIGINT(20) UNSIGNED NOT NULL default 0
)";

$create_plants = mysqli_query($db_conn, $plants_table);
$create_tokens = mysqli_query($db_conn, $tokens_table);
$create_users = mysqli_query($db_conn, $users_table);
$create_waterings = mysqli_query($db_conn, $waterings_table);
$create_images = mysqli_query($db_conn, $images_table);
if(!$create_plants || !$create_tokens || !$create_users || !$create_waterings || !$create_images) {
  $info_box_content = 'Something went wrong. Delete Plantdaddy and try again.';
	include "info_box.php";
	die();
	
}
$info_box_content = '<p>Plantdaddy database was successfully installed.</p><a href="/login/">Log into Plantdaddy</a>';
include "info_box.php";
die();

?>
