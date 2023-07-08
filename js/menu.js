const elMenu = document.getElementsByClassName('main-menu');


API.get('categories_news')
    .then(res => {
        const data = res.data.data;
        renderMenu(data);
    });


// chuyen ve unicode search 
const searchForm = document.getElementsByClassName('search-form');
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
    for (let i = 0; i < elMenu.length; i++) {
        elMenu[i].innerHTML =
            htmlMenu + ` 
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh Mục Khác </a>
                    <ul class="dropdown-menu">
                        <li class="nav-item"><a class="dropdown-item" href="#">${htmlOtherMenu}</a></li>
                    </ul>
                </li>`;
    }
}