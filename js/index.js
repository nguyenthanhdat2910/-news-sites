const elArticlesLatest = document.getElementById('articles-latest');
const elArticlesPopular = document.getElementById('articles-popular');
const elImageList = document.getElementById('image-list');
const btnLoadMore = document.getElementById('btn-load-more');


let currentPage = 1;


fetchArticlesLatest();

API.get('articles/popular?limit=7')
    .then((res) => {
        const data = res.data.data;
        let htmlTop = '';
        let htmlBot = '';
        data.forEach((item, index) => {
            const publishDateFormatted = dayjs(item.publish_date).fromNow();
            if (index < 2) {
                htmlTop += /*html*/ `
                <div class="col-lg-6 mb-4">
                <figure class="overlay caption caption-overlay rounded mb-0 h-100">
                    <a href="#" class="h-100"> <img src="${item.thumb}" class="h-100" alt="" /></a>
                    <figcaption style="background: rgba(0, 0, 0, 0.5)">
                        <span class="badge badge-lg bg-white text-uppercase mb-3">${item.category.name}</span>
                        <h2 class="post-title h3 mt-1 mb-3"><a href="./blog-post.html">${item.title}</a></h2>
                        <ul class="post-meta text-white mb-0">
                            <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${item.author}</span></li>
                            <li class="post-author"><a href="#"><i class="uil uil-user"></i><span>${publishDateFormatted}</span></a></li>
                            <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>3<span>${item.views}</span></a></li>
                        </ul>
                    </figcaption>
                </figure>
                </div>`;
                elArticlesPopular.innerHTML = htmlTop;
            } else {
                htmlBot += /*html*/ `
                <li>
                <figure class="rounded h-100">
                    <a href="./blog-post.html" class="h-100">
                        <img src="${item.thumb}" class="h-100" alt="" />
                    </a>
                </figure>
                <div class="post-content">
                    <h6 class="mb-2 "> <a class="link-dark line-clamp line-clamp-1" title="${item.title}" href="./blog-post.html">${item.title}</a></h6>
                    <ul class="post-meta">
                        <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publishDateFormatted}</span></li>
                        <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${item.views}</a></li>
                    </ul>
                    <!-- /.post-meta -->
                </div>
            </li>`;
                elImageList.innerHTML = htmlBot;

            }
        });

    });


btnLoadMore.addEventListener('click', () => {
    btnLoadMore.innerText = 'Đang tải thêm...';
    btnLoadMore.disabled = true;
    currentPage++;
    fetchArticlesLatest(currentPage);
});


function renderArticlesLatest(items) {
    let html = '';

    items.forEach(item => {
        const publishDateFormatted = dayjs(item.publish_date).fromNow();
        html += /*html*/ `
        <article class="item post col-md-6">
        <div class="card shadow-lg h-100">
            <figure class="card-img-top overlay overlay-1">
                <a href="#"> <img src="${item.thumb}" alt="" /></a>
                <figcaption>
                    <h5 class="from-top mb-0">Read More</h5>
                </figcaption>
            </figure>
            <div class="card-body ">
                <div class="post-header">
                    <div class="post-category">
                        <a href="#" class="hover link-yellow" rel="category">${item.category.name}</a>
                    </div>
                    <!-- /.post-category -->
                    <h2 class="post-title h3 mt-1 mb-3"><a class="link-navy" href="./blog-post.html"></a>${item.title}</h2>
                </div>
                <!-- /.post-header -->
                <div class="post-content">
                    <p class="line-clamp line-clamp-4">${item.description}</p>
                </div>
                <!-- /.post-content -->
            </div>
            <!--/.card-body -->
            <div class="card-footer">
                <ul class="post-meta d-flex mb-0">
                    <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publishDateFormatted}</span></li>
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

    elArticlesLatest.innerHTML += html;
    btnLoadMore.innerText = 'Xem Thêm';
    btnLoadMore.disabled = false;
}


function fetchArticlesLatest(page = 1) {

    API.get(`articles?limit=4&page=${page}`)
        .then((res) => {
            const data = res.data.data;
            renderArticlesLatest(data);
        });

}