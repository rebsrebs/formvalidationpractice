const  id = (id) => document.getElementById(id);

// VARIABLES
const form3  = id('form3');
const emailAddress = id('email');
const emailError = id('emailError');
const country = id('country');
const zipcode = id('zipcode');
const zipcodeError = id('zipcodeError');
const password = id('password');
const passwordError = id('passwordError');
const confirmPassword = id('confirmPassword');
const confirmPasswordError = id('confirmPasswordError');

//---- INDIVIDUAL INPUT EVENT LISTENERS ----

// EMAIL BLUR EVENT LISTENER
emailAddress.addEventListener('blur', () => {
  if (email.validity.valid) {
    showSuccess(email); 
  } else {
    emailShowError();
  }
})

// COUNTRY CHANGE EVENT LISTENER
// if a country is selected, shows zipcode input and 
// sets zipcode pattern attribute accordingly
country.addEventListener('change', ()=>{
  zipcode.value='';
  if (country.value === "selectCountry") {
    zipcode.classList.add('hidden');
    zipcodeError.classList.add('hidden');
    return;
  } else {
    zipcode.classList.remove('hidden');
    zipcodeError.classList.remove('hidden');
      if (country.value === "unitedStates" || country.value === "mexico") {
      zipcode.pattern='(^\\d{5}$)|(^\\d{5}-\\d{4}$)';
      } else if (country.value === "canada") {
      zipcode.pattern='^[^\\W\\d_DFIOQUWZdfioquwz]\\d[^\\W\\d_DFIOQUdfioqu][ -]?\\d[^\\W\\d_DFIOQUdfioqu]\\d$';
    }
  }
});

// ZIPCODE BLUR EVENT LISTENER
zipcode.addEventListener('blur', () => {
  if (!zipcode.validity.valid) {
    showError(zipcode, 'Please enter a valid zipcode.');
  } else {
    showSuccess(zipcode);
  }
});

// PASSWORD BLUR EVENT LISTENER
password.addEventListener('blur', () => {
  if (password.validity.valid) {
    showSuccess(password);
  } else {
    passwordShowError();
  }
});

// CONFIRM PASSWORD BLUR EVENT LISTENER
confirmPassword.addEventListener('blur', () => {
  if (confirmPassword.value != password.value) {
    showError(confirmPassword, 'Must match password.');
  } else {
    showSuccess(confirmPassword);
  }
});

//---- END INDIVIDUAL INPUT EVENT LISTENERS ----

// CHECKING FORM ON SUBMIT
form3.addEventListener('submit', (event) => {
  if (!emailAddress.validity.valid) {
    emailShowError();
    event.preventDefault();
  }
  if (!zipcode.validity.valid) {
    showError(zipcode, 'You still need to fix the zip code.')
    event.preventDefault();
  }
  if (!password.validity.valid) {
    passwordShowError();
    event.preventDefault();
  }
  if (confirmPassword.value != password.value) {
    showError(confirmPassword, 'Must match password.');
    event.preventDefault();
  }
});

// DISPLAY ERROR FUNCTIONS

const showError = (input, message) => {
  const theID = input.getAttribute('data-errorid');
  const errorP  = id(theID);
  errorP.textContent = message;
  errorP.className = 'error active';
}

const showSuccess = (input) => {
  const theID = input.getAttribute('data-errorid');
  const errorP  = id(theID);
  errorP.textContent = '';
  errorP.className = 'error';
}

function emailShowError() {
  if (emailAddress.validity.valueMissing) {
    showError(email,'An e-mail address is required.')
  } else if (emailAddress.validity.typeMismatch) {
    showError(email, 'Please enter a valid e-mail address.')
  } else if (emailAddress.validity.tooShort) {
    showError(email,`Email should be at least ${emailAddress.minLength} characters; you entered ${emailAddress.value.length}.`)
  }
}

function passwordShowError() {
  if (password.validity.patternMismatch) {
    showError(password, 'Password must contain at least 8 characters, and at least 1 letter, 1 number, and 1 special character.')
  } else if (password.validity.valueMissing) {
    showError(password, 'A password is required.')
  }
}

// EYE BUTTONS
const eyes = document.querySelectorAll('.showhide');
  for (let i = 0; i < eyes.length; i++) {
    eyes[i].addEventListener("click", function(event) {
      let dataId = event.target.getAttribute("data-pwd");
      let targetIcon = event.target;
      let targetInput = id(dataId)
      if (targetInput.type=='password') {
        targetInput.type='text';
        targetIcon.src='./images/eye-off.svg';
      } else if (targetInput.type=='text') {
        targetInput.type='password';
        targetIcon.src='./images/eye.svg';
      }
    });
  }
