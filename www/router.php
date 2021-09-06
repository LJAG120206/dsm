<?php

if(isset($_GET['url']))
{
    $URL = trim($_GET['url']);
    if($URL != "")
    {
        $file = "_$URL.php";
        if(file_exists($file))
        {
            include($file);
        }
        else
        {
            include("_login.php");
        }
    }
    else
    {
        include("_login.php");
    }
}
else
{
    include("_login.php");
}
