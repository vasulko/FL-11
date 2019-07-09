let email;
let password;
let correctEmail;
let correctPassword;



let user = {
  email: 'user@gmail.com',
  password: 'UserPass'
};

let admin = {
  email: 'admin@gmail.com',
  password: 'AdminPass'
};

const itemLength = {
    emailLength : 6,
    passwordLength: 5
}

email = prompt('Write e-mail:', '');

if (email === '' || email === null) {
  alert('Canceled.');
} else {
  if (email.length < itemLength.emailLength) {
    alert('I don\'t know any emails having name length less than 6 symbols.');
  } else {
    if(email === 'user@gmail.com' || email === 'admin@gmail.com') {
      correctEmail = true;
    } else {
      alert('I don’t know you.');
    }
  }
}

if(correctEmail){
  password = prompt('Write your password','');
  if(password === '' || password === null){
    alert('Canceled.');
  } else {
    if(user.password === password || admin.password === password){
        correctPassword = true;
    } else {
      alert('Wrong password.');
    }
  }
}


if(correctPassword){
 const changePassword = confirm('Do you want to change your password?');
  if(changePassword){
     const oldPassword = prompt('Write old password','');
      if(password === oldPassword){
        const newPassword = prompt('Write new password:','');
          if(newPassword.length < itemLength.passwordLength){
            alert('It’s too short password. Sorry.');
          } else {
            const newPasswordConfirm = prompt('Write new password again','');
            if(newPassword === newPasswordConfirm){
              alert('You have successfully changed your password.');
            } else {
              alert('You wrote the wrong password.');
            }
          }
      }
  } else {
    alert('You have failed the change.');
  }
}
