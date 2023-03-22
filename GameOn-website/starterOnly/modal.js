/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                    FONCTION QUI GÈRE LA PARTIE RESPONSIVE

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Grâce à la proriété JS : className, cette fonction peut accéder à la valeur de la classe
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
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                                    LE FORMULAIRE
                                Ouverture et Fermeture

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
DOM Elements
(1) On cible la classe qui; à l'ouverture du formulaire, donne à son arrière plan une couleur qui masque tous le site.
(2) On cible le bouton du ayant la classe "modal-btn" pour gérer le module du formulaire. Ouverture/Fermeture.
*/

const modalbg = document.querySelector('.bground'); // (1)
const modalBtn = document.querySelectorAll('.modal-btn'); // (2)
// const formData = document.querySelectorAll('.formData'); // (3)

// Lance l'évènement de la modale au click de l'utilisateur
modalBtn.forEach((ciblerBtn) => {
  ciblerBtn.addEventListener('click', launchModal);
});

// Ouverture : du formulaire de la modale
function launchModal() {
  modalbg.style.display = 'block';
}

// Fermeture : du formulaire de la modale
function closeModal() {
  modalbg.style.display = 'none';
}

const closedWindow = document.querySelector('.close');
closedWindow.addEventListener('click', closeModal);

/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                    LES FONCTIONS TEST ES VALIDATION DU FORMULAIRE
                            (par des valeurs Booléennes)

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
*/

//
// ---- TEST : NOM ET PRÉNOM -------------------------------------------------------------------

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

//
// ---- TEST : QUANTITÉ DE TOURNOIS DÉJÀ PARTICIPÉ ? ----------------------------------------------

function testQuantity(number) {
  const quantityPattern = /^\d+$/;
  // console.log(quantityPattern.test(number.value));
  return quantityPattern.test(number);
}
// testQuantity('valérie');

//
// ---- TEST : CHECKED INPUT type : RADIO COCHÉ ------------------------------------------------------

function testInputRadioIsChecked() {
  const allInputsRadio = document.querySelectorAll('.form input[type="radio"]');

  /* Ici la boucle forEach permet de vériifer si 1 bouton radio est coché.
  Si c'est le cas, la condition renvoie : TRUE 
  (n) return; ne renvoie pas de valeur mais arrête la fonction forEach, dès que celle-ci à trouvé un input coché.*/

  let radioIsChecked = false;

  allInputsRadio.forEach((ciblerInput) => {
    if (ciblerInput.checked) {
      radioIsChecked = true;
      return; // (n)
    }
  });
  // console.log(radioIsChecked);
  return radioIsChecked;
}

// ---- TEST : CHECKED INPUT type : CHECKBOX COCHÉ ------------------------------------------------------

function testInputCheckboxIsChecked() {
  const allInputsCheckbox = document.querySelectorAll(
    '.form input[type="checkbox"]'
  );
  /* Une boucle forEach permet de vériifer si 1 bouton checkbox est coché.
  Si c'est le cas, la condition renvoie : TRUE */

  let checkboxIsChecked = false;

  allInputsCheckbox.forEach((input) => {
    if (input.checked) {
      checkboxIsChecked = true;
      return;
    }
  });
  return checkboxIsChecked;
}

/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                          FONCTIONS QUI GÈRENT LES MESSAGES D'ERREURS

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------    
 /*
 
 EXPLICATIONS :
 CONDITION 1 :
 (4) LA CONDITION 1 : Vérifie si les champs "firstName" & "lastNAme" sont vides. Dans ce cas, le message d'erreur précédement déclaré s'affiche.
 (5) Avec la méthode setAttribute() on récupère l'attribue 'data-error' qui à été définit dans le CSS, et on lui donne la valeur du message précédement déclaré, pout l'afficher APRÈS LA DIV ayant la classe "formData".
 (6) Le CSS précise que si la valeur de 'data-error-visible' est égale à true' alors le message passe d'une opacité 0 à 1 et s'affiche.

 CONDITION 2 :
 (7) CONDITION 2 : Vérifie que les conditions de la RegExp de ma fonction testString(), ne sont pas respectées.
 Alors un autre message d'erreur sera affiché.
 (8) Quand l'utilisateur rempli bien les champs les messages d'erreurs sont effacés du DOM
 */

function errorEmptyMessages(container, errorEmptyMsg) {
  container.setAttribute('data-error', errorEmptyMsg); // (5)
  container.setAttribute('data-error-visible', true); // (6)
}

function errorPersoMessages(container, msgPerso) {
  container.setAttribute('data-error', msgPerso);
  container.setAttribute('data-error-visible', true);
}

function removeMessages(container) {
  container.removeAttribute('data-error');
  container.removeAttribute('data-error-visible');
}

/*
INITIALISATION des messages d'erreurs personnalisés -------------------------------//
(3a)(3b) Initialisation des messages d'erreurs pour tous les champs du formulaire :
"firstName" et "lastName" s'ils étaient vide.
-------------------------------------------------------------------------------------
*/
const errorEmptyMsg = 'Ce champ ne peut pas être vide'; // (3a)
const errorMinimumString = 'Vous devez entrer 2 caractères ou plus'; // (3b)
const errorbirthdateMsg = 'Vous devez saisir votre date de naissance';
const errorDateMsg = 'Vous devez saisir un nombre';
const errorEmail = 'Vous devez saisir une adresse e-mail valide';
const errorRadioMessage = 'Vous devez choisir une option';
const errorCheckboxMessage = "Vous devez accepter les conditions d'utilisation";

let msgPerso;
let inputName;
let inputRadioName;
let inputCheckboxName;
let radioContainer;

/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                    FONCTION DE VÉRIFICATION DE LA VALIDATION DES INPUTS

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------  
*/

const form = document.querySelector('.form');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  /*
------------------------------------------------------------------------------------------------
À la soumission du formulaire, on considère par défaut que tous les inputs sont valides,
et à la vérification, des inputs, si l'un d'eux vaux fasle, la soumission ne pourra pas se faire.
------------------------------------------------------------------------------------------------  
*/

  let allInputsValid = true;

  /*
  EXPLICATIONS :
  (1) On cible 1 champs par (cas) 'case' via la boucle forEach déclaré précédement.
  (2) On cible les container parents de chaque classes ciblées: "firstName", "lastName"...
      c.a.d : les "div" ayant la classe : formData.
  */
  const allInputs = document.querySelectorAll('.form .formData input');
  allInputs.forEach((ciblerInput) => {
    inputName = document.querySelector(`#${ciblerInput.id}`); // (1)
    const inputContainer = inputName.parentNode; // (2)
    // console.log(ciblerInput.id);

    switch (ciblerInput.id) {
      // --------------------------------------------------------------------------//
      // TEST DES CHAMPS "firstName" & "lastNAme" ---------------------------------//
      // --------------------------------------------------------------------------//

      case 'firstName':
      case 'lastName':
        //
        if (!ciblerInput.value) {
          allInputsValid = false;
          errorEmptyMessages(inputContainer, errorEmptyMsg);
          //
        } else if (!testString(ciblerInput.value)) {
          errorPersoMessages(inputContainer, errorMinimumString);
          //
        } else {
          removeMessages(inputContainer);
        }
        break;

      // ---------------------------------------------------------------------------//
      // TEST DU CHAMPS "email" ----------------------------------------------------//
      // ---------------------------------------------------------------------------//

      case 'email':
        if (!ciblerInput.value) {
          allInputsValid = false;
          errorEmptyMessages(inputContainer, errorEmptyMsg);
          //
        } else if (!testEmail(ciblerInput.value)) {
          errorPersoMessages(inputContainer, errorEmail);
          //
        } else {
          removeMessages(inputContainer);
        }
        break;

      // -----------------------------------------------------------------------------//
      // TEST DU CHAMPS "birthdate" --------------------------------------------------//
      // -----------------------------------------------------------------------------//

      case 'birthdate':
        if (!ciblerInput.value) {
          allInputsValid = false;
          errorEmptyMessages(inputContainer, errorbirthdateMsg);
        } else {
          removeMessages(inputContainer);
        }
        break;

      // ------------------------------------------------------------------------------//
      // TEST DU CHAMPS "quantity" ----------------------------------------------------//
      // ------------------------------------------------------------------------------//

      case 'quantity':
        if (!ciblerInput.value) {
          allInputsValid = false;
          errorEmptyMessages(inputContainer, errorEmptyMsg);
          //
        } else if (!testQuantity(ciblerInput.value)) {
          errorPersoMessages(inputContainer, errorDateMsg);
          //
        } else {
          removeMessages(inputContainer);
        }
        break;
    }
  });

  // -----------------------------------------------------------------------------------//
  // TEST DES INPUTS RADIOS ------------------------------------------------------------//
  // -----------------------------------------------------------------------------------//

  // (r) Cible le nom de l'ID de chaque ntb radio à chaque tour de boucle.
  const allInputsRadio = document.querySelectorAll('.form input[type="radio"]');
  allInputsRadio.forEach((ciblerInputRadio) => {
    const inputRadioName = document.querySelector(`#${ciblerInputRadio.id}`); //(r)
    const radioContainer = inputRadioName.parentNode;

    switch (ciblerInputRadio.id) {
      // ---------------------------------------------------------------------------------//
      // TEST DES CHAMPS type : "RADIOS" -------------------------------------------------//
      // ---------------------------------------------------------------------------------//

      case 'location1':
      case 'location2':
      case 'location3':
      case 'location4':
      case 'location5':
      case 'location6':
        // si cette condition n'est pas rempli :
        // (A/la fonction renvoie TRUE B/ un input est coché)
        //ALORS… un message d'erreur s'affichera.
        if (!testInputRadioIsChecked(ciblerInputRadio.checked)) {
          allInputsValid = false;
          errorEmptyMessages(radioContainer, errorRadioMessage);
          // SINON…
          // si la condition est rempli.
          // ALORS… on efface les messages d'erreurs qui se seraient imprimés précédemment.
        } else {
          removeMessages(radioContainer);
        }
        break;
    }
  });

  // ----------------------------------------------------------------------------------------//
  // TEST DES INPUTS type : CHECKBOX --------------------------------------------------------//
  // ----------------------------------------------------------------------------------------//

  const allInputsCheckbox = document.querySelectorAll(
    '.form input[type="checkbox"]'
  );
  allInputsCheckbox.forEach((ciblerInputCheckbox) => {
    const inputCheckboxName = document.querySelector(
      `#${ciblerInputCheckbox.id}`
    );
    const checkboxConatiner = inputCheckboxName.parentNode;

    // -------------------------------------------------------------------------------------//
    // TEST DES CHAMPS "CHECKBOX" ----------------------------------------------------------//
    // -------------------------------------------------------------------------------------//

    switch (ciblerInputCheckbox.id) {
      case 'checkbox1':
        //
        if (!testInputCheckboxIsChecked(ciblerInputCheckbox.value)) {
          allInputsValid = false;
          errorEmptyMessages(checkboxConatiner, errorCheckboxMessage);
          //
        } else {
          removeMessages(checkboxConatiner);
        }
        break;
    }
  });

  // if (allInputsValid) {
  //   validate();
  // }
});
/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                          FONCTION FINALE DE VALIDATION 

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------  
*/

// function validate() {
//   closeModal();
//   const containerFinalMsg = document.querySelector('.closeBg');
//   const confirmationMsg = document.createElement('p');
//   confirmationMsg.innerText = 'Merci ! Votre réservation à été reçue.';
//   containerFinalMsg.appendChild(confirmationMsg);
//   console.log(confirmationMsg);
//   // return confirmationMsg;
// }
