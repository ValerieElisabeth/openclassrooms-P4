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
const formData = document.querySelectorAll('.formData'); // ()

// Lance l'évènement de la modale au click de l'utilisateur
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// Ouverture : du formulaire de la modale
function launchModal() {
  modalbg.style.display = 'block';
}

function closeModal() {
  modalbg.style.display = 'none';
}

// Fermeture : du formulaire de la modale
let closedWindow = document.querySelector('.close');
closedWindow.addEventListener('click', closeModal);

/*

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                          LES FONCTIONS DE VALIDATION DES CHAMPS

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

*/
//
// ---- TEST : NOM ET PRÉNOM -------------------------------------------------------------------

// function testString(string) {
//   allInputsAreTrue = false;

//   const stringPattern =
//     /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([\-'][a-zA-ZÀ-ÖØ-öø-ÿ]+)*\s[a-zA-ZÀ-ÖØ-öø-ÿ]+([\-'][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;

//   // return stringPattern.test(string);
//   if (stringPattern.test(string)) {
//     allInputsAreTrue = true;
//   }
//   if (!allInputsAreTrue) {
//     const firstNameContainer = document.querySelector('firstName');
//     const errorMsgFirstName = document.createElement('p');
//     errorMsgFirstName.innerText = 'Dois contenir au moins 2 sacatctères';
//     firstNameContainer.appendChild(errorMsgFirstName);
//   }
// }
// testString('Valérie');

allInputsValid = false;

function testString(string) {
  const stringPattern =
    /^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}([\-'][a-zA-ZÀ-ÖØ-öø-ÿ]+)*\s[a-zA-ZÀ-ÖØ-öø-ÿ]+([\-'][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;

  // Si c'est faux, tu produit un message d'erreur...
  if (!stringPattern.test(string)) {
    allInputsValid = false;

    const firstNameContainer = document.querySelector('.formData');
    const errorMsgFirstName = document.createElement('p');
    errorMsgFirstName.innerText =
      'Votre prénom doit contenir un minimum de 2 caractères';
    firstNameContainer.appendChild(errorMsgFirstName);
    // console.log(errorMsgFirstName);

    // Tu vérifie qu'il y à déjà un message d'erreur et tu l'éfface
  } else {
    errorMsgFirstName.remove();
    console.log('Votre message est ok');
    // return stringPattern.test(string);
  }
}
testString('V');

//
// ---- TEST : ADRESSE E-MAIL -------------------------------------------------------------------

function testEmail(string) {
  const emailPattern = /^[a-z0-9\.]+[@]{1}[[a-z0-9]+[.]{1}[a-z]{2,10}$/;
  // return emailPattern.test(string);
  console.log(emailPattern.test(string));
}
testEmail('name580.jean@gmail.com');

//
// ---- TEST : DATE DE NAISSANCE ------------------------------------------------------------------

function testDate(number) {
  const emailPattern = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  // return emailPattern.test(number);
  console.log(emailPattern.test(number));
}
testDate('26/04/3990');

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

                    FONCTIONS QUI TESTENT LES VALIDATION DU FORMULAIRE
                            (par des valeurs Booléennes)

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

*/
let form = document.querySelector('.form');

console.log(form.firstName);
/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                          FONCTION FINALE DE VALIDATION DU FORMULAIRE

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
 
*/
form.addEventListener('submut', function (e) {
  e.preventDefault;
  if (allInputsAreTrue) {
    console.log('Le formulaire à bien été envoyé');
  }
});
