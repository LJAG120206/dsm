<?php

$limit  = isset($_GET['limit']) ? $_GET['limit']  : '';

// Check LIMIT
$limit = trim($limit);
if($limit != '')
{
    if(substr_count($limit,',') == 1)
    {
        $limit_ = explode(',',$limit);
        if(ctype_digit($limit_[0]) && ctype_digit($limit_[1]))
        {
            $limit = 'LIMIT '.$limit_[0].','.$limit_[1];
        }
    }
    else
    {
        $limit = '';
    }
}
