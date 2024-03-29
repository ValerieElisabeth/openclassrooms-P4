/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                FONCTION QUI GÈRE LA PARTIE RESPONSIVE DU MENU PRINCIPAL

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Fonction : edithNav() qui change l'apparence du menu principal de la page web au format mobile.
*/

function editNav() {
  const topNav = document.querySelector('#myTopnav');
  const icon = document.querySelector('.icon');

  icon.addEventListener('click', function () {
    if (topNav.className === 'topnav') {
      topNav.className += ' responsive';
    } else {
      topNav.className = 'topnav';
    }
  });
}
editNav();
/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                                    LE FORMULAIRE
                                Ouverture et Fermeture

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

(1) On cible la classe: "bground" qui gère l'affichage de l'OVERLAY => modal => formulaire.
(2) On cible ensuite les 2 boutons :"Je M'inscris" ayant la classe "modal-btn" un pour la (version MOBILE)
et un pour la (version DESCKTOP).
(3) On place sur eux, un écouteur d'évènement, qui au click, va ajouter une classe :  "modal--open",
à côté de la classe : "bground" qui gère l'OVERLAY. La modale S'OUVRIRA, via une boucle forEach, grâce à la classe :
"modal--open" qui sera ajoutée. Cette classe sera pré-stylée en CSS avec un display block pour faire apparaitre le bloc de la modale.
*/

const modalbg = document.querySelector('.bground'); // (1)
const modalBtn = document.querySelectorAll('.modal-btn'); // (2)

// Lance l'ouverture de la modale avec l'écouteur d'évènement au click de l'utilisateur,
// en ciblant les classes "modal-btn".
modalBtn.forEach((ciblerBtn) => {
  ciblerBtn.addEventListener('click', launchModal);
});

// OUVERTURE DE LA MODALE
function launchModal() {
  modalbg.classList.add('modal--open'); // (3)
  modalbg.classList.remove('modal--closed');
}

// FONCTION DE FERMETURE DE LA MODALE via le bouton "X"
function closeModal() {
  modalbg.classList.add('modal--closed');
  modalbg.classList.remove('modal--open');
}

//
/* D : FERMETURE DE LA MODALE EN CIBLANT (au choix) ou sur LE BOUTON : "FERMER", ou sur l'icone "X"
  afin de supprimer le message final et le bouton "Fermer" ou de simplement fermer le formulaire.
  ------------------------------------------------------------------------------------------------

  (Da) Via l'id : "#btn-closure" du bouton "FERMER" on cible la classe :
  ".closed-btn--visible" remplaçante de la classe : ".closed-btn",
  et on l'utilise comme écouteur d'évènement du bouton "fermer", pour qu'au click de l'utilisateur,
  elle effectue les opération suivantes ...

  (Db) Cible la classe : "closeX" et effectue les opération suivantes ...
  ---------
  (D1) Vérifie si la classe : "final-msg" précédement ajouté au paragraphe du message finale,
  existe en la ciblant et :
  (SI) elle existe (ALORS) on la supprime avec la fonction : remove().
  ---------
  (D2) Cible l'actuelle classe du bouton : ".closed-btn--visible" via son ID, pour la remplacer par sa classe d'origine.
  ".closed-btn" qui est en display none : le rendra de nouveau invisible, depuis le formulaire.
   ---------
  (D3) Cible la classe : "form" du formulaire pour supprimer la classe : "d-none"
  afin qu'il ré-apparaisse à la prochaine utilisation en vivible.
  ---------
  (D4) Appel de la fonction qui ferme la modale.
  */

function closeXwindowFinalMessage(cible) {
  cible.addEventListener('click', function () {
    // (Da) Écoute les click du bouton fermer
    // (Db) Écoute les click du bouton CloseX

    const finaLMsgClass = document.querySelector('.final-msg'); // (D1)
    if (finaLMsgClass) {
      finaLMsgClass.remove();
    }

    const btnClosedVisibilityClass = document.querySelector('#btn-closure');
    btnClosedVisibilityClass.classList.replace(
      'closed-btn--visible',
      'closed-btn'
    ); // (D2)

    form.classList.remove('d-none'); // (D3)
    closeModal(); // (D4)
    //
  });
}

// FERMETURE DE LA MODALE PAR l'ICONE DU BOUTON "X"
// (Db) Écoute les click du bouton CloseX du formulaire et ferme sa fenêtre.
const closedXwindowIcon = document.querySelector('.closeX');
closeXwindowFinalMessage(closedXwindowIcon);

/*
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                    LES FONCTIONS TEST ES VALIDATION DU FORMULAIRE
                            (par des valeurs Booléennes)

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
La fonction : test() est spécifique aux expressions regulières
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

function testQuantity(string) {
  // (1)
  const patternQuantity = /^(?:[0-9]|[1-9][0-9]|100)$/;
  // console.log(testQuantity('valérie'));
  return patternQuantity.test(string); // ()
}

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
(5) La fonction setAttribute(), permet de récupérer directement dans le fichier CSS, un attribut qui porte le nom :
"attr(data-error)". Celui-ci, contient le style CSS des nos messages d'erreurs et prévoit de les inclure ::after,
après, la div Parente de l'input.
(6) L'attribut CSS : "attr(data-error-visible)" permet que le message d'erreur passe d'une opacité de 0 à 100%, car sa valeur est true. 
 */

// FONCTION (A) Affiche les messages si l'input est vide.
function errorEmptyMessages(container, errorEmptyMsg) {
  container.setAttribute('data-error', errorEmptyMsg); // (5)
  container.setAttribute('data-error-visible', true); // (6)
}

// FONCTION (B) Affiche les messages personnalisés, si les conditions de sont pas remplies.
function errorPersoMessages(container, msgPerso) {
  container.setAttribute('data-error', msgPerso);
  container.setAttribute('data-error-visible', true);
}

// FONCTION (C) Efface les messages inscrit dans le container Parent.
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
const errorDateMsg = 'Vous devez saisir un nombre positif';
const errorEmail = 'Vous devez saisir une adresse e-mail valide';
const errorRadioMessage = 'Vous devez choisir une option';
const errorCheckboxMessage = "Vous devez accepter les conditions d'utilisation";
const messageFinal_confirmation =
  'Merci !\n votre inscription \n a bien été envoyé';

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
          allInputsValid = false;
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
          allInputsValid = false;
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
        if (!testQuantity(ciblerInput.value)) {
          allInputsValid = false;
          errorPersoMessages(inputContainer, errorDateMsg);
        } else if (!ciblerInput.value) {
          allInputsValid = false;
          errorEmptyMessages(inputContainer, errorEmptyMsg);
        } else {
          removeMessages(inputContainer);
        }
        break;
    }
  });

  // -----------------------------------------------------------------------------------//
  // TEST DES INPUTS RADIOS ------------------------------------------------------------//
  // -----------------------------------------------------------------------------------//

  // (r) Cible le nom de l'ID de chaque btn radio à chaque tour de boucle.
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
    const checkboxContainer = inputCheckboxName.parentNode;

    // -------------------------------------------------------------------------------------//
    // -------------------------------------------------------------------------------------//

    switch (ciblerInputCheckbox.id) {
      case 'checkbox1':
        //
        if (!testInputCheckboxIsChecked(ciblerInputCheckbox)) {
          allInputsValid = false;
          errorEmptyMessages(checkboxContainer, errorCheckboxMessage);
          //
        } else {
          removeMessages(checkboxContainer);
        }
        break;
    }
  });

  if (allInputsValid) {
    validate();
  }
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

function validate() {
  //
  /* // A : EFFACER LE FORMULAIRE :
  ---------------------------------------------------------------------------------------------
  (1) cible la classe : "form" pour initialiser ou remettre à zéro les inputs du formulaire, avec la fonction : "reset()"
  (2) Cache le formulaire en lui ajoutant une classe CSS display none.
  */

  form.reset(); //(1) à remettre après les essais
  form.classList.add('d-none'); // (2)

  //
  /* // B : CRÉATION DU MESSAGE DE CONFIRMATION :
  ---------------------------------------------------------------------------------------------
  (2a) Cible le container Parent du formulaire : "modal-body"
  (2b) Création d'un paragraphe dans le DOM.
  (2c) Insertion du message de confirmation dans le paragraphe, via une constante pré-définie.
  (2d) Ajout d'une classe appellée : "final-msg" au paragraphe précédement crée.
  La classe : "final-msg" est stylée directement dans le fihier CSS.
  (2e) Rattachement de l'enfant "<p>" à son parent ".modal-body" afin qu'il apparaisse sur la page web.
  */
  const modalBody_Parent = document.querySelector('.modal-body'); // (2a)
  const messageFinal_Enfant = document.createElement('p'); // (2b)
  messageFinal_Enfant.innerText = messageFinal_confirmation; // (2c)
  messageFinal_Enfant.classList.add('final-msg'); // (2d)
  modalBody_Parent.appendChild(messageFinal_Enfant); // (2e)

  //
  /* C : CIBLER LE BOUTON : "FERMER" et lui ajouter une classe qui le rend visible.
  ---------------------------------------------------------------------------------------------
  (3a) Cible la classe : "closed-btn" DU BOUTON "FERMER"
  (3b) Puis, remplace sa classe "closed-btn" par la classe "closed-btn--visible", de façon dynamique,
  directement dans le fichier HTML, avec la fonction : "classList.replace".
  La classe ".bouton--visible" est stylée directement dans le fichier CSS, et prend la valeur display : block.
  Rendant ainsi le bouton : "FERMER" qui par défaut est : display : none.
  */

  const ciblerCloseBtn = document.querySelector('.closed-btn'); // (3a)
  ciblerCloseBtn.classList.replace('closed-btn', 'closed-btn--visible'); // (3b)

  //
  /* D : CIBLER LE BOUTON : "FERMER", le supprimer ainsi que le message final.
  ------------------------------------------------------------------------------------------------
  (Da) On cible l'id : "#btn-closure" qui remplacera de la classe : ".closed-btn".
  */

  const btnClosure = document.querySelector('#btn-closure'); // (Da)
  closeXwindowFinalMessage(btnClosure);
  //
  //
} // fin function validate()
