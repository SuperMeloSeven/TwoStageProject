<?php
include 'conn.php';

// 接口数据输出
if(isset($_GET['sid'])){
  $sid = $_GET['sid'];
  //查询这条数据返回给前端。
  $result=$conn->query("select * from cov_goods where sid = $sid");
  echo json_encode($result->fetch_assoc());
}