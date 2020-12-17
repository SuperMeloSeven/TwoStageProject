<?php
include "conn.php";

if(isset($_POST['telephone']) && isset($_POST['password'])){
    $telephone = $_POST['telephone'];
    $password = sha1($_POST['password']);
    $result=$conn->query("select * from cov_user where telephone='$telephone' and password='$password'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}