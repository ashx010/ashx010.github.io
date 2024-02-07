<?php

session_start();
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access_Control-Allow-Origin: *');
header('Access_Control-Allow-Methods: POST');

if (!$_SERVER['REQUEST_METHOD'] == "POST") {
    die("Forbidden - You are not authorized to view this page");
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$pass =$data['pass'];

if(($email === 'demo@gmail.com') && ($pass === 'demo123')){
	$_SESSION['user_authenticated'] = true;
	echo json_encode(1);
}else{
	echo json_encode(0);
}

?>