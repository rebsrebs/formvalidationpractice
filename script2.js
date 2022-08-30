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

// UTILITY FUNCTIONS
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const matchesPattern = function(value, pattern) {
  var testPattern = newRegex(pattern);
  return !testPattern.test(value.toString());
}
const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const isPasswordSecure = (password) => {
  // const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const re2 = new RegExp('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$');
  return re2.test(password);
};




// CHECKING EMAIL
emailAddress.addEventListener('blur', () => {
  if (emailAddress.validity.valid) {
    emailError.textContent = ''; 
    emailError.className = 'error'; 
  } else {
    emailShowError();
  }
})

// COUNTRY CHANGE EVENT LISTENER
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
      // zipcode.pattern='^[ABCEGHJ-NPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z][ -]?\\d[ABCEGHJ-NPRSTV-Z]\\d$';
      zipcode.pattern='^[^\\W\\d_DFIOQUWZdfioquwz]\\d[^\\W\\d_DFIOQUdfioqu][ -]?\\d[^\\W\\d_DFIOQUdfioqu]\\d$';
    }
  }
});

// ZIPCODE BLUR EVENT LISTENER
zipcode.addEventListener('blur', () => {
  if (!zipcode.validity.valid) {
    showError(zipcode, 'Please enter a valid zipcode.');
    // zipcodeError.className='error active'
    // zipcodeError.textContent='Please enter a valid zipcode.'
  } else {
    // zipcodeError.className='error';
    // zipcodeError.textContent='';
    showSuccess(zipcode);
  }
});


function emailShowError() {
  if (emailAddress.validity.valueMissing) {
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if (emailAddress.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (emailAddress.validity.tooShort) {
    emailError.textContent = `Email should be at least ${emailAddress.minLength} characters; you entered ${emailAddress.value.length}.`;
  }
  emailError.className = 'error active';
  // showError(email);
}

// CHECKING PASSWORD
password.addEventListener('blur', (event) => {
  if (password.validity.valid) {
    passwordError.textContent = '';
    passwordError.className = 'error';
  } else {
    passwordError.className = 'error active';
    passwordError.textContent = 'Password must contain at least 8 characters, and at least 1 letter, 1 number, and 1 special character.'
  }
});

// CHECKING CONFIRM PASSWORD
confirmPassword.addEventListener('blur', (event) => {
  console.log(`password.value is ${password.value}`);
  console.log(`confirmPassword.value is ${confirmPassword.value}`);
  if (confirmPassword.value != password.value) {
    confirmPasswordError.className = 'error active';
    confirmPasswordError.textContent = 'Must match password.'
  } else {
    confirmPasswordError.textContent = '';
    confirmPasswordError.className = 'error';
  }
});

// eye buttons
const eyes = document.querySelectorAll('.showhide');
  for (let i = 0; i < eyes.length; i++) {
    eyes[i].addEventListener("click", function(event) {
      let id = event.target.getAttribute("data-pwd");
      let targetIcon = event.target;
      let targetInput = document.getElementById(id)
      if (targetInput.type=='password') {
        targetInput.type='text';
        targetIcon.src='./images/eye-off.svg';
      } else if (targetInput.type=='text') {
        targetInput.type='password';
        targetIcon.src='./images/eye.svg';
      }
    });
  }

// CHECKING FORM ON SUBMIT
form3.addEventListener('submit', (event) => {
  if (!emailAddress.validity.valid) {
    emailShowError();
    event.preventDefault();
  }
  if (!zipcode.validity.valid) {
    zipcodeError.textContent='you still need to fix your zip code.'
    zipcodeError.className='error active';
    event.preventDefault();
  }
});


// const showError = (input, message) => {
//   console.log('showError is running');
//   // get the formfield div that surrounds the input
//   const formField = input.parentElement;
//   // add the error class
//   formField.classList.remove('success');
//   formField.classList.add('error');
//   // show the error message
//   const error = formField.querySelector('.error');
//   error.textContent = message;
// };

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

// const showSuccess = (input) => {
//   console.log('show success function')
//   // get the form-field element
//   const formField = input.parentElement;
//   console.log(formField)
//   // remove the error class
//   formField.classList.remove('error');
//   formField.classList.add('success');
//   // hide the error message
//   const error = formField.querySelector('.error');
//   error.textContent = '';
// }

