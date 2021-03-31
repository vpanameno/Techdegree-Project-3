//Treehouse Techdegree Project 3: Interactive Form

//In this project I worked on making my form interactive using several techniques from JavaScript
//I learned alot more about the DOM but also about form validation and accessibility

//***NAME INFO***
//Add the focus property to the element
const name = document.querySelector("#name");
name.focus({ preventScroll: true });

//**JOB INFO**
//select elements you will use
const jobRoles = document.querySelector("#title"); //Selecting select element (drop down menu)
const otherTextArea = document.querySelector("#other-job-role"); //selecting the other option text area

otherTextArea.hidden = true; //hides textarea by default

jobRoles.addEventListener("change", e => {
  //every time there is a change

  // console.log(e.target.value);
  if (e.target.value == "other") {
    //if the what they clicked on is other then execute code
    otherTextArea.hidden = false;
  } else {
    //else just continue hiding text box
    otherTextArea.hidden = true;
  }
});

//******T-SHIRT INFO*******
//select elements you will use
const colorSelect = document.querySelector("#color");
const designSelect = document.querySelector("#design");
const colorOptions = document.querySelectorAll("#color option");

//disables the color options menu
color.disabled = true;

//create event listener to listen for changes
designSelect.addEventListener("change", e => {
  color.disabled = false; //allow for user to click a design color
  for (let i = 1; i < colorOptions.length; i += 1) {
    //loops over all of the color options
    let colorAttribute = colorOptions[i].getAttribute("data-theme"); //gets the attribute name that would match design
    let clickedDesignValue = event.target.value; //the clicked design's value that would match the color

    if (colorAttribute == clickedDesignValue) {
      //if the attribute and the value match
      colorOptions[i].hidden = false; //that color option will be displayed
      colorOptions[i].setAttribute("selected", true);
    } else {
      colorOptions[i].hidden = true; //that color option will be hidden
      colorOptions[i].removeAttribute("selected", false);
    }
  }
});
//***REGISTER FOR ACTIVITIES SECTION***
const fieldset = document.querySelector("#activities");
let activityTotal = 0; //created a total variable to hold the final total

fieldset.addEventListener("change", e => {
  const clicked = event.target;
  const clickedAmt = +clicked.getAttribute("data-cost");
  const displayTotal = document.querySelector("#activities-cost");

  if (clicked.checked) {
    activityTotal += clickedAmt; //This needs to add the previous total to the new amt
  } else {
    activityTotal -= clickedAmt; //subtracting it from the total if removing activity
  }
  displayTotal.innerHTML = `Total: $${activityTotal}`; //displaying total
});
//**ADD EXTRA CREDIT HERE**
//This will avoid double-booking for an activity
const checkboxes = document.querySelectorAll("input[type = checkbox]");

fieldset.addEventListener("change", e => {
  let clickedEvent = event.target;
  let clickedEventType = clickedEvent.getAttribute("data-day-and-time");
  for (let i = 0; i < checkboxes.length; i += 1) {
    let checkboxType = checkboxes[i].getAttribute("data-day-and-time");
    if (checkboxType == clickedEventType && clickedEvent != checkboxes[i]) {
      if (clickedEvent.checked) {
        checkboxes[i].disabled = true;
      } else {
        checkboxes[i].disabled = false;
      }
    }
  }
});

//***PAYMENT OPTIONS***
//Select elements you will use to manipulate payment sections
const paymentSelect = document.querySelector("#payment");
const paymentOptions = document.querySelectorAll("#payment option");

const creditcard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");

paymentOptions[1].selected = true; //SELECT CREDIT CARD AS DEFAULT OPTION
paypal.hidden = true; //HIDE PAYPAL DIV
bitcoin.hidden = true; //HIDE BITCOIN DIV

//Below we will hide/display the sections corresponding to what you select
paymentSelect.addEventListener("change", e => {
  if (event.target.value == "paypal") {
    paypal.hidden = false;
    creditcard.hidden = true;
    bitcoin.hidden = true;
  } else if (event.target.value == "bitcoin") {
    creditcard.hidden = true;
    paypal.hidden = true;
    bitcoin.hidden = false;
  } else if (event.target.value == "credit-card") {
    creditcard.hidden = false;
    bitcoin.hidden = true;
    paypal.hidden = true;
  }
});

//**FORM VALIDATION**
//helper functions for name, email address, register for one activity,credit card validation
//select elements from the form you will use
const form = document.querySelector("form");
const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
const cCNumberElement = document.querySelector("#cc-num");
const zipCode = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const div = document.querySelector("#activities-box");

//FUNCTION TO PASS
function validationPass(element) {
  element.parentElement.className = "valid";
  element.parentElement.removeClass = "not-valid";
  element.parentElement.lastElementChild.hidden = true;
  console.log("You Pass!");
}

//FUNCTION TO FAIL
function validationFail(element) {
  element.parentElement.className = "not-valid";
  element.parentElement.removeClass = "valid";
  element.parentElement.lastElementChild.hidden = false;
  console.log("You Fail!");
}
//HELPER FUNCTION: NAME
function nameValidator() {
  const nameValue = nameElement.value;
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
  console.log(
    `Name validation test on "${nameValue}" evaluates to ${nameIsValid}`
  );
  if (nameIsValid) {
    validationPass(nameElement);
  } else {
    validationFail(nameElement);
  }
  return nameIsValid;
}

//HELPER FUNCTION: EMAIL
function emailValidator() {
  const emailValue = emailElement.value;
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
  console.log(
    `Email validation test on "${emailValue}" evaluates to ${emailIsValid}`
  );
  if (emailIsValid) {
    validationPass(emailElement);
  } else {
    validationFail(emailElement);
  }
  return emailIsValid;
}

//HELPER FUNCTION: REGISTERING FOR ONE ACTIVITY
function registrationValidator() {
  let legend = 
  let activityValid = activityTotal > 0;
  if (activityValid) {
    validationPass(fieldset);
  } else {
    validationFail(fieldset);
    console.log(legend.parentElement);
  }
  return activityValid;
}

// //HELPER FUNCTION: CREDIT CARD - NUMBER
function ccNumValid() {
  if (!creditcard.hidden) {
    const cCNumberValue = cCNumberElement.value;
    const cCNumberValid = /^\d{13,16}$/.test(cCNumberValue); //no dashes or spaces
    console.log(
      `cc validation test on "${cCNumberValue}" evaluates to ${cCNumberValid}`
    );
    if (cCNumberValid) {
      validationPass(cCNumberElement);
    } else {
      validationFail(cCNumberElement);
    }
    return cCNumberValid;
  }
}
// //HELPER FUNCTION: CREDIT CARD - ZIP CODE
function zipValid() {
  if (!creditcard.hidden) {
    const zipCodeValue = zipCode.value;
    const zipCodeValid = /^\d{5}$/.test(zipCodeValue);
    console.log(
      `credit card validation test on "${zipCodeValue}" evaluates to ${zipCodeValid}`
    );
    if (zipCodeValid) {
      validationPass(zipCode);
    } else {
      validationFail(zipCode);
    }
    return zipCodeValid;
  }
}
//HELPER FUNCTION: CREDIT CARD - CVV
function cvvValid() {
  if (!creditcard.hidden) {
    const cvvValue = cvv.value;
    const cvvNumberValid = /^\d{3}$/.test(cvvValue);
    console.log(
      `credit card validation test on "${cvvValue}" evaluates to ${cvvNumberValid}`
    );
    if (cvvNumberValid) {
      validationPass(cvv);
    } else {
      validationFail(cvv);
    }
    return cvvNumberValid;
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  if (!nameValidator()) {
    e.preventDefault();
  }

  if (!emailValidator()) {
    e.preventDefault();
  }
  if (!registrationValidator()) {
    e.preventDefault();
  }
  if (!ccNumValid()) {
    e.preventDefault();
  }
  if (!zipValid()) {
    e.preventDefault();
  }
  if (!cvvValid()) {
    e.preventDefault();
  }
  console.log("Submit handler is functional!");
});

//**ACCESSIBILITY**
for (let i = 0; i < checkboxes.length; i += 1) {
  checkboxes[i].addEventListener("focus", e => {
    checkboxes[i].parentElement.classList.add("focus");
    console.log(checkboxes[i].parentElement);
  });
  checkboxes[i].addEventListener("blur", e => {
    checkboxes[i].parentElement.classList.remove("focus");
  });
}
