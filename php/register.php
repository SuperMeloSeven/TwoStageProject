<?php
include "conn.php";

if(isset($_POST['existTel'])){
    $tel = $_POST['existTel'];
    $result=$conn->query("select * from cov_user where telephone='$tel'");
    
    if($result->fetch_assoc()){//存在 php里面的true返回1
        echo true;
    }else{//不存在,php里面的false返回空隙。
        echo false;
    }
}

//2.获取前端表单传入的值。
@$telephone = $_POST['telephone'];
@$email = $_POST['email'];
@$password = sha1($_POST['password']);
@$birthday = $_POST['birthday'];
@$gender = $_POST['gender'];

if(isset($telephone) && isset($email) && isset($password) && isset($birthday) && isset($gender)){
  $conn->query("insert cov_user values(null,'$telephone','$email','$password','$birthday','$gender',NOW())");
  echo 'ok';
}else{
  echo 'error';
}
