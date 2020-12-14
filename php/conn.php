<?php
header('content-type:text/html;charset=utf-8');

define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DBNAME','projectdb');
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

if($conn->connect_error){
    die('连接数据库错误,'.$conn->connect_error);//die():退出程序并返回括号里面的值。
}

$conn->query('SET NAMES UTF8');