let cards = document.querySelector(`#cards`);
for (let i = 0; i < albums.length; i++) {
    cards.innerHTML +=`
    <div class="card" style="width: 18rem">
        <a href="album.html?i=${i}" class="text-decoration-none">
            <img src="${albums[i][`img`]}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${albums[i][`title`]}</p>
            </div>
        </a>
    </div>`
}