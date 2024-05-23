const password_regex = /(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[^A-Za-z0-9]+)(?=.*[0-9]+)(?=.{8,})/
const emailRegex= /(?=\w+[@]+)(?=.+\.(com$|edu$|info$))/
const image = "../static/image/logopng-removebg.png"


var divcontainer = document.createElement('div')
divcontainer.className = 'container'
document.body.appendChild(divcontainer)

var divform = document.createElement('div')
divform.className = 'form'
divcontainer.appendChild(divform)

var imgElem = document.createElement('img')
imgElem.src = image
imgElem.alt = "Website's logo"
divform.appendChild(imgElem)

divform.appendChild(document.createElement('h1'))
divform.appendChild(document.createElement('h2'))
divform.children[1].innerText = "eBook nest"
divform.children[2].innerText = "Admin Sign Up"

var divSignup = document.createElement('div')
divSignup.className = 'signup'

divform.appendChild(divSignup)

divSignup.appendChild(document.createElement('h3'))
divSignup.children[0].innerText = 'Please Enter your personal information'

divSignup.appendChild(document.createElement('form'))
// divSignup.children[1].setAttribute('target','_blank')

divSignup.children[1].appendChild(document.createElement('div'))
divSignup.children[1].children[0].className = 'input'
divSignup.children[1].children[0].innerHTML = " <label for='fname'>\nFirst name:\n</label>\n<input id='fname' type='text' placeholder='First name' name='FirstName' required> \n<br> <br> ";

divSignup.children[1].appendChild(document.createElement('div'))
divSignup.children[1].children[1].className = 'input'
divSignup.children[1].children[1].innerHTML = "<label for='Lname'>\nFamily name:\n</label>\n<input id='Lname' type='text' placeholder='Family name' name='LastName' required>\n<br> <br>";

divSignup.children[1].appendChild(document.createElement('div'))
divSignup.children[1].children[2].className = 'input'
divSignup.children[1].children[2].innerHTML = "<label for='e-mail'>\nE-mail:\n</label>\n<input id='e-mail' type='text' placeholder='e-mail address' name='email' required>\n<br> <br>";

divSignup.children[1].appendChild(document.createElement('p'))
divSignup.children[1].children[3].className = 'invalidinput'


divSignup.children[1].appendChild(document.createElement('div'))
divSignup.children[1].children[4].className = 'input'
divSignup.children[1].children[4].innerHTML = "<label for='pass'>Password:\n</label>\n<input id='pass' type='password' placeholder='Password' name='password'title='Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'required>\n<br><br>"

divSignup.children[1].appendChild(document.createElement('p'))
divSignup.children[1].children[5].className = 'invalidinput'

divSignup.children[1].appendChild(document.createElement('div'))
divSignup.children[1].children[6].className = 'input'
divSignup.children[1].children[6].innerHTML = "<label for='passwordConfirmation'>\nConfirm password:\n</label>\n<input id='passwordConfirmation' type='password' placeholder='Confirm your Password' name='confirmPass'required>\n<br> <br>"

divSignup.children[1].appendChild(document.createElement('p'))
divSignup.children[1].children[7].className = 'invalidinput'

divSignup.children[1].appendChild(document.createElement('div'))
divSignup.children[1].children[8].className = 'input'
divSignup.children[1].children[8].innerHTML = "<label for='address'>\nAddress:\n</label>\n<input id='address' type='text' placeholder='Address' name='Address' required>\n<br> <br>"

divSignup.children[1].appendChild(document.createElement('div'))
divSignup.children[1].children[9].className = 'input'
divSignup.children[1].children[9].innerHTML = "<label for='phoneNum'>\nPhone number:\n</label>\n<input id='phoneNum' type='tel' placeholder='01123456789' name='PhoneNumber' required>\n<br> <br>"

divSignup.children[1].appendChild(document.createElement('p'))
divSignup.children[1].children[10].className = 'invalidinput'

divSignup.children[1].appendChild(document.createElement('div'))
divSignup.children[1].children[11].className = 'input'
divSignup.children[1].children[11].innerHTML = `<label for='LibraryID'>\nLibrary ID:\n</label>\n<input id='LibraryID' type='text' placeholder='Library ID' name='LibId' required>\n<br> <br>`

divSignup.children[1].appendChild(document.createElement('div'))
divSignup.children[1].children[12].className = 'wrap'
divSignup.children[1].children[12].innerHTML = "<button type='submit'>\nSign up\n</button>"

var signup = document.getElementsByClassName("signup")[0]
var pass = signup.children[1].children[4].children[1]
var confirmpass = signup.children[1].children[6].children[1]
var email = signup.children[1].children[2].children[1]
var btn = document.getElementsByClassName("wrap")[0].firstChild
var number = document.getElementById("phoneNum")

function form (PASS,CPASS,EMAIL,NUMBER){
    this.checkPass = () => {
        let para = document.getElementsByClassName("invalidinput")[1]
        if (!(password_regex.test(PASS))) {
            para.innerText = ((PASS =='' || PASS == null) ? "*Please enter a password" : "*Password doesn't match the pattern")
            return false
        }
        else {
            para.innerText = ''
            return true
        }
    };
    this.checkConfirmPass = () => {
        let para = document.getElementsByClassName("invalidinput")[2]
        if (CPASS !== PASS) {
            para.innerText = "*Password doesn't match"
            return false
        }
        else {
            para.innerText = ''
            return true
        }
    };
    this.checkEmail = () => {
        let para = document.getElementsByClassName("invalidinput")[0]
        if (!(emailRegex.test(EMAIL))) {
            para.innerText = "*Invalid Email"
            return false
        }
        else if(Object.keys(localStorage).includes(email.value))
        {
            para.innerText = "*Email Already In Use"
            return false
        }
        else {
            para.innerText = ''
            return true
        }
    };
    this.checkNum = () => {
      let para = document.getElementsByClassName("invalidinput")[3]
      if(!((/[0-9]{11}/)).test(number.value))
      {
        para.innerText = "*Invalid Phone Number"
        return false
      }
      else
      {
        para.innerText = ""
        return true
      }
    };
    this.eval = [this.checkPass(),this.checkConfirmPass(),this.checkEmail(),this.checkNum()].includes(false);
}
btn.addEventListener("click", function (event) {
    const formValidity = new form(pass.value,confirmpass.value,email.value,number.value)
    if (formValidity.eval) {
        event.preventDefault()
    }
    else
    {
        localStorage.setItem(email.value,pass.value)
    }
});