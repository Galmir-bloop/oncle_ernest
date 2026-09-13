/* =========================
   CLOPORTES
========================= */

/* Images du cloporte v1 */

const imagesCloporteV1 = {

    haut: "images/cloporte-haut.png",

    bas: "images/cloporte-bas.png",

    gauche: "images/cloporte-gauche.png",

    droite: "images/cloporte-droite.png",

    ecrase: "images/cloporte-ecrase.png"

};


/* Images du cloporte v2 */

const imagesCloporteV2 = {

    haut: "images/cloporte-v2-haut.png",

    bas: "images/cloporte-v2-bas.png",

    gauche: "images/cloporte-v2-gauche.png",

    droite: "images/cloporte-v2-droite.png",

    ecrase: "images/cloporte_v2_ecrase.png"

};


/* Choisit la variante indiquée dans le HTML */

const varianteCloporte =
    document.body.dataset.cloporte === "v2"
        ? imagesCloporteV2
        : imagesCloporteV1;



function faireTraverserCloporte(images) {

    const cloporte = document.createElement("img");

    cloporte.classList.add("cloporte");


    // Choisit une direction de départ au hasard

    const directions = ["haut", "bas", "gauche", "droite"];

    let direction =
        directions[Math.floor(Math.random() * directions.length)];


    cloporte.src = images[direction];

    cloporte.alt = "";


    const containerCloporte =
        document.getElementById("cloporte-container");

    if (!containerCloporte) {
        return;
    }

    containerCloporte.appendChild(cloporte);


    const taille = 50;

    const marge = taille + 20;


    let x;

    let y;


    // Position de départ selon la direction

    if (direction === "droite") {

        x = -marge;

        y = Math.random() * window.innerHeight;

    }


    if (direction === "gauche") {

        x = window.innerWidth + marge;

        y = Math.random() * window.innerHeight;

    }


    if (direction === "bas") {

        x = Math.random() * window.innerWidth;

        y = -marge;

    }


    if (direction === "haut") {

        x = Math.random() * window.innerWidth;

        y = window.innerHeight + marge;

    }


    // Direction de déplacement

    let dx = 0;

    let dy = 0;


    if (direction === "droite") dx = 1;

    if (direction === "gauche") dx = -1;

    if (direction === "bas") dy = 1;

    if (direction === "haut") dy = -1;


    // Vitesse du cloporte

    const vitesse = 1.5 + Math.random() * 1.1;


    // Gestion des changements de direction

    let dernierChangement = performance.now();

    let prochainChangement =
        800 + Math.random() * 1200;


    // Permet d'arrêter le déplacement après un clic

    let ecrase = false;


    // Clic sur le cloporte

    cloporte.addEventListener("click", function () {

        if (ecrase) return;

        ecrase = true;


        // Change l'image

        cloporte.src = images.ecrase;


        // Joue le son

        const sproutch = new Audio("sons/sproutch.mp3");

        sproutch.volume = 0.7;

        sproutch.play();


        // Fait disparaître le cloporte après 2 secondes

        setTimeout(() => {

            cloporte.remove();

        }, 2000);

    });


    function avancer(temps) {

        // Arrête le déplacement si le cloporte a été écrasé

        if (ecrase) {

            return;

        }


        // Change légèrement de direction régulièrement

        if (temps - dernierChangement > prochainChangement) {

            dernierChangement = temps;

            prochainChangement =
                800 + Math.random() * 1200;


            // Petite déviation aléatoire

            const deviation =
                Math.random() * 0.8 - 0.4;


            if (Math.abs(dx) > Math.abs(dy)) {

                dy += deviation;

                dy = Math.max(
                    -0.6,
                    Math.min(0.6, dy)
                );

            } else {

                dx += deviation;

                dx = Math.max(
                    -0.6,
                    Math.min(0.6, dx)
                );

            }


            // Normalisation pour conserver une vitesse constante

            const longueur =
                Math.sqrt(dx * dx + dy * dy);

            dx /= longueur;

            dy /= longueur;

        }


        // Déplacement

        x += dx * vitesse;

        y += dy * vitesse;


        cloporte.style.left = `${x}px`;

        cloporte.style.top = `${y}px`;


        // Choisit l'image correspondant à la direction

        if (Math.abs(dx) > Math.abs(dy)) {

            if (dx > 0) {

                cloporte.src = images.droite;

            } else {

                cloporte.src = images.gauche;

            }

        } else {

            if (dy > 0) {

                cloporte.src = images.bas;

            } else {

                cloporte.src = images.haut;

            }

        }


        // Supprime le cloporte lorsqu'il sort de l'écran

        if (

            x < -marge ||

            x > window.innerWidth + marge ||

            y < -marge ||

            y > window.innerHeight + marge

        ) {

            cloporte.remove();

            return;

        }


        requestAnimationFrame(avancer);

    }


    requestAnimationFrame(avancer);

}


/* Active les cloportes uniquement sur les écrans de plus de 768px */

if (
    window.innerWidth > 768 &&
    document.getElementById("cloporte-container")
) {

    let timerCloporte = null;


    // Programme la prochaine apparition

    function programmerCloporte(delai) {

        clearTimeout(timerCloporte);


        timerCloporte = setTimeout(() => {

            // Si la page est visible,
            // on fait apparaître un cloporte

            if (!document.hidden) {

                faireTraverserCloporte(varianteCloporte);

            }


            // Puis on programme le suivant

            programmerCloporte(16000);

        }, delai);

    }


    // Première apparition après 5 secondes

    programmerCloporte(5000);


    // Si l'utilisateur quitte la page

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            // Annule le prochain cloporte

            clearTimeout(timerCloporte);

        } else {

            // Au retour, on repart avec
            // un délai complet de 16 secondes

            programmerCloporte(16000);

        }

    });

}


/* =========================
   SPOILERS
========================= */

document.querySelectorAll(".spoiler").forEach(spoiler => {

    spoiler.addEventListener("click", () => {

        spoiler.classList.add("revele");

    });

});


/* =========================
   MENU MOBILE
========================= */

const boutonMenu =
    document.querySelector(".bouton-menu-mobile");

const navigation =
    document.querySelector("nav");


if (boutonMenu && navigation) {


    function ouvrirMenu() {

        navigation.classList.add("menu-ouvert");

        boutonMenu.classList.add("ouvert");


        boutonMenu.setAttribute(
            "aria-expanded",
            "true"
        );

        boutonMenu.setAttribute(
            "aria-label",
            "Fermer le menu"
        );


        document.body.style.overflow = "hidden";

    }


    function fermerMenu() {

        navigation.classList.remove("menu-ouvert");

        boutonMenu.classList.remove("ouvert");


        boutonMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        boutonMenu.setAttribute(
            "aria-label",
            "Ouvrir le menu"
        );


        document.body.style.overflow = "";

    }


    /* Ouverture / fermeture du menu */

    boutonMenu.addEventListener("click", function () {

        if (
            navigation.classList.contains("menu-ouvert")
        ) {

            fermerMenu();

        } else {

            ouvrirMenu();

        }

    });


    /* =========================
       SOUS-MENUS
    ========================= */

    const menusDeroulants =
        navigation.querySelectorAll(".menu-deroulant");


    menusDeroulants.forEach(function (menu) {

        const titre =
            menu.querySelector(":scope > span");


        titre.addEventListener("click", function () {

            menu.classList.toggle("ouvert");

        });

    });


    /* =========================
       FERMETURE APRÈS CLIC
    ========================= */

    const liensMenu =
        navigation.querySelectorAll("a");


    liensMenu.forEach(function (lien) {

        lien.addEventListener("click", function () {

            fermerMenu();

        });

    });

}