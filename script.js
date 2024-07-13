document.addEventListener("DOMContentLoaded", () => {
  let currentSection = Math.floor(window.scrollY / window.innerHeight);
  const sections = document.querySelectorAll(".section");
  const container = document.querySelector(".sections-container");
  let isScrolling = false; // Prevent multiple scrolls

  const scrollToSection = (index) => {
    container.style.transform = `translateY(-${index * 100}vh)`;
    isScrolling = true;
    setTimeout(() => {
      isScrolling = false;
    }, 1000); // Match the CSS transition duration
  };

  const handleScroll = (event) => {
    if (isScrolling) return; // Ignore scroll if already scrolling

    if (event.deltaY > 0) {
      // Scrolling down
      if (currentSection < sections.length - 1) {
        currentSection++;
        scrollToSection(currentSection);
      }
    } else {
      // Scrolling up
      if (currentSection > 0) {
        currentSection--;
        scrollToSection(currentSection);
      }
    }
  };

  window.addEventListener("scroll", () => {
    currentSection = Math.floor(window.scrollY / window.innerHeight);
  });

  window.addEventListener("wheel", handleScroll);

  window.onload = () => {
    scrollToSection(0); // Ensure it scrolls to section1 on page load
  };

  const exploreBtn = document.getElementById("exploreBtn");
  exploreBtn.addEventListener("click", () => {
    if (currentSection < sections.length - 1) {
      currentSection++;
      scrollToSection(currentSection);
    }
  });

  // Handle the "About" button click
  const aboutBtn = document.querySelector(".nav-links .link a[href='#about']");
  if (aboutBtn) {
    aboutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(1); // Assuming section2 is the second section
      currentSection = 1; // Update currentSection to section2
    });
  }

  const firstMenuContent = document.querySelector(".menu-content");
  firstMenuContent.classList.add("active"); // Add "active" class to the first content
  const firstMenuOption = document.querySelector(".menu-option");
  firstMenuOption.classList.add("active");

  const menuOptions = document.querySelectorAll(".menu-option");
  const menuContents = document.querySelectorAll(".menu-content");

  menuOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const target = option.getAttribute("data-target");

      // Remove active class from all options and contents
      menuOptions.forEach((opt) => opt.classList.remove("active"));
      menuContents.forEach((content) => content.classList.remove("active"));

      // Add active class only to clicked option and its target content
      menuContents.forEach((content) => {
        if (content.id === target) {
          content.classList.add("active");
          option.classList.add("active");
        }
      });
    });
  });
});
