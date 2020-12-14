<?php
// header('Access-Control-Allow-Origin:*');  //允许任意的域名访问
// header('Access-Control-Allow-Method:POST,GET'); //允许请求方式是get和post
include 'conn.php';

// 接口数据输出
$result = $conn->query("select * from cov_banner");
$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);