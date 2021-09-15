<?php
require_once("config.php");

require_once("models/models.php");
require_once("controlers/controlers.php");
require_once("views/views.php");
require_once("reports/reports.php");

require_once("common.php");
?>
<html lang='fr'>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        
        <link rel="icon" href="images/favicon.svg" sizes="any" type="image/svg+xml">
        
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital@0;1&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital@0;1&display=swap" rel="stylesheet">

        <!-- Common ------------------>
        <script src="common.js"></script>
        <link href="common.css" rel="stylesheet" />

        <link href="fonts/Font-Awesome/css/all.css" rel="stylesheet" />

        <!-- Models ------------------> 
        <script src="models/models.js"></script>
        <script src="models/_session.js"></script>
        <script src="models/_login.js"></script>

        <!-- Controlers --------------> 
        <script src="controlers/controlers.js"></script>
        <script src="controlers/_session.js"></script>
        <script src="controlers/_login.js"></script>
        <script src="controlers/_accueil.js"></script>
        <script src="controlers/_listes.js"></script>
        

        <!-- Views --> 
        <script src="views/views.js"></script>
        <script src="views/_login.js"></script>
        <script src="views/_accueil.js"></script>
        <script src="views/_listes.js"></script>

        <link href="views/themes/default.css" rel="stylesheet" />
        <link href="views/views.css" rel="stylesheet" />
        <link href="views/_menu.css" rel="stylesheet" />
        <link href="views/_login.css" rel="stylesheet" />
        <link href="views/_listes.css" rel="stylesheet" />

        <!-- Reports --> 
        <script src="reports/reports.js"></script>
    </head>
    <body id="body">
        <header id="header">
            <div id='menuButton'>X</div>
            <div id='title'>DSM</div>
            <div id='user'>X</div>
        </header>
        <div id='menuButton'></div>
        <nav id="menu">
            <ul>
                <li>Accueil</li>
                <li>Personnes
                    <ul>
                        <li onclick="dsm.views.lists.openForm();">Adhérents</li>
                        <li>Elèves</li>
                        <separator></separator>
                        <li>Professeurs</li>
                        <li>Bénévoles</li>
                        <li>Bureau</li>
                        <separator></separator>
                        <li>Fournisseurs</li>
                        <li>Clients</li>
                        <li>Structure</li>
                    </ul>
                </li>
                <li>Cours
                    <ul>
                        <li>Saisons</li>
                        <li>Plannings hebdomadaires</li>
                        <separator></separator>
                        <li>Disciplines</li>
                        <li>Niveaux</li>
                        <li>Professeurs</li>
                        <li>Salles</li>
                    </ul>
                </li>
                <li>Evènements
                    <ul>
                        <li>Stages</li>
                        <li>Parties dansantes</li>
                    </ul>
                </li>
                <li>Produits
                    <ul>
                        <li>Catégories</li>
                        <li>Produits</li>
                        <separator></separator>
                        <li>Fournisseurs</li>
                        <li>Clients</li>
                    </ul>
                </li>
                <li>Budget
                    <ul>
                        <li>Achats</li>
                        <li>Ventes</li>
                    </ul>
                </li>
            </ul>
        </nav>
        <main id="main">MAIN</main>
        <footer id="footer">FOOTER</footer>
        <script>init();</script>
    </body>
</html>