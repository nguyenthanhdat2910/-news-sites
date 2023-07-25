API.get('auth/me', {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(res => {

}).catch(err => {
    window.location.href = 'index.html';
});


const elArticles = document.getElementById('articles')


API.get('/articles/my-articles', {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(res => {
    const articles = res.data.data;
    let html = '';
    articles.forEach(item => {

        const checked = item.status === 1 ? 'checked' : '';

        html += /*html*/ `
            <tr>
                <td>${item.id}</td>
                <td><img style="width: 150px" src="${item.thumb}" class="img-fluid" alt=""></td>
                <td>${item. title}</td>
                <td data-id=${item.id}>${renderSlbCategory(item.category_id)}
                </td>
                <td>
                    <input class="form-check-input chk-status" type="checkbox" value="${item.id}" ${checked}>
                </td>
                <td>
                    <a href="detail.html?id=${item.id}" class="btn btn-sm btn-info">View</a>
                    <button type="button" class="btn btn-sm btn-warning">Edit</button>
                    <button type="button" class="btn btn-sm btn-danger btn-delete" data-id="${item.id}">Delete</button>
                </td>
            </tr>
        `


    });

    elArticles.innerHTML = html;

});



elArticles.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('btn-delete')) {
        const id = parseInt(el.dataset.id);

        if (confirm(`Bạn có chắc muốn xóa bài viết ${id}`)) {
            API.delete(`articles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(res => {
                const tr = el.parentElement.parentElement;
                tr.remove();
                Toastify({


                    text: showNotify(`Xóa bài viết "${id}" thành công!`),

                    duration: 3000

                }).showToast();
            });
        }

    }

    if (el.classList.contains('chk-status')) {
        const id = el.value;
        const status = el.checked ? 1 : 0;

        API.patch(`articles/${id}`, { status }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(res => {
            showNotify(`Thay đổi trạng thái của bài viết "${id} thành công!`)
        })
    }



});


elArticles.addEventListener('change', (e) => {
    const el = e.target;
    if (el.classList.contains('slb-category')) {
        const categoryId = el.value;
        const id = el.parentElement.dataset.id;

        API.patch(`articles/${id}`, { category_id: categoryId }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(res => {
            showNotify(`Thay đổi danh mục của bài viết "${id} thành công!`)
        })


    }
})


function renderSlbCategory(categoryId) {


    const categories = [{
            id: 1,
            name: 'Thế Giới',
        },
        {
            id: 2,
            name: 'Thời Sự',
        },
        {
            id: 3,
            name: 'Kinh Doanh',
        },
        {
            id: 5,
            name: 'Giải Trí',
        },
        {
            id: 6,
            name: 'Thể Thao',
        },
        {
            id: 7,
            name: 'Pháp Luật',
        },
        {
            id: 8,
            name: 'Giáo Dục',
        },
        {
            id: 9,
            name: 'Sức Khỏe',
        },
        {
            id: 10,
            name: 'Đời Sống',
        },
        {
            id: 11,
            name: 'Du Lịch',
        },
        {
            id: 12,
            name: 'Khoa Học',
        },
        {
            id: 13,
            name: 'Số Hóa',
        },
        {
            id: 14,
            name: 'Xe',
        },
    ]

    let htmlCategories = '';
    categories.forEach(item => {

        const selected = item.id === categoryId ? 'selected' : '';
        htmlCategories += `
            <option value="${item.id}" ${selected}>${item.name}</option>

        `
    });

    return `
        <select class="form-select slb-category"> ${htmlCategories} </select>
    `
}



function showNotify(message) {
    Toastify({
        text: message,
        duration: 3000
    }).showToast();
}