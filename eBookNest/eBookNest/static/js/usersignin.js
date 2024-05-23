// document.getElementsByTagName("form")[0].innerHTML = ``

var pass = document.getElementById('pass')
var email = document.getElementById('email')
var btn = document.getElementById('signinuserbtn')
var para = document.getElementsByClassName('invalidinput')[0]

btn.addEventListener('click', (event) => {
    if(Object.keys(sessionStorage).includes(email.value))
    {
        if(sessionStorage[email.value] !== pass.value)
        {
            para.innerText = '*Invalid Email or Password!'
            event.preventDefault()
        }
        else
        {
            para.innerText = ''
        }
    }
    else
    {
        para.innerText = '*Invalid Email or Password!'
        event.preventDefault()
    }
    sessionStorage.setItem("userType", JSON.stringify("user"));
})