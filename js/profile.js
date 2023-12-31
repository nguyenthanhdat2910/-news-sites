API.get('auth/me', {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(res => {

}).catch(err => {
    window.location.href = 'index.html';
});

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputPhone = document.getElementById('phone');
const inputAddress = document.getElementById('address');
const elForm = document.getElementById('login-from');
const elMessage = document.getElementById('message');


API.get('auth/me', {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(res => {
    const useInfo = res.data.data
    inputName.value = useInfo.name;
    inputEmail.value = useInfo.email;
    inputPhone.value = useInfo.phone;
    inputAddress.value = useInfo.address;

})

elForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        name: inputName.value.trim(),
        phone: inputPhone.value.trim(),
        address: inputAddress.value.trim()
    };
    API.put('auth/update', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        elMessage.innerHTML = /* html*/
            `
            <div class="alert alert-success alert-icon alert-dismissible fade show" role="alert">
            <i class="fa-solid fa-check mt-1"></i></i> Cập nhật thành công
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
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