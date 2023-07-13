// bắt sự kiện submit của login form
// dùng preventDefault để chặn form submit
// lấy giá trị email và password từ form (các ô input)
// gọi api login (auth/login)
// log ra response

const elFrom = document.getElementById('login-from');
const elMessage = document.getElementById('message');
const inputEmail = document.getElementById('loginEmail');
const inputPassword = document.getElementById('loginPassword');




elFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();


    // axios.post(url, data);

    API.post('auth/login', {
        email: email,
        password: password
    }).then(resLogin => {
        localStorage.setItem(ACCESS_TOKEN, resLogin.data.access_token);
        window.location.href = 'index.html';
    }).catch((err) => {
        elMessage.innerHTML = /* html*/
            `
            <div class="alert alert-danger alert-icon alert-dismissible fade show" role="alert">
                <i class="uil uil-times-circle"></i> Thông tin đăng nhập không đúng
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    })
});