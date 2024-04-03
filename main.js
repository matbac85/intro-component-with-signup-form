// Attendez que le contenu HTML soit chargé avant d'exécuter le code JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionnez le formulaire
  const form = document.querySelector(".b-form");

  // Écoutez l'événement de soumission du formulaire
  form.addEventListener("submit", function (event) {
    // Empêchez le formulaire de se soumettre par défaut
    event.preventDefault();

    // Récupérez les valeurs des champs de formulaire
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // Supprimez les espaces blancs des valeurs des champs de formulaire
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // Initialisez un indicateur d'erreur
    let errorFlag = false;

    // Validation du champ Prénom
    if (firstNameValue === "") {
      // Affichez un message d'erreur si le champ est vide
      setErrorFor(firstName, "First Name cannot be empty");
      // Définissez l'indicateur d'erreur sur true
      errorFlag = true;
    } else {
      // Supprimez le message d'erreur si le champ est rempli
      removeErrorFor(firstName);
    }

    // Validation du champ Nom
    if (lastNameValue === "") {
      // Affichez un message d'erreur si le champ est vide
      setErrorFor(lastName, "Last Name cannot be empty");
      // Définissez l'indicateur d'erreur sur true
      errorFlag = true;
    } else {
      // Supprimez le message d'erreur si le champ est rempli
      removeErrorFor(lastName);
    }

    // Validation du champ Email
    if (emailValue === "") {
      // Affichez un message d'erreur si le champ est vide
      setErrorFor(email, "Email Address cannot be empty");
      // Définissez l'indicateur d'erreur sur true
      errorFlag = true;
    } else if (!isEmail(emailValue)) {
      // Affichez un message d'erreur si l'email n'est pas valide
      setErrorFor(email, "Looks like this is not an email");
      // Définissez l'indicateur d'erreur sur true
      errorFlag = true;
    } else {
      // Supprimez le message d'erreur si le champ est rempli et valide
      removeErrorFor(email);
    }

    // Validation du champ Mot de passe
    if (passwordValue === "") {
      // Affichez un message d'erreur si le champ est vide
      setErrorFor(password, "Password cannot be empty");
      // Définissez l'indicateur d'erreur sur true
      errorFlag = true;
    } else {
      // Supprimez le message d'erreur si le champ est rempli
      removeErrorFor(password);
    }

    // Soumettez le formulaire s'il n'y a pas d'erreur de validation
    if (!errorFlag) {
      // Soumettre le formulaire
      form.submit();
    }
  });

  // Fonction pour afficher un message d'erreur pour un champ de formulaire
  function setErrorFor(input, message) {
    // Trouvez le conteneur du champ de formulaire
    const wrapper = input.closest(".e-form__input-wrapper");
    // Créez un élément de message d'erreur
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("message-error");
    errorMessage.textContent = message;

    // Créez une icône SVG d'erreur
    const svgIcon = `
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <circle fill="#FF7979" cx="12" cy="12" r="12" />
          <rect fill="#FFF" x="11" y="6" width="2" height="9" rx="1" />
          <rect fill="#FFF" x="11" y="17" width="2" height="2" rx="1" />
        </g>
      </svg>`;

    // Créez un conteneur pour l'icône SVG
    const iconWrapper = document.createElement("div");
    iconWrapper.innerHTML = svgIcon;

    // Ajoutez la classe "error" au champ de formulaire pour indiquer une erreur
    input.classList.add("error");
    // Ajoutez le message d'erreur et l'icône SVG au conteneur du champ de formulaire
    wrapper.appendChild(errorMessage);
    wrapper.appendChild(iconWrapper);
  }

  // Fonction pour supprimer le message d'erreur d'un champ de formulaire
  function removeErrorFor(input) {
    // Trouvez le conteneur du champ de formulaire
    const wrapper = input.closest(".e-form__input-wrapper");
    // Supprimez la classe "error" du champ de formulaire
    wrapper.classList.remove("error");
    // Trouvez et supprimez le message d'erreur
    const errorMessage = wrapper.querySelector(".message-error");
    const iconWrapper = wrapper.querySelector("svg");
    if (errorMessage) {
      wrapper.removeChild(errorMessage);
    }
    if (iconWrapper) {
      wrapper.removeChild(iconWrapper);
    }
  }

  // Fonction pour valider un email avec une expression régulière
  function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
