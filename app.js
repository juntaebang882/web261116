// app.js : 영화 배열을 다루는 함수 / 방준태(26) / 11주차

// posterUrl(path, size) : 포스터 경로, 크기 ⇒ TMDB 이미지 주소(문자열)
const posterUrl = (path, size) => {
    return "https://image.tmdb.org/t/p/" + size + path;
}

// renderCards: 영화 배열 ⇒ 보드에 카드 생성(반환값 없음)
function renderCards(list) {
    const board = document.querySelector(".board");
    board.innerHTML = ""; // 기존 카드를 초기화[cite: 8]
    
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        
        // 평점 8 이상 강조 (hot 클래스 추가)
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
    
    // 개수 표시[cite: 6]
    document.getElementById("count").textContent = list.length + "편";
}

// sortBy: 영화 배열, 키 이름, 내림차순 여부 ⇒ 정렬한 새 배열(원본은 그대로)[cite: 5]
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

// applySort: 선택 상자 값으로 정렬해서 다시 그리기(반환값 없음)[cite: 5]
function applySort() {
    const key = document.getElementById("sort").value;
    // 제목순(title)은 오름차순(desc가 false), 평점/연도는 내림차순(desc가 true)
    renderCards(sortBy(movies, key, key !== "title"));
}

// 처음 실행 시 정렬 상태를 반영하여 카드 그리기[cite: 7]
applySort();