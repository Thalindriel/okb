document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form.appointment-form");

  const fadeIns = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  fadeIns.forEach(el => observer.observe(el));

  if (form) {
    const dateInput = form.querySelector("input[name='date']");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.setAttribute("min", today);
      dateInput.value = today;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector("input[name='name']");
      const phone = form.querySelector("input[name='phone']");
      const date = form.querySelector("input[name='date']");

      let errors = [];

      [name, phone, date].forEach(input => input.classList.remove("error"));

      if (name.value.trim().length < 2) {
        errors.push("Введите корректное имя.");
        name.classList.add("error");
      }

      if (!/^\+?\\d{10,15}$/.test(phone.value.trim())) {
        errors.push("Введите корректный номер телефона.");
        phone.classList.add("error");
      }

      if (!date.value) {
        errors.push("Выберите дату приёма.");
        date.classList.add("error");
      }

      const errorContainer = form.querySelector(".form-errors");
      errorContainer.innerHTML = "";

      if (errors.length > 0) {
        errors.forEach(err => {
          const p = document.createElement("p");
          p.textContent = err;
          errorContainer.appendChild(p);
        });
        form.scrollIntoView({ behavior: "smooth" });
      } else {
        showPopup("Заявка успешно отправлена! Мы с вами свяжемся.");
        form.reset();
      }
    });
  }

  function showPopup(message) {
    let popup = document.getElementById("popup-success");
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "popup-success";
      popup.className = "popup hidden";
      document.body.appendChild(popup);
    }
    popup.textContent = message;
    popup.classList.remove("hidden");
    popup.classList.add("visible");

    setTimeout(() => {
      popup.classList.remove("visible");
      popup.classList.add("hidden");
    }, 3000);
  }

  const serviceDescriptions = {
    therapist: {
      title: "Приём терапевта",
      text: "Включает первичный осмотр, измерение давления, консультацию, рекомендации и при необходимости — направления на анализы.",
    },
    cardiologist: {
      title: "Приём кардиолога",
      text: "Кардиолог проведёт осмотр, ЭКГ, сбор анамнеза и подберёт индивидуальный план лечения.",
    },
    ultrasound: {
      title: "УЗИ органов брюшной полости",
      text: "Безболезненное обследование органов ЖКТ. Подготовка: за 6 часов до процедуры — не есть.",
    },
    fluorography: {
      title: "Флюорография",
      text: "Быстрый и безопасный метод диагностики лёгких. Выдаётся заключение с печатью.",
    },
    neurologist: {
      title: "Приём невролога",
      text: "Консультация по головной боли, спине, нервной системе. Подбор терапии и МРТ по показаниям.",
    },
    bloodtest: {
      title: "Общий анализ крови",
      text: "Базовое исследование, результат — в течение 1 дня. Сдаётся натощак.",
    }
  };

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".btn-small").forEach(button => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const key = this.dataset.service;
    const content = serviceDescriptions[key];

    if (content) {
      modalBody.innerHTML = `
        <h3>${content.title}</h3>
        <p>${content.text}</p>
      `;
      modal.classList.remove("hidden");
    }
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

  document.querySelectorAll(".btn-small").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const serviceKey = this.dataset.service;
      const service = serviceDescriptions[serviceKey];
      if (service) {
        modalBody.innerHTML = `
          <h3>${service.title}</h3>
          <p>${service.text}</p>
        `;
        modal.classList.remove("hidden");
      }
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});