const  id = (id) => document.getElementById(id);

const emailAddress = id('email');
const emailError = id('emailError');
const zipcode = id('zipcode');
const zipcodeError = id('zipcodeError');
const country = id('country');
const form3  = id('form3');
const password = id('password');
const passwordError = id('passwordError');
const confirmPassword = id('confirmPassword');
const confirmPasswordError = id('confirmPasswordError');

// CHECKING EMAIL ON INPUT
emailAddress.addEventListener('input', () => {
  // if the email address is valid:
  if (emailAddress.validity.valid) {
    // remove error message
    emailError.textContent = ''; // Reset the content of the message
    emailError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    emailShowError();
  }
})

// CHECK FOR COUNTRY TO SHOW OR HIDE ZIPCODE INPUT
country.addEventListener('input', () => {
  // if a country is selected
  if (country.value != "selectCountry") {
    // show the zipcode input
    zipcode.classList.remove('hidden');
    zipcodeError.classList.remove('hidden');
  } else {
    // otherwise hide the zipcode input
    zipcode.classList.add('hidden');
    zipcodeError.classList.add('hidden');
  }
})

// CHECKING ZIPCODE ON INPUT
zipcode.addEventListener('input', (event) => {
  // get current zip code input value
  let userZipCode = document.getElementById("zipcode").value;
  // create regex expressions
  var usmx = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
  var can = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i);
  // if country is US or Mexico
  if (country.value === "unitedStates" || country.value === "mexico") {
    // if zip code fails regex test show error message
    if (!usmx.test(userZipCode.toString())) {
      zipcodeError.textContent = 'Please enter a valid zip code.';
      zipcodeError.className = 'error active';  
    } else {
      zipcodeError.textContent = ''; // Reset the content of the message
      zipcodeError.className = 'error'; // Reset the visual state of the message
    }
  // if country is canada
  } else if (country.value === "canada") {
    // if zip code fails test
    if (!can.test(userZipCode.toString())) {
      // show error message
      zipcodeError.textContent = 'Please enter a valid Canadian zip code.';
      zipcodeError.className = 'error active';
    } else {
      console.log('no error');
      zipcodeError.textContent = ''; // Reset the content of the message
      zipcodeError.className = 'error'; // Reset the visual state of the message
    }
  } 
}
);

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

// CHECKING PASSWORD ON INPUT
password.addEventListener('input', (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.
  // if the email address is valid:
  if (password.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    passwordError.textContent = ''; // Reset the content of the message
    passwordError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    passwordError.className = 'error active';
    passwordError.textContent = 'Must contain at least 8 characters, 1 letter, 1 number and 1 special character.'
  }
});

// CHECKING CONFIRM PASSWORD ON INPUT
confirmPassword.addEventListener('input', (event) => {
  console.log(`password.value is ${password.value}`);
  console.log(`confirmPassword.value is ${confirmPassword.value}`);
  // if the email address is valid:
  if (confirmPassword.value != password.value) {
    // If there is still an error, show the correct error
    confirmPasswordError.className = 'error active';
    confirmPasswordError.textContent = 'Must match password.'
  } else {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    confirmPasswordError.textContent = ''; // Reset the content of the message
    confirmPasswordError.className = 'error'; // Reset the visual state of the message
  }
});

// eye buttons
const eyes = document.querySelectorAll('.showhide');
  for (let i = 0; i < eyes.length; i++) {
    eyes[i].addEventListener("click", function(event) {
      let id = event.target.getAttribute("data-pwd");
      let targetIcon = event.target;
      let targetInput = document.getElementById(id)
      console.log(id);
      console.log(targetInput);
      console.log(targetInput.type);
      if (targetInput.type=='password') {
        targetInput.type='text';
        targetIcon.src='./images/eye-off.svg';
      } else if (targetInput.type=='text') {
        targetInput.type='password';
        targetIcon.src='./images/eye.svg';
      }
    });
  }

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