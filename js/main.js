
document.addEventListener("DOMContentLoaded", () => {
  // Elementos generales
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  // Año automático en el pie de página
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Menú adaptable para celulares
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  // Filtros de animales
  const filters = document.querySelectorAll(".filter");
  const animalCards = document.querySelectorAll(".animal-card");
  const resultCount = document.getElementById("resultCount");

  function updateAnimalCount() {
    const visibleCards = [...animalCards].filter(
      (card) => !card.classList.contains("hidden")
    );

    if (resultCount) {
      const count = String(visibleCards.length).padStart(2, "0");
      resultCount.textContent = `${count} ESPECIES`;
    }
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((filter) => filter.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.filter;

      animalCards.forEach((card) => {
        const matches =
          category === "todos" || card.dataset.category === category;

        card.classList.toggle("hidden", !matches);
      });

      updateAnimalCount();
    });
  });

  updateAnimalCount();

  // Guardar favoritos durante la sesión actual
  const favoriteButtons = document.querySelectorAll(".favorite");
  const favoriteNote = document.getElementById("favoriteNote");
  const favorites = new Set();

  function updateFavorites() {
    if (!favoriteNote) return;

    if (favorites.size === 0) {
      favoriteNote.textContent =
        "♡ Tus favoritos aparecerán marcados con un corazón.";
    } else {
      favoriteNote.textContent =
        `♥ Tienes ${favorites.size} ${
          favorites.size === 1 ? "animal favorito" : "animales favoritos"
        }.`;
    }
  }

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".animal-card");
      if (!card) return;

      const name = card.dataset.name;
      const isFavorite = favorites.has(name);

      if (isFavorite) {
        favorites.delete(name);
        button.classList.remove("is-favorite");
        button.textContent = "♡";
        button.setAttribute("aria-pressed", "false");
        showToast(`${name} ya no está en tus favoritos.`);
      } else {
        favorites.add(name);
        button.classList.add("is-favorite");
        button.textContent = "♥";
        button.setAttribute("aria-pressed", "true");
        showToast(`¡${name} se agregó a tus favoritos!`);
      }

      updateFavorites();
    });
  });

  // Botones con curiosidades de animales
  const detailButtons = document.querySelectorAll(".detail-btn");

  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".animal-card");

      if (card) {
        const name = card.dataset.name;
        const fact = card.dataset.fact;

        showToast(`🐾 ${name}: ${fact}`);
      }
    });
  });

  // Curiosidades aleatorias
  const facts = [
    "Las rayas de cada tigre tienen un patrón único.",
    "Los pulpos tienen tres corazones y una gran capacidad para resolver problemas.",
    "Las abejas ayudan a polinizar muchas plantas de las que dependemos.",
    "Los delfines usan sonidos para comunicarse y algunas especies emplean ecolocalización.",
    "Los manglares sirven de refugio y zona de crianza para muchas especies.",
    "Las tortugas marinas recorren largas distancias durante sus migraciones.",
    "Los murciélagos cumplen funciones importantes, como controlar insectos y polinizar plantas.",
    "Los bosques ayudan a almacenar carbono y albergan una enorme diversidad de seres vivos.",
    "Algunas aves migratorias recorren miles de kilómetros durante sus viajes.",
    "Los arrecifes de coral son ecosistemas que sirven de hogar a muchísimas especies."
  ];

  const newFactButton = document.getElementById("newFact");
  const factText = document.getElementById("factText");
  const factNumber = document.getElementById("factNumber");

  let lastFactIndex = -1;

  if (newFactButton && factText) {
    newFactButton.addEventListener("click", () => {
      let index;

      do {
        index = Math.floor(Math.random() * facts.length);
      } while (facts.length > 1 && index === lastFactIndex);

      lastFactIndex = index;
      factText.textContent = facts[index];

      if (factNumber) {
        factNumber.textContent = String(index + 1).padStart(2, "0");
      }
    });
  }

  // Lista de acciones para cuidar la naturaleza
  const tasks = document.querySelectorAll(".task input[type='checkbox']");
  const taskProgress = document.getElementById("taskProgress");
  const progressBar = document.getElementById("progressBar");
  const progressMessage = document.getElementById("progressMessage");

  function updateProgress() {
    const total = tasks.length;
    const completed = [...tasks].filter((task) => task.checked).length;
    const percentage = total ? (completed / total) * 100 : 0;

    if (taskProgress) {
      taskProgress.textContent = `${completed} de ${total}`;
    }

    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }

    if (progressMessage) {
      if (completed === total && total > 0) {
        progressMessage.textContent =
          "¡Excelente! Estás listo para cuidar nuestro planeta. 🌎";
      } else if (completed >= 3) {
        progressMessage.textContent =
          "¡Vas muy bien! Cada acción ayuda a la biodiversidad. 🌿";
      } else if (completed > 0) {
        progressMessage.textContent =
          "¡Buen comienzo! Sigue sumando acciones positivas. 💙";
      } else {
        progressMessage.textContent =
          "Cada pequeño paso cuenta. 🌱";
      }
    }
  }

  tasks.forEach((task) => {
    task.addEventListener("change", updateProgress);
  });

  updateProgress();

  // Formulario demostrativo
  const joinForm = document.getElementById("joinForm");
  const joinEmail = document.getElementById("joinEmail");
  const joinMessage = document.getElementById("joinMessage");

  if (joinForm && joinEmail && joinMessage) {
    joinForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!joinEmail.checkValidity()) {
        joinEmail.reportValidity();
        return;
      }

      joinMessage.textContent =
        "¡Gracias por tu interés! Este formulario es una demostración y no envía correos.";
      joinForm.reset();
    });
  }

  // Chat demostrativo EcoAmigo
  const chatLauncher = document.getElementById("chatLauncher");
  const chatPopup = document.getElementById("chatPopup");
  const closeChat = document.getElementById("closeChat");
  const clearChat = document.getElementById("clearChat");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const quickReplies = document.querySelectorAll(".quick-replies button");

  const welcomeMessage =
    "¡Hola, explorador! 🐾 Soy EcoAmigo. Pregúntame sobre animales, hábitats o formas de cuidar la naturaleza.";

  function setChatOpen(isOpen) {
    if (!chatPopup || !chatLauncher) return;

    chatPopup.setAttribute("aria-hidden", String(!isOpen));
    chatLauncher.setAttribute("aria-expanded", String(isOpen));

    if (isOpen && chatInput) {
      chatInput.focus();
    }
  }

  function addMessage(text, sender) {
    if (!chatMessages) return;

    const message = document.createElement("div");
    message.className =
      sender === "user" ? "message user-message" : "message bot-message";

    // textContent evita interpretar el mensaje como HTML.
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotReply(question) {
    const text = question.toLowerCase();

    if (
      text.includes("hola") ||
      text.includes("buenos días") ||
      text.includes("buenas tardes")
    ) {
      return "¡Hola! 💙 Qué alegría tenerte por aquí. ¿Qué animal te gustaría conocer?";
    }

    if (
      text.includes("mar") ||
      text.includes("océano") ||
      text.includes("delfín") ||
      text.includes("tortuga") ||
      text.includes("pez")
    ) {
      return "🌊 El océano es el hogar de muchísimas especies. Podemos ayudar evitando tirar basura al agua, reduciendo los plásticos y respetando la vida marina.";
    }

    if (
      text.includes("ayudar") ||
      text.includes("proteger") ||
      text.includes("cuidar") ||
      text.includes("salvar")
    ) {
      return "🌿 Puedes ayudar reduciendo residuos, respetando a los animales silvestres, cuidando los espacios naturales y compartiendo lo que aprendes.";
    }

    if (
      text.includes("tigre") ||
      text.includes("león") ||
      text.includes("felino")
    ) {
      return "🐅 Los grandes felinos son depredadores importantes para sus ecosistemas. Necesitan hábitats bien conservados y protección frente a la caza ilegal.";
    }

    if (
      text.includes("ave") ||
      text.includes("pájaro") ||
      text.includes("guacamaya") ||
      text.includes("búho")
    ) {
      return "🦜 Las aves cumplen funciones importantes en la naturaleza: algunas dispersan semillas, otras polinizan flores y muchas ayudan a controlar insectos.";
    }

    if (
      text.includes("bosque") ||
      text.includes("árbol") ||
      text.includes("selva") ||
      text.includes("hábitat")
    ) {
      return "🌳 Los bosques ofrecen refugio y alimento a muchísimas especies. Cuidarlos implica reducir residuos, respetar las zonas naturales y apoyar su conservación.";
    }

    if (
      text.includes("extinción") ||
      text.includes("peligro") ||
      text.includes("amenazad")
    ) {
      return "💙 Las especies pueden verse amenazadas por la pérdida de hábitat, la contaminación, el cambio climático y otras actividades humanas. Proteger sus ecosistemas es fundamental.";
    }

    if (
      text.includes("gracias") ||
      text.includes("chao") ||
      text.includes("adiós")
    ) {
      return "¡Con gusto, explorador! 🌎 Gracias por interesarte en la fauna. Recuerda: conocer, respetar y proteger.";
    }

    return "🐾 ¡Qué buena pregunta! En Fauna Azul puedes explorar las fichas de animales y sus curiosidades. También puedes preguntarme cómo cuidar los océanos, los bosques o la fauna silvestre.";
  }

  function sendChatMessage(message) {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    addMessage(cleanMessage, "user");

    const reply = getBotReply(cleanMessage);

    // Respuesta local demostrativa, sin conexión a servicios externos.
    setTimeout(() => {
      addMessage(reply, "bot");
    }, 350);
  }

  if (chatLauncher) {
    chatLauncher.addEventListener("click", () => {
      const isOpen = chatPopup?.getAttribute("aria-hidden") === "false";
      setChatOpen(!isOpen);
    });
  }

  if (closeChat) {
    closeChat.addEventListener("click", () => {
      setChatOpen(false);
    });
  }

  if (clearChat && chatMessages) {
    clearChat.addEventListener("click", () => {
      chatMessages.replaceChildren();

      const welcome = document.createElement("div");
      welcome.className = "message bot-message";
      welcome.textContent = welcomeMessage;

      chatMessages.appendChild(welcome);
    });
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const message = chatInput.value;
      if (!message.trim()) return;

      chatInput.value = "";
      sendChatMessage(message);
    });
  }

  quickReplies.forEach((button) => {
    button.addEventListener("click", () => {
      sendChatMessage(button.dataset.reply || button.textContent);
    });
  });

  // Cerrar el chat con la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      chatPopup &&
      chatPopup.getAttribute("aria-hidden") === "false"
    ) {
      setChatOpen(false);
    }
  });

});
