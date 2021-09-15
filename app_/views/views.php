<?php

$files = scandir(".",SCANDIR_SORT_ASCENDING);

if(isset($_GET['css']))
{
    $css = "";

    foreach($files as $file)
    {
        if(substr($file,-4) == '.css')
        {
            $css .= file_get_contents($file)."\n\n";
        }
    }
    
    header('Content-Type: text/css');
    print($css);
}

if(isset($_GET['js']))
{
    $js = "";

    foreach($files as $file)
    {
        if(substr($file,-3) == '.js')
        {
            $js .= file_get_contents($file)."\n\n";
        }
    }

    header('Content-Type: application/javascript');
    print($js);
}
