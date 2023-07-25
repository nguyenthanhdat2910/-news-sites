API.get('auth/me', {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(res => {

}).catch(err => {
    window.location.href = 'index.html';
});



ClassicEditor
    .create(document.querySelector('#content'))
    .catch(error => {
        console.error(error);
    });



const elForm = document.getElementById('login-from');
const elMessage = document.getElementById('message');
const inputThumb = document.getElementById('thumb');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCategory = document.getElementById('category_id');
const inputContent = document.getElementById('content');
const elImg = document.getElementById('thumb-preview');
const btnRandomThumb = document.getElementById('random-thumb');


btnRandomThumb.addEventListener('click', (e) => {
    axios.get('https://api.unsplash.com/photos/random/?orientation=landscape&client_id=3IEQ63v5yC_VEY1GPM5SJcmA-zkwcrS-3JZFOuQ-kw0')
        .then((res) => {
            console.log(res);
            const urlImg = res.data.urls.regular;
            elImg.src = urlImg;
            inputThumb.value = urlImg;
        })
})


inputThumb.addEventListener('change', (e) => {
    const url = inputThumb.value.trim();
    elImg.src = url;
})

elForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const thumb = inputThumb.value.trim();
    const title = inputTitle.value.trim();
    const description = inputDescription.value.trim();
    const category_id = inputCategory.value.trim();
    const content = inputContent.value.trim();

    const data = {
        thumb,
        title,
        description,
        category_id,
        content
    }
    API.post('/articles/create', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        elMessage.innerHTML = /* html*/
            `
            <div class="alert alert-success alert-icon alert-dismissible fade show" role="alert">
            <i class="fa-solid fa-check mt-1"></i> Thêm bài viết thành công!
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