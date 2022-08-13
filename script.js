const emailAddress = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');
const form2  = document.getElementById('form2');

// emailAddress.addEventListener("input", (event) => {
//   if (emailAddress.validity.typeMismatch) {
//     emailAddress.setCustomValidity("Yo, I am expecting an e-mail address!");
//     emailAddress.reportValidity();
//   } else {
//     emailAddress.setCustomValidity("");
//   }
// });

emailAddress.addEventListener('input', (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.
  // if the email address is valid:
  if (emailAddress.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ''; // Reset the content of the message
    emailError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form2.addEventListener('submit', (event) => {
  // if the email field is valid, we let the form submit

  if (!emailAddress.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function showError() {
  if (emailAddress.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if (emailAddress.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (emailAddress.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${emailAddress.minLength} characters; you entered ${emailAddress.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = 'error active';
}


// don't really understand:
//const test = email.value.length === 0 || 
//emailRegExp.test(email.value);