<?php
include 'conn.php';

// 接口数据输出
$result = $conn->query("select * from cov_goods");
$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);