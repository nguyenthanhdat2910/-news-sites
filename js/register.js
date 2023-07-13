API.get('auth/me', {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(res => {
    window.location.href = 'index.html';
})

const elFrom = document.getElementById('login-from');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputPhone = document.getElementById('phone');
const inputAddress = document.getElementById('address');
const elMessage = document.getElementById('message');



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
        API.post('auth/login', {
            email: email,
            password: password
        }).then(res => {
            localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
            window.location.href = 'index.html';
        })
    }).catch((err) => {
        console.log(err);
        let message = '';
        const errors = err.response.data.errors;

        for (const key in errors) {
            message += `
           <p class ="mb-0">${errors[key][0]}</p>
           `
        }
        elMessage.innerHTML =
            `
        <div class="alert alert-danger alert-icon alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    })
});