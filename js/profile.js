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