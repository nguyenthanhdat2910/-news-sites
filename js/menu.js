const elMenu = document.getElementsByClassName('main-menu')


API.get('categories_news')
    .then(res => {
        const data = res.data.data;
        renderMenu(data);
    });


// chuyen ve unicode search 
const searchForm = document.getElementsByClassName('search-form');


document.addEventListener('click', (e) => {
    const el = e.target;

    if (el.classList.contains('btn-logout')) {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = 'index.html'
    }
})



for (let i = 0; i < searchForm.length; i++) {
    searchForm[i].addEventListener('submit', (e) => {
        e.preventDefault();
        const inputKeyword = searchForm[i].querySelector('[name="keyword"]');
        const value = encodeURIComponent(inputKeyword.value);
        window.location.href = `search.html?keyword=${value}`;
    })
}


function renderMenu(items) {
    let htmlMenu = '';
    let htmlOtherMenu = '';
    items.forEach((item, index) => {
        if (index < 3) {
            htmlMenu += `
                    <li class="nav-item">
                        <a class="nav-link" href="category.html?id=${item.id}">${item.name}</a>
                    </li>`;
        } else {
            htmlOtherMenu += `
                        <li class="nav-item"><a class="dropdown-item" href="category.html?id=${item.id}">${item.name}</a></li>
                    `;
        }
    });

    loginName = '';
    API.get('auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        loginName = res.data.data.name
    }).catch(err => {
        console.log(err);
    }).finally(() => {

        let htmlAccountMenu = `
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Tài khoản</a>
            <ul class="dropdown-menu">
                <li class="nav-item"><a class="dropdown-item" href="login.html">Đăng nhập</a></li>
                <li class="nav-item"><a class="dropdown-item" href="register.html">Đăng ký</a></li>
            </ul>
        </li>
        `;
        if (loginName) {
            htmlAccountMenu = `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">${loginName}</a>
                    <ul class="dropdown-menu">
                        <li class="nav-item"><a class="dropdown-item" href="profile.html">Thông tin tài khoản</a></li>
                        <li class="nav-item"><a class="dropdown-item btn-logout" href="#">Đăng xuất</a></li>
                    </ul>
                </li>
        `;
        };

        for (let i = 0; i < elMenu.length; i++) {
            elMenu[i].innerHTML = /*html*/
                htmlMenu + ` 
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh Mục Khác </a>
                    <ul class="dropdown-menu">
                        <li class="nav-item"><a class="dropdown-item" href="#">${htmlOtherMenu}</a></li>
                    </ul>
                </li>
                ${htmlAccountMenu}
                `;
        };
    })
}