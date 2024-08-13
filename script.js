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

  const handleKeydown = (event) => {
    if (isScrolling) return; // Ignore key press if already scrolling

    if (event.key === "ArrowDown") {
      // Scrolling down
      if (currentSection < sections.length - 1) {
        currentSection++;
        scrollToSection(currentSection);
      }
    } else if (event.key === "ArrowUp") {
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
  window.addEventListener("keydown", handleKeydown);

  window.onload = function () {
    // Check if the page was reloaded
    const perfEntries = performance.getEntriesByType("navigation");
    if (perfEntries.length > 0 && perfEntries[0].type === "reload") {
      window.location.href = "index.html";
    }
  };

  // Handle the "About" button click
  const aboutBtn = document.querySelector(".nav-links .link a[href='#about']");
  if (aboutBtn) {
    aboutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(1); // Assuming section2 is the second section
      currentSection = 1; // Update currentSection to section2
    });
  }

  const aboutBtnMobile = document.querySelector(
    ".nav-links-mobile .link a[href='#about']"
  );
  if (aboutBtnMobile) {
    aboutBtnMobile.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(1); // Assuming section2 is the second section
      currentSection = 1; // Update currentSection to section2
    });
  }

  const artistsBtn = document.querySelector(
    ".nav-links .link a[href='#artists']"
  );
  if (artistsBtn) {
    artistsBtn.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(2);
      currentSection = 2; // Update currentSection to section3
    });
  }

  const artistsBtnMobile = document.querySelector(
    ".nav-links-mobile .link a[href='#artists']"
  );
  if (artistsBtnMobile) {
    artistsBtnMobile.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(2); // Assuming section2 is the second section
      currentSection = 2; // Update currentSection to section2
    });
  }

  const artworkBtn = document.querySelector(
    ".nav-links .link a[href='#artwork']"
  );
  if (artworkBtn) {
    artworkBtn.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(3);
      currentSection = 3; // Update currentSection to section3
    });
  }

  const artworkBtnMobile = document.querySelector(
    ".nav-links-mobile .link a[href='#artwork']"
  );
  if (artworkBtnMobile) {
    artworkBtnMobile.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(3); // Assuming section2 is the second section
      currentSection = 3; // Update currentSection to section2
    });
  }

  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(4);
      currentSection = 4; // Update currentSection to section4
    });
  }

  const contactBtnMobile = document.querySelector(
    ".nav-links-mobile a[href='#contact']"
  );
  if (contactBtnMobile) {
    contactBtnMobile.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(4); // Assuming section2 is the second section
      currentSection = 4; // Update currentSection to section2
    });
  }

  // About Us

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

  // Touch for About Us
  let touchStartX, touchCurrentX;
  let isSwiping = false;

  document.querySelector(".section2").addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    isSwiping = false;
  });

  document.querySelector(".section2").addEventListener("touchmove", (e) => {
    touchCurrentX = e.touches[0].clientX;
    if (Math.abs(touchStartX - touchCurrentX) > 10) {
      isSwiping = true;
    }
  });

  document.querySelector(".section2").addEventListener("touchend", () => {
    if (isSwiping) {
      if (touchStartX - touchCurrentX > 50) {
        // Swipe left
        slideToNext();
      } else if (touchCurrentX - touchStartX > 50) {
        // Swipe right
        slideToPrev();
      }
    }
  });

  function slideToNext() {
    const activeOption = document.querySelector(".menu-option.active");
    let nextOption = activeOption.nextElementSibling;
    if (!nextOption) nextOption = document.querySelectorAll(".menu-option")[0];
    nextOption.click();
  }

  function slideToPrev() {
    const activeOption = document.querySelector(".menu-option.active");
    let prevOption = activeOption.previousElementSibling;
    if (!prevOption)
      prevOption = document.querySelectorAll(".menu-option").slice(-1)[0];
    prevOption.click();
  }

  // Carousel

  let nextDom = document.getElementById("next");
  let prevDom = document.getElementById("prev");
  let carouselDom = document.querySelector(".carousel");
  let listItemDom = document.querySelector(".carousel .list");
  let thumbnailDom = document.querySelector(".carousel .thumbnail");

  nextDom.onclick = function () {
    showSlider("next");
  };
  prevDom.onclick = function () {
    showSlider("prev");
  };
  let timeRunning = 1000;
  let runTimeOut;
  function showSlider(type) {
    let itemSlider = document.querySelectorAll(".carousel .list .item");
    let itemThumbnail = document.querySelectorAll(
      ".carousel .thumbnail .tnitem"
    );

    if (type === "next") {
      listItemDom.appendChild(itemSlider[0]);
      thumbnailDom.appendChild(itemThumbnail[0]);
      carouselDom.classList.add("next");
    } else {
      let positionLastItem = itemSlider.length - 1;
      listItemDom.prepend(itemSlider[positionLastItem]);
      thumbnailDom.prepend(itemThumbnail[positionLastItem]);
      carouselDom.classList.add("prev");
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
    }, timeRunning);
  }

  // Google sheets

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwXL5oKO7-Yu8OwQL6XD3-tDqwxWZhZrWXXY7aslkVrGL25bCZP4xVkN05R3dEx3iEazA/exec"; // replace with your Google Apps Script URL
  const form = document.forms["newsletter-form"];
  const responseDiv = document.getElementById("response");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    responseDiv.innerHTML = "Submitting...";

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => response.json())
      .then((response) => {
        if (response.result === "success") {
          responseDiv.innerHTML = "Thank you for subscribing!";
          form.reset();
        } else {
          responseDiv.innerHTML = "There was an error. Please try again.";
        }
      })
      .catch((error) => {
        responseDiv.innerHTML = "There was an error. Please try again.";
        console.error("Error!", error.message);
      });
  });

  //Nav Toggle

  const navToggle = document.getElementById("navToggle");
  const navLinksMobile = document.getElementById("navLinksMobile");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinksMobile.classList.toggle("active");
  });

  navLinksMobile.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navLinksMobile.classList.remove("active");
  });

  // Touch events for scroll functionality
  let startY;
  let endY;

  const handleTouchStart = (event) => {
    startY = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    endY = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (isScrolling) return; // Ignore if already scrolling

    if (startY > endY + 100) {
      // Swiped up
      if (currentSection < sections.length - 1) {
        currentSection++;
        scrollToSection(currentSection);
      }
    } else if (startY < endY - 100) {
      // Swiped down
      if (currentSection > 0) {
        currentSection--;
        scrollToSection(currentSection);
      }
    }
  };

  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchmove", handleTouchMove);
  container.addEventListener("touchend", handleTouchEnd);

  // Touch events for carousel functionality
  let startX;
  let endX;

  const handleCarouselTouchStart = (event) => {
    startX = event.touches[0].clientX;
  };

  const handleCarouselTouchMove = (event) => {
    endX = event.touches[0].clientX;
  };

  const handleCarouselTouchEnd = () => {
    if (startX > endX + 50) {
      // Swiped left
      showSlider("next");
    } else if (startX < endX - 50) {
      // Swiped right
      showSlider("prev");
    }
  };

  carouselDom.addEventListener("touchstart", handleCarouselTouchStart);
  carouselDom.addEventListener("touchmove", handleCarouselTouchMove);
  carouselDom.addEventListener("touchend", handleCarouselTouchEnd);

  //artwork-slider

  // Touch events for artwork-slider functionality
  const slider = document.querySelector(".artwork-slider .slider");
  let isTouching = false;
  // let startX = 0;
  let scrollLeft = 0;
  let animationPaused = false;

  slider.addEventListener("touchstart", (e) => {
    isTouching = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;

    if (!animationPaused) {
      slider.style.animationPlayState = "paused";
      animationPaused = true;
    }
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isTouching) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Increase the number to make the slide faster
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener("touchend", () => {
    isTouching = false;
    setTimeout(() => {
      slider.style.animationPlayState = "running";
      animationPaused = false;
    }, 1000); // 1 second delay before resuming the animation
  });
});
