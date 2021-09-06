<?php
require_once("../config.php");
require_once("../common.php");
require_once("_sql.php");

header('Content-Type: application/json');

$values = array();

if(isset($_POST['user']) && isset($_POST['pwd']))
{
    $values[0] = $_POST['user'];
    $values[1] = $_POST['pwd'];

    $users_ = new SQL('users_');
    $users_->setFetchMode(2);

    $SQL = "WHERE `login` = ? AND `pwd`= ?";
    $rows = $users_->select(FALSE, $SQL, $values);

    if($users_->count == 1)
    {
        $id    = $rows[0]['id'];
        $login = $rows[0]['nom'];
        $pwd   = $rows[0]['prenom'];

        $hash = hash('SHA512',$values[0].$values[1].time());
        
        ini_set('session.cookie_samesite', 'Strict');
        session_id($hash);
        session_start();

        $_SESSION['id']       = $hash;
        $_SESSION['userId']   = $rows[0]['id'];
        $_SESSION['userName'] = trim($rows[0]['prenom'].' '.$rows[0]['nom']);
        $_SESSION['time']     = time();

        $return = array();
        $return['id']       = $hash;
        $return['userId']   = $_SESSION['userId'];
        $return['userName'] = $_SESSION['userName'];
        $return['time']     = $_SESSION['time'];

        $json = json_encode($return);

        print($json);
    }
    else
    {
        die("Erreur 1.2 : Accès refusé.");
    }
}
else
{
    die("Erreur 1.1 : Informations de connexion non renseignées.");
}
