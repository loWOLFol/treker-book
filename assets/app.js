document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     1. ГЛОБАЛЬНАЯ ПРОВЕРКА АВТОРИЗАЦИИ
     ========================================== */
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const path = window.location.pathname;
  const pageName = path.split("/").pop();

  const profileLink = document.querySelector(".profile-link");
  const avatarImg = document.querySelector(".profile-link .avatar");

  if (currentUser) {
    if (profileLink) profileLink.setAttribute("href", "profile.html");
    if (avatarImg) {
      avatarImg.src = `https://ui-avatars.com/api/?name=${currentUser.name}&background=5d737e&color=fff&rounded=true&bold=true`;
    }
  } else {
    if (profileLink) profileLink.setAttribute("href", "login.html");
    // Защита профиля
    if (pageName === "profile.html" || pageName === "settings.html") {
      window.location.href = "login.html";
    }
  }

  /* ==========================================
     2. ЛОГИКА СТРАНИЦЫ РЕГИСТРАЦИИ
     ========================================== */
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPass").value;
      const confirmPass = document.getElementById("regPassConfirm").value;

      if (password !== confirmPass) {
        alert("Пароли не совпадают!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.find((u) => u.email === email)) {
        alert("Пользователь с таким Email уже существует!");
        return;
      }

      const newUser = {
        name,
        email,
        password,
        joinDate: new Date().toLocaleDateString(),
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Регистрация успешна! Теперь войдите.");
      window.location.href = "login.html";
    });
  }

  /* ==========================================
     3. ЛОГИКА СТРАНИЦЫ ВХОДА
     ========================================== */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPass").value;
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "profile.html";
      } else {
        alert("Неверный email или пароль");
      }
    });
  }

  /* ==========================================
     4. ЛОГИКА СТРАНИЦЫ ПРОФИЛЯ
     ========================================== */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    if (currentUser) {
      const pName = document.getElementById("profileName");
      const pEmail = document.getElementById("profileEmail");
      const pDate = document.getElementById("profileDate");
      const pAvatar = document.getElementById("profileAvatarMain");

      if (pName) pName.innerText = currentUser.name;
      if (pEmail) pEmail.innerText = currentUser.email;
      if (pDate) pDate.innerText = currentUser.joinDate;
      if (pAvatar)
        pAvatar.src = `https://ui-avatars.com/api/?name=${currentUser.name}&background=5d737e&color=fff&rounded=true&size=128&bold=true`;
    }
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }

  /* ==========================================
     5. БАЗА ДАННЫХ КНИГ
     ========================================== */
  const booksData = {
    1: {
      title: "1984",
      author: "Джордж Оруэлл",
      cover: "https://placehold.co/300x400/4e73df/ffffff?text=1984",
      pages: "328 стр.",
      rating: "★★★★★",
      annotation:
        "<p>Знаменитый роман-антиутопия, описывающий тоталитарное общество. История Уинстона Смита, который пытается противостоять системе Большого Брата.</p>",
      characters: [
        "<strong>Уинстон Смит</strong> - главный герой",
        "<strong>Джулия</strong> - возлюбленная Уинстона",
        "<strong>О'Брайен</strong> - член партии",
      ],
      quotes: [
        "«Война — это мир, свобода — это рабство.»",
        "«Кто управляет прошлым, тот управляет будущим.»",
      ],
      plot: "<p>Уинстон живет в Лондоне, работая над фальсификацией истории. Он тайно ненавидит Партию...</p>",
    },
    2: {
      title: "Мастер и Маргарита",
      author: "Михаил Булгаков",
      cover: "https://placehold.co/300x400/2ecc71/ffffff?text=M&M",
      pages: "480 стр.",
      rating: "★★★★★",
      annotation:
        "<p>Сатира на советскую Москву, история любви и библейский сюжет.</p>",
      characters: [
        "<strong>Мастер</strong> - историк",
        "<strong>Маргарита</strong> - его муза",
        "<strong>Воланд</strong> - дьявол",
      ],
      quotes: ["«Рукописи не горят.»", "«Никогда и ничего не просите!»"],
      plot: "<p>В Москве появляется Воланд со своей свитой...</p>",
    },
    3: {
      title: "Дюна",
      author: "Фрэнк Герберт",
      cover: "https://placehold.co/300x400/e74c3c/ffffff?text=Dune",
      pages: "704 стр.",
      rating: "★★★★☆",
      annotation: "<p>Научно-фантастический эпос о планете Арракис.</p>",
      characters: [
        "<strong>Пол Атрейдес</strong>",
        "<strong>Леди Джессика</strong>",
      ],
      quotes: ["«Страх убивает разум.»"],
      plot: "<p>Борьба за власть над планетой, добывающей пряность...</p>",
    },
    4: {
      title: "Улисс",
      author: "Джеймс Джойс",
      cover: "https://placehold.co/300x400/95a5a6/ffffff?text=Ulysses",
      pages: "900+ стр.",
      rating: "★★★☆☆",
      annotation: "<p>Один день из жизни дублинского обывателя.</p>",
      characters: ["<strong>Леопольд Блум</strong>"],
      quotes: ["«История — это кошмар.»"],
      plot: "<p>Поток сознания героев, блуждающих по Дублину.</p>",
    },
    5: {
      title: "Гарри Поттер",
      author: "Дж. К. Роулинг",
      cover: "https://placehold.co/300x400/f1c40f/ffffff?text=HP",
      pages: "390 стр.",
      rating: "★★★★★",
      annotation: "<p>История о мальчике-волшебнике.</p>",
      characters: [
        "<strong>Гарри</strong>",
        "<strong>Рон</strong>",
        "<strong>Гермиона</strong>",
      ],
      quotes: ["«Не жалей умерших, Гарри.»"],
      plot: "<p>Гарри поступает в Хогвартс и сражается со злом.</p>",
    },
  };

  /* ==========================================
     6. ЛОГИКА КНИГ И МОДАЛЬНЫХ ОКОН
     ========================================== */
  const bookModal = document.getElementById("bookModal");
  const closeBookModal = document.getElementById("closeModal");
  const bookCards = document.querySelectorAll(".open-modal-btn");

  if (bookModal) {
    const modalTitle = document.querySelector(".book-title");
    const modalAuthor = document.querySelector(".book-author");
    const modalCoverDiv = document.querySelector(".book-cover");
    const modalPages = document.querySelector(".pages");
    const modalRating = document.querySelector(".rating");

    const modalAnnotationContainer = document.getElementById("annotation");
    const modalCharactersContainer = document.getElementById("characters");
    const modalQuotesContainer = document.getElementById("quotes");
    const modalPlotContainer = document.getElementById("plot");

    const fadeOverlay = '<div class="fade-overlay"></div>';

    bookCards.forEach((card) => {
      card.addEventListener("click", function () {
        const bookId = this.getAttribute("data-id");
        const book = booksData[bookId];

        if (book) {
          if (modalTitle) modalTitle.innerText = book.title;
          if (modalAuthor) modalAuthor.innerText = book.author;
          if (modalPages)
            modalPages.innerText = `Количество страниц: ${book.pages}`;
          if (modalRating) modalRating.innerText = `Оценка: ${book.rating}`;

          if (modalCoverDiv) {
            modalCoverDiv.innerHTML = `<img src="${book.cover}" style="width:100%; height:100%; object-fit:cover;">`;
          }

          if (modalAnnotationContainer)
            modalAnnotationContainer.innerHTML = fadeOverlay + book.annotation;

          if (modalCharactersContainer) {
            let charsHTML = '<div class="character-list">';
            book.characters.forEach(
              (char) =>
                (charsHTML += `<div class="character-item">${char}</div>`)
            );
            charsHTML += "</div>";
            modalCharactersContainer.innerHTML = fadeOverlay + charsHTML;
          }

          if (modalQuotesContainer) {
            let quotesHTML = '<div class="quotes-list">';
            book.quotes.forEach(
              (q) => (quotesHTML += `<div class="quote-item">${q}</div>`)
            );
            quotesHTML += "</div>";
            modalQuotesContainer.innerHTML = fadeOverlay + quotesHTML;
          }

          if (modalPlotContainer) {
            modalPlotContainer.innerHTML =
              fadeOverlay + `<div class="plot-content">${book.plot}</div>`;
          }

          // --- ЛОГИКА КНОПОК ---
          const editBtn = bookModal.querySelector(".edit-btn");
          const addListBtn = bookModal.querySelector(".add-to-list");
          const commentsBtn = bookModal.querySelector(".comments");
          const libraryBtn = bookModal.querySelector(".add-to-library");

          // Клонирование для удаления старых слушателей
          if (editBtn) {
            const newBtn = editBtn.cloneNode(true);
            editBtn.parentNode.replaceChild(newBtn, editBtn);
            newBtn.addEventListener("click", () => {
              window.location.href = "settings.html";
            });
          }
          if (commentsBtn) {
            const newComBtn = commentsBtn.cloneNode(true);
            commentsBtn.parentNode.replaceChild(newComBtn, commentsBtn);
            newComBtn.addEventListener("click", () => {
              prompt("Комментарий к книге '" + book.title + "':");
              alert("Сохранено!");
            });
          }
          if (addListBtn) {
            const newListBtn = addListBtn.cloneNode(true);
            addListBtn.parentNode.replaceChild(newListBtn, addListBtn);
            newListBtn.addEventListener("click", () => {
              alert("Опубликовано в ленте!");
            });
          }
          if (libraryBtn) {
            libraryBtn.onclick = function () {
              this.innerText = "✓ В библиотеке";
              this.style.background = "var(--color-success)";
            };
          }

          bookModal.classList.add("active");
        }
      });
    });

    if (closeBookModal) {
      closeBookModal.addEventListener("click", () => {
        bookModal.classList.remove("active");
        document
          .querySelectorAll(".section-content")
          .forEach((el) => el.classList.remove("expanded"));
        document
          .querySelectorAll(".expand-btn")
          .forEach((el) => el.classList.remove("expanded"));
      });
    }

    bookModal.addEventListener("click", (e) => {
      if (e.target === bookModal) bookModal.classList.remove("active");
    });

    const expandBtns = document.querySelectorAll(".expand-btn");
    expandBtns.forEach((btn) => {
      btn.onclick = function () {
        const targetId = this.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.toggle("expanded");
          this.classList.toggle("expanded");
        }
      };
    });
  }

  /* ==========================================
     7. ФИЛЬТРЫ И ДОБАВЛЕНИЕ
     ========================================== */
  const filterButtons = document.querySelectorAll(".books-filters button");
  if (filterButtons.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const val = btn.getAttribute("data-filter");
        document.querySelectorAll(".open-modal-btn").forEach((card) => {
          const cardCat = card.getAttribute("data-category");
          if (val === "all" || cardCat === val) card.style.display = "block";
          else card.style.display = "none";
        });
      });
    });
  }

  const addModal = document.getElementById("addBookModal");
  const openAddBtn = document.getElementById("openModal");
  if (addModal && openAddBtn) {
    const closeAddBtn = addModal.querySelector(".close");
    const confirmAddBtn = addModal.querySelector(".add-btn");

    openAddBtn.addEventListener("click", () =>
      addModal.classList.add("active")
    );
    if (closeAddBtn)
      closeAddBtn.addEventListener("click", () =>
        addModal.classList.remove("active")
      );
    window.addEventListener("click", (e) => {
      if (e.target === addModal) addModal.classList.remove("active");
    });

    if (confirmAddBtn) {
      confirmAddBtn.addEventListener("click", () => {
        alert("Книга добавлена!");
        addModal.classList.remove("active");
      });
    }
  }

  /* ==========================================
     8. ЛОГИКА СМЕНЫ ТЕМЫ (SETTINGS)
     ========================================== */
  const themeSelect = document.getElementById("themeSelect");
  const savedTheme = localStorage.getItem("appTheme");

  // 1. Функция применения темы
  function applyTheme(themeName) {
      if (themeName === "dark") {
          document.body.classList.add("dark-theme");
      } else {
          document.body.classList.remove("dark-theme");
      }
  }

  // 2. При загрузке страницы проверяем сохраненную тему
  if (savedTheme) {
      applyTheme(savedTheme);
      // Если мы на странице настроек, выставляем правильный option в селекте
      if (themeSelect) {
          themeSelect.value = savedTheme;
      }
  }

  // 3. Обработчик изменения в настройках
  if (themeSelect) {
      themeSelect.addEventListener("change", (e) => {
          const newTheme = e.target.value;
          applyTheme(newTheme);
          localStorage.setItem("appTheme", newTheme);
      });
  }
});
