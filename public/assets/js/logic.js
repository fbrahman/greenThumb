//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times
let $user = $("#Username");
let $email = $("#Email");
let $password = $("#password");
let $confirmPassword = $("#confirm_password");


//Hide hints
$("form span").hide();

//generic function to test length
function validLength (minLen, maxLen, field, name){
  let result = {
    bool:field.val().length >= minLen && field.val().length <= maxLen
  };

  if (!result.bool){
    result.msg = `The ${name} must be between ${minLen}-${maxLen} characters long..`
  }
  return result;
};

function regexCheck (field, name){

    if (name === 'password'){
      let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9])/;
      let msg = 'Password must include one lowercase character, one uppercase character, a number, and a special character.';
      let result = {
        bool: regex.test(field.val())
      };
      
      if (!result.bool){
        result.msg = msg;
      };
      return result;

    } else if (name === 'username'){
      let regex = /^[A-Za-z0-9_-]+$/;
      let msg = 'Username can only contain letters, numbers, or underscores.';
      let result = {
        bool: regex.test(field.val())
      };

      if(!result.bool){
        result.msg = msg;
      };
      return result;

    } else if (name === 'email'){
     let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     let msg = "Please enter in a valid email address."
     let result = {
       bool:regex.test(field.val())
     };

     if (!result.bool){
       result.msg = msg
     };
     return result;
    }
};

//username check
function isUserValid(){
  return validLength(4,15,$user, 'username').bool &&regexCheck($user, 'username').bool;
}
//username event
function userEvent (){
  let userLenResult = validLength(4,15,$user, 'username');
  let userRegResult = regexCheck($user, 'username');

  if (userLenResult.bool && userRegResult.bool){
    $("#userMsg").hide()
  }else{
    let eleLen = `<span>${userLenResult.msg}</span>`;
    let eleReg = `<span>${userRegResult.msg}</span>`;
    let ele = userLenResult.msg?userRegResult.msg?eleLen+eleReg:eleLen:eleReg;

    $('#userMsg').html(ele).show();
  }
}

//email check
function isEmailValid(){
  return validLength(4,100, $email, 'email').bool && regexCheck($email, 'email').bool;
}
//email event
function emailEvent (){
  let emailLenResult = validLength(4,100,$email, 'email');
  let emailRegResult = regexCheck($email, 'email');

  if (emailLenResult.bool && emailRegResult.bool){
    $("#emailMsg").hide()
  }else{
    let eleLen = `<span>${emailLenResult.msg}</span>`;
    let eleReg = `<span>${emailRegResult.msg}</span>`;
    let ele = emailLenResult.msg?emailRegResult.msg?eleLen+eleReg:eleLen:eleReg;

    $('#emailMsg').html(ele).show();
  }
}
//check to see if password is valid
function isPasswordValid() {
  return validLength(8, 100, $password, 'password').bool && regexCheck($password, 'password').bool;
}

//check for confirm password dialog to check if passwords are identical
function arePasswordsMatching() {
  return $password.val() === $confirmPassword.val();
}

//hide show hints based on if password passes the validation tests
function passwordEvent(){
    //Find out if password is valid  
    if(isPasswordValid()) {
      //Hide hint if valid
      $password.next().hide();
    } else {
      //else show hint
      let msgLen = validLength(8,100, $password, 'password').msg;
      let msgReg = regexCheck($password, 'password').msg;
      let eleLen = `<span>${msgLen}</span>`;
      let eleReg = `<span>${msgReg}</span>`;
      let ele = msgLen?msgReg?eleLen+eleReg:eleLen:eleReg

      $('#passwordMsg').html(ele).show();
    }
}

//hide show based on if confirm password passes the validation tests 
function confirmPasswordEvent() {
  //Find out if password and confirmation match
  if(arePasswordsMatching()) {
    //Hide hint if match
    $confirmPassword.next().hide();
  } else {
    //else show hint 
    $confirmPassword.next().show();
  }
}

//check to see if both conditions are met 
function canSubmit() {
  return isPasswordValid() && arePasswordsMatching() && isUserValid() && isEmailValid();
}

//enables submit button once all validation passes.
function enableSubmitEvent() {
  $("#submit").prop("disabled", !canSubmit());
}


//username event
$user.focus(userEvent).keyup(userEvent).keyup(enableSubmitEvent);

//email event
$email.focus(emailEvent).keyup(emailEvent).keyup(enableSubmitEvent);

//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

//When event happens on confirmation input
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

enableSubmitEvent();