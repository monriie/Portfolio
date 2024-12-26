const navButton = document.querySelector("#nav-button");
const sideNav = document.querySelector("#side-nav");
const navCloseButton = document.querySelector("#nav-close-button");

navButton.addEventListener("click", () => {
  navButton.classList.toggle("nav-line");
  sideNav.style.display = "block";
});

navCloseButton.addEventListener("click", () => {
  navButton.classList.toggle("nav-line");
  sideNav.style.display = "none";
});

const navLinks = document.querySelectorAll("nav a");
function removeActiveClass() {
  navLinks.forEach((link) => link.classList.remove("border-gray-400", "border-b-2", "text-gray-400"));
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    removeActiveClass();
    e.target.classList.add("border-gray-400", "border-b-2", "text-gray-400");
  });
});

const currentPage = window.location.hash;
if (currentPage) {
  const activeLink = document.querySelector(`a[href="${currentPage}"]`);
  if (activeLink) activeLink.classList.add("border-gray-400", "border-b-2", "text-gray-400");
}

function skillCardInteraction() {
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("animate-pulse");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("animate-pulse");
    });
  });
}

function projectFilter() {
  const filterButtons = document.querySelectorAll(".project-filter-btn");
  const projects = document.querySelectorAll(".project-card");

  // Fungsi untuk memfilter proyek
  const filterProjects = (filter) => {
    projects.forEach((project) => {
      const isVisible = filter === "all" || project.classList.contains(filter);
      project.style.display = isVisible ? "block" : "none";
    });
  };

  // Event listener untuk setiap tombol filter
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.setAttribute("data-active", "false");
      });

      button.setAttribute("data-active", "true");

      const filter = button.getAttribute("data-filter");

      filterProjects(filter);
    });
  });

  const defaultButton = document.querySelector(
    '.project-filter-btn[data-filter="all"]'
  );
  if (defaultButton) {
    defaultButton.setAttribute("data-active", "true");
  }
}

function downloadCV() {
  const cvPath = "asset/CV_Front-End.pdf";

  fetch(cvPath)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "CV_monriie.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error("Download error:", error);
      alert("Maaf, terjadi kesalahan saat download CV");
    });
}

document
  .getElementById("download-cv-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    downloadCV();
  });

function formValidation() {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    let isValid = true;

    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name cannot be empty");
      isValid = false;
    } else {
      removeError(nameInput);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, "Invalid email format");
      isValid = false;
    } else {
      removeError(emailInput);
    }

    if (messageInput.value.trim() === "") {
      showError(messageInput, "Message cannot be empty");
      isValid = false;
    } else {
      removeError(messageInput);
    }

    if (!isValid) {
      e.preventDefault();
    }
  });

  function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      const error = document.createElement("div");
      error.className = "error-message text-red-500 text-sm mt-1";
      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
    }
    input.classList.add("border-red-500");
  }

  function removeError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.remove();
    }
    input.classList.remove("border-red-500");
  }
}

function scrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  setTimeout(() => {
    document.getElementById("confirmation-message").classList.remove("hidden");
    document.getElementById("contact-form").reset();

    setTimeout(() => {
      document.getElementById("confirmation-message").classList.add("hidden");
    }, 5000);
  }, 500);
}

function init() {
  projectFilter();
  formValidation();
  scrollReveal();
  skillCardInteraction();
}

document.addEventListener("DOMContentLoaded", init);
