<?php
function login_user($id=null) {
  if(!$id) {
    return false;
  }
  $current_user = get_user_by_id($id);
  if($current_user) {
    $_SESSION['logged_in'] = true;
    $_SESSION['user'] = $current_user;
    return $current_user ;
  }
  return false;
}
