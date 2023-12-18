function createForm() {
    const formContent = `
    <div class="modal">
        <header>
            <h2>Contactez-moi</h2>
            <img src="assets/icons/close.svg" onclick="closeModal()" />
        </header>
        <form id="contactForm">
            <div>
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" />
                <span id="firstNameError" class="error"></span>
            </div>
            <div>
                <label for="nom">Nom</label>
                <input type="text" id="nom" name="nom" />
                <span id="lastNameError" class="error"></span>
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" />
                <span id="emailError" class="error"></span>
            </div>
            <div>
                <label for="message">Votre message</label>
                <textarea id="message" name="message" rows="4" cols="50"></textarea>
                <span id="messageError" class="error"></span>
            </div>
            <button type="button" onclick="submitForm()" class="contact_button">Envoyer</button>
        </form>                
    </div>`;

    // Get the modal element and set its innerHTML
    const modalElement = document.querySelector('#contact_modal');
    modalElement.innerHTML = formContent;
}

createForm();

// Get form values
const form = document.getElementById("contactForm");
const firstName = document.getElementById("prenom");
const lastName = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const modal = document.getElementById("contact_modal");
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function displayModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    clearErrorMessages();
    clearInputFields();
}

function clearErrorMessages() {
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
}
function clearInputFields() {
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    message.value = "";
}

function showError(field, errorMessage) {
    field.textContent = errorMessage;
}

function validateField(value, regex, errorField, errorMessage) {
    if (!regex.test(value)) {
        showError(errorField, errorMessage);
        return false;
    }
    return true;
}

function validateForm() {
    clearErrorMessages();
    let isValid = true;

    isValid =
        validateField(
            firstName.value,
            /^[A-Za-z]+$/,
            firstNameError,
            "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
        ) && isValid;
    isValid =
        validateField(
            lastName.value,
            /^[A-Za-z]+$/,
            lastNameError,
            "Veuillez entrer 2 caractères ou plus pour le champ du nom."
        ) && isValid;
    isValid =
        validateField(
            email.value,
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            emailError,
            "Veuillez entrer une adresse email valide."
        ) && isValid;

    if (message.value.trim() === "") {
        showError(messageError, "Veuillez entrer un message.");
        isValid = false;
    }

    return isValid;
}

function submitForm() {
    if (validateForm()) {
        const formData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            message: message.value,
        };

        console.log("Form Data:", formData);

        closeModal();
    }
}
