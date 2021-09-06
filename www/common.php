<?php

function debug($msg)
{
    if(DEBUG)
    {
        error_log($msg);
    }
}
