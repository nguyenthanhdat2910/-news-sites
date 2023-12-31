const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));


const elCategory = document.getElementById('category');
const elTitle = document.getElementById('title');
const elPublish_date = document.getElementById('publish_date');
const elComments = document.getElementById('comments');
const elLikes = document.getElementById('likes');
const elAdmin = document.getElementById('admin');
const elImg = document.getElementById('thumb');
const elContent = document.getElementById('content');


API.get(`articles/${id}`)
    .then((res) => {
        console.log(res);
        const item = res.data.data

        elCategory.innerHTML = item.category.name
        elCategory.href = `detail.html?id=${item.category_id}`

        elTitle.innerHTML = item.title
        elPublish_date.innerHTML = item.publish_date
        elAdmin.innerHTML = item.author
        elImg.src = item.thumb
        elContent.innerHTML = item.content
        document.getElementById('page-loader').remove();


        const ARTICLES_VIEW = JSON.parse(localStorage.getItem('ARTICLES_VIEW')) || [];
        const foundIdx = ARTICLES_VIEW.findIndex(itemArticle => itemArticle.id === id);
        if (foundIdx === -1) {

            if (ARTICLES_VIEW.length >= 4) ARTICLES_VIEW.shift();

            ARTICLES_VIEW.push({ id: id, title: item.title });
            localStorage.setItem('ARTICLES_VIEW', JSON.stringify(ARTICLES_VIEW));
        }



    }).catch(err => {
        window.location.href = '404.html'
    })