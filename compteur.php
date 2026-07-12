<?php

$fichier = "compteur.txt";
$duree_cookie = 86400; // 24 heures

if (!file_exists($fichier)) {
    file_put_contents($fichier, "0");
}

if (!isset($_COOKIE["visite_oncle_ernest"])) {

    $visites = (int) file_get_contents($fichier);
    $visites++;

    file_put_contents($fichier, $visites);

    setcookie(
        "visite_oncle_ernest",
        "1",
        time() + $duree_cookie,
        "/"
    );

} else {

    $visites = (int) file_get_contents($fichier);

}

echo str_pad($visites, 6, "0", STR_PAD_LEFT);

?>