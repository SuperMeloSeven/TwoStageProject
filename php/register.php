<?php
include "conn.php";
//3.获取前端传入的用户名做唯一值的检测。
if(isset($_POST['email'])){
    $email = $_POST['email'];
    $result=$conn->query("select * from cov_user where email='$email'");
    //如果存在结果，表示该用户名已经存在，否则不存在。
    if($result->fetch_assoc()){//存在 php里面的true返回1
        echo true;
    }else{//不存在,php里面的false返回空隙。
        echo false;
    }
}

//2.获取前端表单传入的值。
if(isset($_POST['submit'])){//前端点击了submit提交按钮，后端开始接收值。
    $email = $_POST['email'];
    $pass = sha1($_POST['password']);
    $conn->query("insert cov_user values(null,'$email','$pass',NOW())");//将数据传递给数据库。
}