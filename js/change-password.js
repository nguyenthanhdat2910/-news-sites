API.get('auth/me', {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(res => {

}).catch(err => {
    window.location.href = 'index.html';
});




const elForm = document.getElementById('login-from');
const elMessage = document.getElementById('message');
const inputPasswordCurrent = document.getElementById('password-current');
const inputPassword = document.getElementById('password');
const inputPasswordConfirmation = document.getElementById('password-confirmation');






elForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        password_current: inputPasswordCurrent.value.trim(),
        password: inputPassword.value.trim(),
        password_confirmation: inputPasswordConfirmation.value.trim()
    };
    API.put('auth/change-password', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        elMessage.innerHTML = /* html*/
            `
            <div class="alert alert-success alert-icon alert-dismissible fade show" role="alert">
            <i class="fa-solid fa-check mt-1"></i> Cập nhật thành công
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        inputPasswordCurrent.value = '';
        inputPassword.value = '';
        inputPasswordConfirmation.value = '';
    }).catch((err) => {
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