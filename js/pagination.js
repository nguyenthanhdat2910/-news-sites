const elSectionArticle = document.getElementById('section-article');
const elPagination = document.getElementById('pagination');



let currentPage = 1;
const PAGE_RANGE = 5;
let start = 1;
let end = PAGE_RANGE;



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
        if (currentPage % PAGE_RANGE === 1) {
            start = currentPage;
            end += PAGE_RANGE;
        }
        fetchArticles(currentPage);
        window.scrollTo(0, 0);
    }
    if (el.classList.contains('btn-prev')) {
        currentPage--
        if (currentPage % PAGE_RANGE === 0) {
            end = currentPage;
            start = end - PAGE_RANGE + 1;
        }
        fetchArticles(currentPage);
        window.scrollTo(0, 0);
    }
})

function renderPagination(totalPage) {
    let html = '';
    const disabledBtnNext = currentPage === totalPage ? 'disabled' : '';
    const disabledBtnPrev = currentPage === 1 ? 'disabled' : '';

    if (end > totalPage) end = totalPage;

    for (let i = start; i <= end; i++) {
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