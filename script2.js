const  id = (id) => document.getElementById(id);

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
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  return re.test(password);
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

// CHECK FOR COUNTRY TO SHOW OR HIDE ZIPCODE INPUT
country.addEventListener('input', () => {
  zipcode.value='';
  if (country.value === "selectCountry") {
    zipcode.classList.add('hidden');
    zipcodeError.classList.add('hidden');
    return;
  } else if (country.value === "unitedStates" || country.value === "mexico") {
    zipcode.pattern = '/(^\\d{5}$)|(^\\d{5}-\\d{4}$)/';
  } else if (country.value === "canada") {
    zipcode.pattern = '/^[ABCEGHJ-NPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z][ -]?\\d[ABCEGHJ-NPRSTV-Z]\\d$/i';
  }
  zipcode.classList.remove('hidden');
  zipcodeError.classList.remove('hidden');
})


// country.addEventListener('input', () => {
//   // if a country is selected
//   if (country.value != "selectCountry") {
//     // show the zipcode input
//     zipcode.classList.remove('hidden');
//     zipcodeError.classList.remove('hidden');
//   } else {
//     // otherwise hide the zipcode input
//     zipcode.classList.add('hidden');
//     zipcodeError.classList.add('hidden');
//   }
// })

// CHECKING ZIPCODE ON INPUT
zipcode.addEventListener('blur', () => {
  if (!zipcode.checkValidity()) {
    console.log(zipcode.checkValidity());
    console.log ('zipcode not good')
    console.log( zipcode.pattern)
    zipcodeError.className='error active'
    zipcodeError.textContent='zipcode not good'
    zipcode.setCustomValidity('string')
  } else {
    zipcodeError.className='error';
    zipcodeError.textContent='';
  }
  // var usmx = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
  // var can = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i);
  // // if country is US or Mexico
  // if (country.value === "unitedStates" || country.value === "mexico") {
  //   // if zip code fails regex test show error message
  //   if (!usmx.test(userZipCode.toString())) {
  //     zipcodeError.textContent = 'Please enter a valid zip code.';
  //     zipcodeError.className = 'error active';  
  //   } else {
  //     zipcodeError.textContent = ''; // Reset the content of the message
  //     zipcodeError.className = 'error'; // Reset the visual state of the message
  //   }
  // // if country is canada
  // } else if (country.value === "canada") {
  //   // if zip code fails test
  //   if (!can.test(userZipCode.toString())) {
  //     // show error message
  //     zipcodeError.textContent = 'Please enter a valid Canadian zip code.';
  //     zipcodeError.className = 'error active';
  //   } else {
  //     console.log('no error');
  //     zipcodeError.textContent = ''; // Reset the content of the message
  //     zipcodeError.className = 'error'; // Reset the visual state of the message
  //   }
  // } 
}
);

function emailShowError() {
  if (emailAddress.validity.valueMissing) {
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if (emailAddress.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (emailAddress.validity.tooShort) {
    emailError.textContent = `Email should be at least ${emailAddress.minLength} characters; you entered ${emailAddress.value.length}.`;
  }
  emailError.className = 'error active';
}

// CHECKING PASSWORD
password.addEventListener('blur', (event) => {
  if (password.validity.valid) {
    passwordError.textContent = '';
    passwordError.className = 'error';
  } else {
    passwordError.className = 'error active';
    passwordError.textContent = 'Must contain at least 8 characters, 1 letter, 1 number and 1 special character.'
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

