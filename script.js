(() => {
  const data = window.BOOK_SITE_DATA;
  const buttons = [...document.querySelectorAll("[data-genre]")];
  const title = document.getElementById("genre-title");
  const description = document.getElementById("genre-description");
  const count = document.getElementById("book-count");
  const list = document.getElementById("book-list");
  const search = document.getElementById("book-search");
  const searchResult = document.getElementById("search-result");
  let activeGenre = "general";

  const formatNumber = (value) => value == null ? "-" : new Intl.NumberFormat("ko-KR").format(value);
  const formatRating = (value) => value == null ? "-" : Number(value).toFixed(1);

  function bookCard(book) {
    const article = document.createElement("article");
    article.className = "book-card";
    article.innerHTML = `
      <div class="book-rank"><span>통합</span>${String(book.rank).padStart(2, "0")}</div>
      <div class="book-info"><h3 class="book-title"></h3><p class="book-byline"></p><p class="average-rank">두 서점 평균 순위 <strong>${book.averageRank}위</strong></p></div>
      <div class="metric-grid" aria-label="순위 및 평가 정보">
        <div class="metric"><span>YES24 순위</span><strong>${book.yesRank}위</strong></div><div class="metric"><span>알라딘 순위</span><strong>${book.aladinRank}위</strong></div>
        <div class="metric"><span>YES24 판매지수</span><strong>${formatNumber(book.yesSales)}</strong></div><div class="metric"><span>알라딘 세일즈포인트</span><strong>${formatNumber(book.aladinSales)}</strong></div>
        <div class="metric"><span>YES24 평점</span><strong>${formatRating(book.yesRating)}</strong></div><div class="metric"><span>알라딘 평점</span><strong>${formatRating(book.aladinRating)}</strong></div>
      </div>
      <div class="store-links"><a class="store-link yes" target="_blank" rel="noopener noreferrer">YES24 ↗</a><a class="store-link aladin" target="_blank" rel="noopener noreferrer">알라딘 ↗</a></div>`;
    article.querySelector(".book-title").textContent = book.title;
    article.querySelector(".book-byline").textContent = `${book.authors} · ${book.publisher} · ${book.publicationDate}`;
    const links = article.querySelectorAll(".store-link");
    links[0].href = book.yesUrl;
    links[1].href = book.aladinUrl;
    return article;
  }

  function renderBooks() {
    const genre = data.genres[activeGenre];
    const keyword = search.value.trim().toLocaleLowerCase("ko-KR");
    const books = keyword ? genre.books.filter((book) => [book.title, book.authors, book.publisher].some((value) => value.toLocaleLowerCase("ko-KR").includes(keyword))) : genre.books;
    count.textContent = books.length;
    list.replaceChildren(...books.map(bookCard));
    searchResult.textContent = keyword ? `“${search.value.trim()}” 검색 결과 ${books.length}권` : "";
    if (!books.length) list.innerHTML = '<p class="empty-message">일치하는 책이 없습니다. 다른 검색어를 입력해 보세요.</p>';
  }

  function showGenre(key, updateHash = true) {
    activeGenre = data.genres[key] ? key : "general";
    const genre = data.genres[activeGenre];
    buttons.forEach((button) => { const active = button.dataset.genre === activeGenre; button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active)); });
    title.textContent = genre.label;
    description.textContent = genre.description;
    search.value = "";
    renderBooks();
    if (updateHash) history.replaceState(null, "", `#${activeGenre}`);
  }

  buttons.forEach((button) => button.addEventListener("click", () => showGenre(button.dataset.genre)));
  search.addEventListener("input", renderBooks);
  document.getElementById("data-note").textContent = data.note;
  document.getElementById("total-count").textContent = `${Object.values(data.genres).reduce((sum, genre) => sum + genre.books.length, 0)}권`;
  document.getElementById("updated-at").textContent = `데이터 수집: ${new Date(data.generatedAt).toLocaleString("ko-KR")}`;
  showGenre(location.hash.slice(1), false);
})();
