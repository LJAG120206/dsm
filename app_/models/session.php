<?php
require_once("../config.php");
require_once("../common.php");
require_once("_sql.php");

function sessionCheck()
{
    error_log("sessionCheck();");

    $return = 0;

    if(isset($_GET['sid']))
    {
        ini_set('session.cookie_samesite', 'Strict');
        session_start();

        if(session_id() == $_GET['sid'])
        {
            if(isset($_SESSION['time']))
            {
                if((time() - $_SESSION['time']) > 900)
                {
                    session_unset();
                    session_destroy();
                }
                else
                {
                    $_SESSION['time'] = time();
                    $return = 1;
                }
            }
        }
    }

    return($return);
}

$sessionCheckResult = sessionCheck();

if(basename(__FILE__) == 'session.php')
{
    header('Content-Type: text/plain');
    print($sessionCheckResult);
    error_log($sessionCheckResult);
}
