const elMenu = document.getElementsByClassName('main-menu');
const elSectionArticle = document.getElementById('section-article');
const elPagination = document.getElementById('pagination');
const elCategoryName = document.getElementById('category-name');


let currentPage = 1;





fetchArticles();


elPagination.addEventListener('click', (e) => {
    e.preventDefault();
    const el = e.target;
    if (el.classList.contains('zvn-page-item')) {
        currentPage = parseInt(el.innerText);
        fetchArticles(currentPage);
        window.scrollTo(0, 0);
    }
    if (el.classList.contains('btn-next')) {
        currentPage++
        fetchArticles(currentPage);
        window.scrollTo(0, 0);
    }
    if (el.classList.contains('btn-prev')) {
        currentPage--
        fetchArticles(currentPage);
        window.scrollTo(0, 0);
    }
})


function renderArticles(items) {
    let html = '';
    items.forEach(item => {
        html += /*html*/ `
        <article class="item post col-md-6 col-lg-4">
            <div class="card h-100">
                <figure class="card-img-top overlay overlay-1 hover-scale">
                    <a href="#">
                        <img src="${item.thumb}" alt="" />
                    </a>
                    <figcaption>
                        <h5 class="from-top mb-0">Read More</h5>
                    </figcaption>
                </figure>
                    <div class="card-body">
                        <div class="post-header">
                            <!-- /.post-category -->
                            <h2 class="post-title h3 mt-1 mb-3"><a class="link-dark" href="./blog-post.html">${item.title}</a></h2>
                        </div>
                        <!-- /.post-header -->
                        <div class="post-content">
                             <p>${item.description}</p>
                        </div>
                        <!-- /.post-content -->
                    </div>
                     <!--/.card-body -->
                    <div class="card-footer">
                        <ul class="post-meta d-flex mb-0">
                            <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${item.publish_date}</span></li>
                            <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${item.views}</a></li>
                            <li class="post-likes ms-auto"><a href="#"><i class="uil uil-heart-alt"></i>${item.status}</a></li>
                        </ul>
                        <!-- /.post-meta -->
                    </div>
                    <!-- /.card-footer -->
                </div>
                 <!-- /.card -->
        </article>`;
    });

    elSectionArticle.innerHTML = html;

}

function renderPagination(totalPage) {
    let html = '';
    const disabledBtnNext = currentPage === totalPage ? 'disabled' : '';
    const disabledBtnPrev = currentPage === 1 ? 'disabled' : '';
    for (let i = 1; i <= totalPage; i++) {
        const active = currentPage === i ? 'active' : '';
        html += `<li class="page-item ${active}"><a class="page-link zvn-page-item " href="#">${i}</a></li>`;
    }
    elPagination.innerHTML =
        `<li class="page-item ${disabledBtnPrev} ">
                <a class="page-link btn-prev" href="#" aria-label="Previous">
                    <span aria-hidden="true" class="btn-prev"><i class="uil uil-arrow-left btn-prev"></i></span>
                </a>
         </li>` +
        html +
        `
            <li class="page-item ${disabledBtnNext}">
                <a class="page-link btn-next" href="#" aria-label="Next">
                    <span aria-hidden="true" class="btn-next"><i class="uil uil-arrow-right btn-next"></i></span>
                </a>
            </li>
            `;
}

function fetchArticles(page = 1) {

    API.get(`categories_news/14/articles?limit=6&page=${page}`)
        .then((res) => {
            const data = res.data.data;
            const totalPage = res.data.meta.last_page;
            renderPagination(totalPage);
            renderArticles(data);
        });

}