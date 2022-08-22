const emailAddress = document.getElementById('email');
const emailError = document.getElementById('emailError');
const zipcode = document.getElementById('zipcode');
const zipcodeError = document.getElementById('zipcodeError');
const country = document.getElementById('country');
const form3  = document.getElementById('form3');


// CHECKING ON INPUT
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
    emailShowError();
  }
});


// CHECK FOR COUNTRY
country.addEventListener('input', () => {
  if (country.value != "selectCountry") {
    zipcode.classList.remove('hidden');
    zipcodeError.classList.remove('hidden');
  } else {
    zipcode.classList.add('hidden');
    zipcodeError.classList.add('hidden');
  }
})


// CHECKING ZIPCODE ON INPUT
zipcode.addEventListener('input', (event) => {

  var usmx = new RegExp("^\\d{5}(-{0,1}\\d{4})?$");
  var can = new RegExp("^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]●?[0-9][A-Z][0-9]$");
  
  // if country is blank
  if (country.value == "unitedStates" || country.value == "mexico") {
    if (!usmx.test(zipcode.toString())) {
      zipcodeError.textContent = 'Please enter a valid zip code.';
    zipcodeError.className = 'error active';
      return;
  }
  } else if (country.value == "canada") {
    if (!can.test(zipcode.toString())) {
      zipcodeError.textContent = 'Please enter a valid Canadian zip code.';
    zipcodeError.className = 'error active';
      return;
    }
  } else {
  zipcodeError.textContent = ''; // Reset the content of the message
  zipcodeError.className = 'error'; // Reset the visual state of the message
  }
});



// CHECKING ON SUBMIT
form3.addEventListener('submit', (event) => {
  // if the email field is valid, we let the form submit
  if (!emailAddress.validity.valid) {
    // If it isn't, we display an appropriate error message
    emailShowError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function emailShowError() {
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

// function zipcodeShowError() {
//   if (zipcode.validity.valueMissing) {
//     zipcodeError.textContent = 'Please enter a zip code';
//   } else if () {

//   }
//     // If the field is empty,
//     // display the following error message.
//   zipcodeError.textContent = 'Please enter a valid Canadian zip code';
//   zipcodeError.className = 'error active';
// }