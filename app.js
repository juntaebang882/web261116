// app.js : 영화 배열을 다루는 함수 / 방준태(26) / 11주차


const posterUrl = (path, size) => {
    return "https://image.tmdb.org/t/p/" + size + path;
}


function renderCards(list) {
    const board = document.querySelector(".board");
    board.innerHTML = ""; 
    
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        
        
        if (m.rating >= 8) { 
            card.classList.add("hot"); 
        }
        
        card.innerHTML = `
            <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
            <span class="badge">${m.rating}</span>
            <div class="info">
                <h2>${m.title}</h2>
                <p class="year">${m.year}</p>
            </div>`;
        board.appendChild(card);
    }
    
    
    document.getElementById("count").textContent = list.length + "편";
}


function sortBy(list, key, desc) {
    const copy = [...list];
    copy.sort((a, b) => {
        if (typeof a[key] === "string") {
            return a[key].localeCompare(b[key]);
        }
        return a[key] - b[key];
    });
    if (desc) {
        copy.reverse();
    }
    return copy;
}


function applySort() {
    const key = document.getElementById("sort").value;
    
    renderCards(sortBy(movies, key, key !== "title"));
}


applySort();


function applySort() {
    const selectVal = document.getElementById("sort").value;
    
    let key = selectVal;
    let desc = (key !== "title"); 
    
    
    if (selectVal === "titleDesc") {
        key = "title";
        desc = true; 
    }
    
    renderCards(sortBy(movies, key, desc));
}