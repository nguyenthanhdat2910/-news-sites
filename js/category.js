const elCategoryName = document.getElementById('category-name');

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));


fetchArticles();


function renderArticles(items) {
    let html = '';
    items.forEach(item => {
        const publishDateFormatted = dayjs(item.publish_date).fromNow();
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
                            <h2 class="post-title h3 mt-1 mb-3"><a class="link-dark" href="detail.html?id=${item.id}">${item.title}</a></h2>
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
                            <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publishDateFormatted}</span></li>
                            <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${item.status}</a></li>
                            <li class="post-likes ms-auto"><a href="#"><i class="uil uil-heart-alt"></i>${item.id}</a></li>
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


function fetchArticles(page = 1) {

    API.get(`categories_news/${id}/articles?limit=6&page=${page}`)
        .then((res) => {
            const data = res.data.data;
            const totalPage = res.data.meta.last_page;
            renderPagination(totalPage);
            renderArticles(data);
        }).catch(err => {
            window.location.href = '404.html'
        })

}

function renderDate(date) {
    moment.locale("vi");
    return moment(date).fromNow();
}