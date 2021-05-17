var canvas= document.getElementById('zoneJeu');//identifier le canvas par son id
var contexte = canvas.getContext('2d');//definir le contexte de jeu avec 2 dimensions
var largeur=hauteur=20; //definir les variables pour le snake
var x= Math.trunc(Math.random()*canvas.width/largeur)*largeur; //positionner abscisse aleatoiremnt dans la zone de jeu
var y= Math.trunc(Math.random()*canvas.height/hauteur)*hauteur; //positionner le y aleatoirement dans la zone de jeu
var deplacementX=deplacementY=0;
var trace=[];
var tailleTrace=tailleInitialeTrace=5;
var historique , distance;
var compteBoucle =0;
var sautTrace=1;
var sautBoucle=10;
var tailleMaxTrace=100; 
//definir la position de la pomme
//...
var PommeX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
var PommeY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
var PommeRadius = 10;

//definir le score
var score=0;

//coleur aleatoire pour le snake
var randomColor=0;

window.onload=function() { //charger la page complete
    var intervalID= setInterval(jeu,100); //charger pour les 10ms
    document.addEventListener("keydown",keyboard); //appeler un evenement du clavier
    }
    
function jeu(){
    contexte.clearRect(0, 0, canvas.width, canvas.height);
    x+=deplacementX*largeur;
    y+=deplacementY*hauteur;
    if((tailleTrace <= tailleMaxTrace) && ((deplacementX != 0) || (deplacementY!=0))){
        if((compteBoucle++)%10 == 1){
        sautBoucle--;
        if(sautBoucle<0){
        tailleTrace+=sautTrace;
        }
}
}

// On insére la valeur de x et y dans le tableau 
trace.push({x:x,y:y});
while(trace.length>tailleTrace){
    // alors on enlève un élément
    trace.shift();
    }
//definir la couleur du snake
contexte.fillStyle ="#f1c40f";  
 //dessiner le deplacement avec fillReact
for(var i=0;i<trace.length;i++) {
    contexte.fillRect(trace[i].x,trace[i].y, largeur-3, hauteur-3);
    }


    //gerer la collision de la pomme et snake
    if(x==PommeX && y==PommeY){
        score+=10 + 2 * ((tailleTrace - tailleInitialeTrace)/sautTrace); 
     // Si la taille a été augmenté on enlève un saut d'expansion de trace
        if(tailleTrace>tailleInitialeTrace){
        tailleTrace-=sautTrace;
        }

    // On réinitialise le compte à rebours pour relancer l'expansion
    sautBoucle=10;
    // On choisit une autre position pour la pomme
    PommeX=Math.trunc(Math.random()*canvas.width/largeur)*largeur;
    PommeY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur;
    }

    //affichage et placement de la pomme 
    contexte.beginPath();
    contexte.arc(PommeX, PommeY,PommeRadius, 0, Math.PI * 2);
    contexte.fillStyle="#ffffff";
    contexte.fill();
    contexte.closePath();

    // Affichage du score
    contexte.font = '16px Arial';
    contexte.fillStyle = '#fff';
    contexte.fillText('Score: ' + score, 5, 20);

    // Affichage d'un v pour donner l'impression d'une feuille

    //couleur aleatoire

    if(x==PommeX && y==PommeY){
        // Incrementation de randomColor
         randomColor++;
         randomColor%=3;
    }

    
}


function keyboard(evt){
    switch(evt.keyCode) {
        case 37:
        // touche gauche
        if(historique==39){break;}
        deplacementX=-1;
        deplacementY=0;
        historique=evt.keyCode;
        break;
        case 38:
        // touche haut
        if(historique==40){break;}
        deplacementX=0;
        deplacementY=-1;
        historique=evt.keyCode;
        break;
        case 39:
        // touche droite
        if(historique==37){break;}
        deplacementX=1;
        deplacementY=0;
        historique=evt.keyCode;
        break;
        case 40:
        // touche bas
        if(historique==38){break;}
        deplacementX=0;
        deplacementY=1;
        historique=evt.keyCode;
        break;
        case 32:
        deplacementX=0;
        deplacementY=0;
        // touche espace
        break;
        }

}

 
