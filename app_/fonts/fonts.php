<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fonts</title>
    <link href="Font-Awesome/css/all.css" rel="stylesheet"> 
    <style type="text/css">
        div
        {
            width: 32px;
            height: 32px;
            border: 1px solid red;
            margin: 4px;
            display: inline-block;
            text-align: center;
            line-height: 32px;
            vertical-align: middle;
            font-family: 'Font Awesome 5 Free';
            font-weight: 400;
            font-size: 24px;
        }
    </style>
</head>
<body>

<i class="fas fa-user"></i> <!-- uses solid style -->
<i class="far fa-user"></i> <!-- uses regular style -->
<i class="fal fa-user"></i> <!-- uses light style -->
<!--brand icon-->
<i class="fab fa-github-square"></i> <!-- uses brands style -->

<?php
    $i = 1;
    for($c=0; $c<65535; $c++)
    {
        print('<div class="far">'.mb_chr($c).'</div>');
        if($i > 15)
        {
            print('<br>');
            $i = 0;
        }
        $i++;
    }
?>

</body>
</html>