const elFrom = document.getElementById('login-from');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputPhone = document.getElementById('phone');
const inputAddress = document.getElementById('address');


elFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();
    const phone = inputPhone.value.trim();
    const address = inputAddress.value.trim();



    // axios.post(url, data);
    API.post('users/register', {
        name,
        email,
        password,
        phone,
        address
    }).then(res => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
});