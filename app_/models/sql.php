<?php
require_once("../config.php");
require_once("../common.php");
require_once("_sql.php");

// require_once("session.php");

// if($sessionCheckResult == 1)
{
    require_once("_sql_limit.php");

    $type = trim($_GET['type']);
    $view = trim($_GET['view']);
    
    $SQL = new SQL($type.'_'.$view.'_');
    $SQL->setFetchMode(1);
    
    if($type=="list")
    {
        $records = $SQL->select(TRUE, $limit);
        if($SQL->count > 0)
        {
            header('content-type: application/json');
            print(json_encode($records));
        }
    }
    else if($type=="form" && is_numeric($_GET['id']) == TRUE)
    {
        $a = [];
        $a[0] = $_GET["id"];
        $records = $SQL->select(TRUE, "WHERE `id` =?", $a);
        if($SQL->count > 0)
        {
            header('content-type: application/json');
            print(json_encode($records));
    
        }
    }
    else if($type =="select")
    {
        $records = $SQL->select(FALSE, $limit);
        if($SQL->count > 0)
        {
            header('content-type: application/json');
            print(json_encode($records));
        }
    }
}
