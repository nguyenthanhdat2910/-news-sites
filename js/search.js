const elCategoryName = document.getElementById('category-name');


const params = new URLSearchParams(window.location.search);
const keyword = params.get('keyword');


if (!keyword) window.location.href = '404.html'

fetchArticles();



function renderArticles(items) {
    let html = '';

    items.forEach(item => {
        const publishDateFormatted = dayjs(item.publish_date).fromNow();
        let description = item.description;
        let title = item.title;
        if (keyword) {
            let patt = new RegExp(keyword, 'igm');
            description = description.replace(patt, (match) => {
                return `<mark>${match}</mark>`
            })
            title = title.replace(patt, (match) => {
                return `<mark>${match}</mark>`
            })

        }
        html += /*html*/ `
        <article class="item post col-md-6 col-lg-4">
            <div class="card h-100">
                <figure class="card-img-top overlay overlay-1 hover-scale">
                    <a href="detail.html?id=${item.id}">
                        <img src="${item.thumb}" alt="" />
                    </a>
                    <figcaption>
                        <h5 class="from-top mb-0">Read More</h5>
                    </figcaption>
                </figure>
                    <div class="card-body">
                        <div class="post-header">
                            <!-- /.post-category -->
                            <h2 class="post-title h3 mt-1 mb-3"><a class="link-dark" href="detail.html?id=${item.id}">${title}</a></h2>
                        </div>
                        <!-- /.post-header -->
                        <div class="post-content">
                             <p>${description}</p>  
                        </div>
                        <!-- /.post-content -->
                    </div>
                     <!--/.card-body -->
                    <div class="card-footer">
                        <ul class="post-meta d-flex mb-0">
                            <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publishDateFormatted}</span></li>
                            <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${5}</a></li>
                            <li class="post-likes ms-auto"><a href="#"><i class="uil uil-heart-alt"></i>${item.status}</a></li>
                        </ul>
                        <!-- /.post-meta -->
                    </div>
                    <!-- /.card-footer -->
                </div>
                 <!-- /.card -->
        </article>`;
    });
    let searchValue = '';
    if (searchValue !== '') {
        //eat
        // <mark>e</marl>ating
        const regex = new RegExp(searchValue, 'gim');
        todoName = todoName.replace(regex, (match) => {
            return `<mark>${match}</mark>`
        })
    }

    elSectionArticle.innerHTML = html;

}


function fetchArticles(page = 1) {

    API.get(`articles/search?q=${keyword}&limit=6&page=${page}`)
        .then((res) => {
            const data = res.data.data;
            // if (data.length <= 0) window.location.href = '404.html'
            const totalPage = res.data.meta.last_page;
            renderPagination(totalPage);
            renderArticles(data);
        }).catch(err => {
            window.location.href = '404.html'
        })

}



function highlight(str, keyword) {
    if (keyword) {
        const regex = new RegExp(keyword, "gim");
        return str.replace(regex, (match) => "<mark>" + match + "</mark>");
    }
    return str;
}