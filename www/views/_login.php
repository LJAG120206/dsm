<?php

$db_eleves = new model("users_");

$db_eleves->setFetchMode(2);

$list_eleves = $db_eleves->selectAll();

print("<pre>");


foreach($list_eleves as $eleve)
{
//    print_r($eleve);
    print('<p>'.$eleve['prenom'].' '.$eleve['nom'].'</p>');
}

print("</pre>");
