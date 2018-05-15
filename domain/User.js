const CryptoJS = require('crypto-js');

class User{
    constructor(firstName, lastName, email, password){

        let testFirstName = /^[a-zA-Z]/.test(firstName);
        let testLastName = /^[a-zA-Z]/.test(lastName);
        let testEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/.test(email);

        console.log(testFirstName, testLastName, testEmail);

        if(testFirstName === false || testLastName === false || testEmail === false){
            this.firstName = false;
        }else{
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = CryptoJS.AES.encrypt(password.toString(), "ssAstaEnjitS").toString();
        }
    }
}
module.exports = User;