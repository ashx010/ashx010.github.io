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
$pincode = $data['pincode'];
$rad_dist = $data['rad_dist'];
$branch_name1 = $data['branch_name1'];
$branch_name2 = $data['branch_name2'];
$branch_size1 = $data['branch_size1'];
$branch_size2 = $data['branch_size2'];
$branch_size3 = $data['branch_size3'];
$cust_cat1 = $data['cust_cat1'];
$cust_cat2 = $data['cust_cat2'];

$host="localhost";
$username="root";
$password="";
$db="testcan";

$conn=mysqli_connect($host,$username,$password,$db);
if(!$conn)
{
  die("Connection failed: " . mysqli_connect_error());
}

if ($rad_dist !== null || $rad_dist !==""){
  if ($rad_dist == 5){
    $range = 0.045;
  }else if ($rad_dist == 10){
    $range = 0.09;
  }else if ($rad_dist == 15){
    $range = 0.135;
  }
}

$sql = "SELECT pin_code, latitude, longitude FROM branches WHERE pin_code = $pincode";
$result = mysqli_query($conn, $sql);

$pinfetch = array();
$latfetch = array();
$longfetch = array();

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_assoc($result)) {
    $pinfetch[] = $row["pin_code"];
    $latfetch[] =  $row["latitude"];
    $longfetch[] = $row["longitude"];
  }
} else {
  echo json_encode("0 results");
}
mysqli_close($conn);


echo json_encode([$pinfetch,$latfetch,$longfetch]);
?>