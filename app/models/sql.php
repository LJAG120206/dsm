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

    
    if($type=="list")
    {
        $cmd = (isset($_GET['cmd'])) ? trim($_GET['cmd']) : "";
        $SQL = new SQL($type.'_'.$view.'_');
        $SQL->setFetchMode(1);

        if($cmd == "count")
        {
            $count = $SQL->count();
            header('content-type: text/plain');
            print($count);
        }
        else
        {
            $records = $SQL->select(TRUE, $limit);
            if($SQL->count > 0)
            {
                header('content-type: application/json');
                print(json_encode($records));
            }
        }
    }
    else if($type=="form" && is_numeric($_GET['id']) == TRUE)
    {
        $SQL = new SQL($type.'_'.$view.'_');
        $SQL->setFetchMode(1);

        $a = [];
        $a[0] = $_GET["id"];
        $records = $SQL->select(TRUE, "WHERE `id` =?", $a);
        if($SQL->count > 0)
        {
            header('content-type: application/json');
            print(json_encode($records));
        }
    }
    else if($type=="select")
    {
        $SQL = new SQL($type.'_'.$view.'_');
        $SQL->setFetchMode(1);

        $records = $SQL->select(FALSE, $limit);
        if($SQL->count > 0)
        {
            header('content-type: application/json');
            print(json_encode($records));
        }
    }
    else if($type=="delete")
    {
        header('content-type: text/plain');

        switch($view)
        {
            case 'adherents'    :   $table = 'identites'; break;
            case 'eleves'       :   $table = 'identites'; break;
            case 'professeurs'  :   $table = 'identites'; break;
            case 'benevoles'    :   $table = 'identites'; break;
            case 'bureau'       :   $table = 'identites'; break;
        }

        $SQL = new SQL($table);
        $SQL->setFetchMode(1);

        $ids  = trim($_POST['ids']);
        $ids_ = explode(',',$ids);

        $output = '';
        foreach($ids_ as $wid)
        {
            $fields = [];
            array_push($fields,'_status');

            $values = [];
            array_push($values,0);

            $output .= $wid.':'.$SQL->update($fields, $values, $wid)."\n";
        }
        $output = substr($output,0,strlen($output) -1);
        print($output);
    }
}
