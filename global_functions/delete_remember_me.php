<?php
function delete_remember_me() {
  global $db_conn;
   $credentials = json_decode($_COOKIE['plantdaddy_remember_me'],true);
   $sql =  "DELETE FROM tokens WHERE selector=".intval($credentials['selector']);
   $deleted_token =  mysqli_query($db_conn, $sql);
   if($deleted_token) {
     setcookie("ur_fat_remember_me", "", time() - 3600,'/');
     return true;
   } else {
     return false;
   }
}
 ?>
