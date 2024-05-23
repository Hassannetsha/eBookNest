var button = document.getElementById('btn')

var para = document.createElement('p')
para.classList.add('invalidinput')
para.innerText = ''
document.getElementsByTagName('form')[0].insertBefore(para,document.getElementsByClassName('wrap')[0])

btn.addEventListener('click', (event) => {
    let email = document.getElementById('email').value
    let pass = document.getElementById('pass').value
    if(Object.keys(localStorage).includes(email))
    {
        if(localStorage[email] !== pass)
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
    sessionStorage.setItem("userType", JSON.stringify("admin"));
})