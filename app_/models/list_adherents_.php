<?php
require_once("../config.php");
require_once("../common.php");
require_once("_sql.php");

// require_once("session.php");

// if($sessionCheckResult == 1)
{
    require_once("_sql_limit.php");

    $view = trim($_GET['view']);

    $SQL = new SQL('list_'.$view.'_');
    $SQL->setFetchMode(1);

    $records = $SQL->select(TRUE, $limit);

    if($SQL->count > 0)
    {
        $json = json_encode($records);
        print($json);
    }
}
