// Получаем нужный альбом из массива
let album = getAlbum();

// Если альбом не найден
if (!album) {
    // Показать ошибку
    renderError();
} else {
    // Вывод информации об альбоме
    renderAlbumInfo();

    // Вывод треков из альбома
    renderTracks();

    // Тут будет код для запуска звуков
    setupAudio();
}

function getAlbum() {
    let search = new URLSearchParams(window.location.search);
    let numberPage = search.get(`i`);

    return albums[numberPage];
}

function renderError() {
    document.querySelector(`.error`).innerHTML = `<span class="fs-1">Такого плейлиста несуществует</span>`
}

function renderAlbumInfo() {
    document.querySelector(`#album-page`).innerHTML = `
    <div class="col-md-4">
        <img src="${album[`img`]}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${album[`title`]}</h5>
            <p class="card-text">${album[`description`]}</p>
            <p class="card-text"><small class="text-secondary">Сборник выпущен в ${album[`year`]} году</small>
            </p>
        </div>
    </div>`;
}

function renderTracks () {
    let tracksList = document.querySelector(`.list-group`);
    for (let i = 0; i < album.tracks.length; i++) {
        let track = album.tracks[i];
        tracksList.innerHTML += `
        <li class="track list-group-item d-flex align-items-center">
            <img src="assets/free-icon-play-button-149668.png" class="me-3" alt="Начать проигрование" width="30px" height="30px">
            <div>
                <div>${track['title']}</div>
                <div class="text-secondary">${track['author']}</div>
            </div>
            <div class="progress ms-auto">
                <div class="progress-bar" style="width: 0%;"></div>
            </div>
            <div class="time ms-auto">${track['time']}</div>
            <audio class="audio" src="${track.src}"></audio>
        </li>`;
    }
}

function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`);
    
    for (let i = 0; i < trackNodes.length; i++) {
        // Один элемент
        let node = trackNodes[i];
        // Длительность трека 
        let timeNode = node.querySelector(`.time`);
        let progressBar = node.querySelector(`.progress-bar`);
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`);
        let isPlaying = album.tracks[i].isPlaying;
        node.addEventListener(`click`, function () {
            // Если трек сейчас играет...
            if (isPlaying) {
                isPlaying = false;
                node.querySelector(`img`).src = `assets/free-icon-play-button-149668.png`;
                // Поставить на паузу
                audio.pause();

                // Если трек сейчас не играет...
            } else {
                isPlaying = true;
                node.querySelector(`img`).src = `assets/pause.png`;
                // Включить проигрывание
                audio.play();
                updateProgress();
            }
        });
        function updateProgress() {
            // Нарисовать актуальное время
            let time = getTime(audio.currentTime);
            if (timeNode.innerHTML != time){
                timeNode.innerHTML = time; 
                progressBar.style.width = audio.currentTime * 100 / audio.duration + `%`;
            }
            // Нужно ли вызвать её ещё раз?
            if (isPlaying) {
                  requestAnimationFrame(updateProgress);
            }
            
        }
    }
}

function getTime(time) {
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);

    if (minutes < 10) {
        minutes = `0` + minutes;
    }
    if (seconds < 10) {
        seconds = `0` + seconds;
    }
    return `${minutes}:${seconds}`;
}
