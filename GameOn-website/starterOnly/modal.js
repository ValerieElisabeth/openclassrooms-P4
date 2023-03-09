/*
Grâce à la proriété JS : className,
Cette fonction peut accéder à la valeur de la classe
de l'élément ayant l'ID : myTopnav.
Ensuite :
SI ==> la valeur de la classe clibée est : "topnav" 
ALORS ==> sa valeur deviendra "topnav responsive"
SINON ==> sa valeur restera la même. "topnav"
 */

function editNav() {
  var classValue = document.querySelector('#myTopnav');
  if (classValue.className === 'topnav') {
    classValue.className += ' responsive';
  } else {
    classValue.className = 'topnav';
  }
}

/*
DOM Elements
(1) A l'ouverture du formulaire, l'arrière plan, prend une couleur qui masque tous le site
(2) Cible tous les 2 boutons du ayant la classe "modal-btn" 
(3) Cible 7 éléments du ayant la classe "formData"
*/

const modalbg = document.querySelector('.bground'); // (1)
const modalBtn = document.querySelectorAll('.modal-btn'); // (2)
const formData = document.querySelectorAll('.formData'); // (3)

// Lance l'évènement de la modale au click de l'utilisateur
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// Ouverture : du formulaire de la modale
function launchModal() {
  modalbg.style.display = 'block';
}

// Fermeture : du formulaire de la modale
function closeModal() {
  modalbg.style.display = 'none';
}

let closedWindow = document.querySelector('.close');
closedWindow.addEventListener('click', closeModal);

/*

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                    FONCTIONS QUI TESTENT LES VALIDATION DU FORMULAIRE
                            (par des valeurs Booléennes)

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

*/

//
// ---- TEST : NOM ET PRÉNOM -------------------------------------------------------------------
allInputsValid = false;

function testString(string) {
  const stringPattern =
    /^[\wÀ-ÖØ-öø-ÿéèêëôöûüçñ]{2,}(?:[\s-][\wÀ-ÖØ-öø-ÿéèêëôöûüçñ]{2,}){0,2}$/i;
  // console.log(stringPattern.test(string));
  return stringPattern.test(string);
}

// testString('JEAN-MARIE');

//
// ---- TEST : ADRESSE E-MAIL -------------------------------------------------------------------

function testEmail(string) {
  const emailPattern =
    // /^[a-z0-9\.]+[@]{1}[[a-z0-9]+[.]{1}[a-z]{2,10}$/;
    /^([a-z0-9\.]+)?@[a-z0-9]+(\.[a-z]{2,10}){1,2}$/i;
  // console.log(emailPattern.test(string));
  return emailPattern.test(string);
}

// testEmail('name580.jean@gmail.com');

//
// ---- TEST : DATE DE NAISSANCE ------------------------------------------------------------------

function testDate(number) {
  const datePattern = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  // console.log(emailPattern.test(number));
  return datePattern.test(number.value);
}
// testDate('26/04/3990');

// ---- TEST : BOUTON RADIO COCHÉ ------------------------------------------------------------------
//
// function returnRadioValid() {
//   let radioInputs = document.querySelectorAll('.form input[type="radio"]');
//   radioInputs.forEach((cibler_inputs_radio) => {
//     cibler_inputs_radio.addEventListener("change", function () {
//       if (cibler_inputs_radio.checked) {
//         return cibler_inputs_radio.value;
//         // console.log(cibler_inputs_radio.value);
//       }
//     });
//   });
// }
// returnRadioValid();
/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                          FONCTION FINALE DE VALIDATION DU FORMULAIRE

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
 
*/

const form = document.querySelector('.form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  //
  /* EXPLICATIONS :
    (1) On cible 1 champs par (cas) 'case' via la boucle forEach déclaré précédement.
    (2) On cible les container parents de chaque classes : "firstName", "lastName"... c.a.d : les "div" ayant la classe : formData.
    (3a)(3b) Initialisation des messages d'erreurs pour les champs : "firstName" et "lastName" s'ils étaient vide.
    */

  // INITIALISATION des messages d'erreurs personnalisés -------------------//
  const errorEmptyMsg = 'Ce champ ne peut pas être vide.'; // (3a)
  const errorMinimumString = 'Il faut au minimum 2 caractères'; // (3b)
  const errorEmail = 'Veuillez saisir une adresse e-mail valide';
  const errorDateMsg = 'Veuillez saisir une date valide';

  //
  const inputs = document.querySelectorAll('.form .formData input');
  inputs.forEach((ciblerInput) => {
    const allFormInputs = document.querySelector(`#${ciblerInput.id}`); // (1)
    const container = allFormInputs.parentNode; // (2)
    // console.log(ciblerInput.id);

    // Mon switch case cible pointe vers les ID : "firstName" & "lastNAme" pour effectuer mes tests.
    switch (ciblerInput.id) {
      case 'firstName':
      case 'lastName':
        //
        //
        /* EXPLICATIONS :
        CONDITION 1 :
        (4) LA CONDITION 1 : Vérifie si les champs "firstName" & "lastNAme" sont vides. Dans ce cas, le message d'erreur précédement déclaré s'affiche.
        (5) La fonction setAttribute()récupère l'attribue 'data-error' définit dans le CSS et lui donne la valeur du message précédement déclaré.
            pout l'afficher APRÈS LA DIV ayant la classe "formData".
        (6) Le CSS précise que si la valeur de 'data-error est true' alors le message passe d'une opacité 0 à 1 et s'affiche.

        CONDITION 2 :
        (7) CONDITION 2 : Vérifie que les conditions de la RegExp de ma fonction testString(), ne sont pas respectées.
        Alors un autre message d'erreur sera affiché.
        (8) Quand l'utilisateur rempli bien les champs les messages d'erreurs sont effacés du DOM
        */

        //
        //
        // TEST DES CHAMPS "firstName" & "lastNAme" -----------------------------//
        // (4) CONDITION 1.
        if (!allFormInputs.value) {
          container.setAttribute('data-error', errorEmptyMsg); // (5)
          container.setAttribute('data-error-visible', true); // (6)
          //
          //
          // (7) CONDITION 2.
        } else if (!testString(allFormInputs.value)) {
          container.setAttribute('data-error', errorMinimumString);
          container.setAttribute('data-error-visible', true);
          //
          //
          // (8)
        } else {
          container.removeAttribute('data-error');
          container.removeAttribute('data-error-visible');
        }
        break;
      //
      //
      // TEST DU CHAMPS "email" ----------------------------------------------------//

      case 'email':
        if (!allFormInputs.value) {
          container.setAttribute('data-error', errorEmptyMsg);
          container.setAttribute('data-error-visible', true);
          //
        } else if (!testEmail(allFormInputs.value)) {
          container.setAttribute('data-error', errorEmail);
          container.setAttribute('data-error-visible', true);
          //
          // (8)
        } else {
          container.removeAttribute('data-error');
          container.removeAttribute('data-error-visible');
        }
        break;

      case 'birthdate':
        if (!allFormInputs.value) {
          container.setAttribute('data-error', errorEmptyMsg);
          container.setAttribute('data-error-visible', true);
          //
          // (8)
        } else {
          container.removeAttribute('data-error');
          container.removeAttribute('data-error-visible');
        }
        break;

      case 'quantity':
        if (!allFormInputs.value) {
          container.setAttribute('data-error', errorEmptyMsg);
          container.setAttribute('data-error-visible', true);
          //
          // (8)
        } else {
          container.removeAttribute('data-error');
          container.removeAttribute('data-error-visible');
        }
    }
  });

  //

  if (allInputsValid) {
    console.log('Le formulaire a bien été envoyé');
  }
});
