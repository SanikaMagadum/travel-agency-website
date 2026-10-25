
"use strict";

// ============================================
// 1. TOUR PACKAGE DATA
// Sample prices are in INR per traveler.
// Replace these with your actual tour details.
// ============================================

const tours = [
  {
    id: 1,
    title: "Goa Beach Escape",
    destination: "Goa",
    category: "Beach",
    duration: "3 Days / 2 Nights",
    price: 7999,
    badge: "BESTSELLER",
    description: "Golden beaches, sunset views, and a relaxing coastal holiday.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    title: "Manali Mountain Adventure",
    destination: "Manali",
    category: "Adventure",
    duration: "5 Days / 4 Nights",
    price: 12999,
    badge: "ADVENTURE",
    description: "Mountain scenery, fresh air, and unforgettable Himalayan views.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    title: "Kerala Nature Retreat",
    destination: "Kerala",
    category: "Nature",
    duration: "4 Days / 3 Nights",
    price: 10999,
    badge: "NATURE",
    description: "Discover lush landscapes, peaceful backwaters, and green hills.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    title: "Kashmir Valley Journey",
    destination: "Kashmir",
    category: "Adventure",
    duration: "6 Days / 5 Nights",
    price: 18999,
    badge: "POPULAR",
    description: "Explore stunning valleys, mountain lakes, and scenic viewpoints.",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5,
    title: "Rajasthan Royal Trails",
    destination: "Rajasthan",
    category: "Culture",
    duration: "4 Days / 3 Nights",
    price: 9999,
    badge: "CULTURE",
    description: "Experience colorful markets, historic forts, and royal heritage.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6,
    title: "Kerala Hill Country",
    destination: "Kerala",
    category: "Nature",
    duration: "3 Days / 2 Nights",
    price: 8499,
    badge: "NATURE",
    description: "Enjoy tea gardens, cool weather, and beautiful hill scenery.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85"
  }
];

// ============================================
// 2. GET HTML ELEMENTS
// ============================================

const packageGrid = document.getElementById("packageGrid");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");

const searchForm = document.getElementById("searchForm");
const destinationSearch = document.getElementById("destinationSearch");
const travelDate = document.getElementById("travelDate");
const travelersSelect = document.getElementById("travelers");

const filterBar = document.getElementById("filterBar");

const bookingDialog = document.getElementById("bookingDialog");
const bookingForm = document.getElementById("bookingForm");
const bookingTour = document.getElementById("bookingTour");
const bookingDate = document.getElementById("bookingDate");
const bookingTravelers = document.getElementById("bookingTravelers");
const bookingSummary = document.getElementById("bookingSummary");
const bookingSubmit = document.getElementById("bookingSubmit");
const bookingMessage = document.getElementById("bookingMessage");

const toast = document.getElementById("toast");

const contactForm = document.getElementById("contactForm");
const contactMessageStatus = document.getElementById("contactMessageStatus");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

let activeCategory = "All";
let currentBookingMode = "inquiry";
let toastTimer = null;

// ============================================
// 3. HELPER FUNCTIONS
// ============================================

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

function escapeHTML(value) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(value).replace(/[&<>"']/g, character => {
    return entities[character];
  });
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimer !== null) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// ============================================
// 4. RENDER TOUR PACKAGES
// ============================================

function renderPackages(list) {
  if (!packageGrid || !emptyState || !resultsCount) return;

  packageGrid.innerHTML = "";

  resultsCount.textContent =
    `${list.length} ${list.length === 1 ? "package" : "packages"} found`;

  emptyState.hidden = list.length > 0;

  list.forEach(tour => {
    const card = document.createElement("article");

    card.className = "package-card";

    card.innerHTML = `
      <div class="package-image-wrap">
        <img
          class="package-image"
          src="${escapeHTML(tour.image)}"
          alt="${escapeHTML(tour.title)}"
          loading="lazy"
        >

        <span class="package-badge">
          ${escapeHTML(tour.badge)}
        </span>
      </div>

      <div class="package-content">

        <div class="package-meta">
          <span>📍 ${escapeHTML(tour.destination)}</span>
          <span>◷ ${escapeHTML(tour.duration)}</span>
        </div>

        <h3>${escapeHTML(tour.title)}</h3>

        <p>${escapeHTML(tour.description)}</p>

        <div class="package-bottom">

          <div>
            <span class="price-label">Starting price / person</span>

            <span class="package-price">
              ${formatPrice(tour.price)}
            </span>
          </div>

          <div class="package-actions">

            <button
              class="small-book-btn"
              type="button"
              data-book-tour="${tour.id}"
            >
              Enquire
            </button>

            <button
              class="small-book-btn online-book-btn"
              type="button"
              data-online-tour="${tour.id}"
            >
              Book Online
            </button>

          </div>
        </div>
      </div>
    `;

    packageGrid.appendChild(card);
  });
}

// ============================================
// 5. SEARCH AND FILTER TOUR PACKAGES
// ============================================

function applyFilters() {
  if (!destinationSearch) return;

  const searchTerm = destinationSearch.value
    .trim()
    .toLowerCase();

  const filteredTours = tours.filter(tour => {
    const matchesCategory =
      activeCategory === "All" ||
      tour.category === activeCategory;

    const matchesDestination =
      searchTerm === "" ||
      tour.destination.toLowerCase() === searchTerm;

    return matchesCategory && matchesDestination;
  });

  renderPackages(filteredTours);
}

// Category filter buttons
if (filterBar) {
  filterBar.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");

    if (!button) return;

    activeCategory = button.dataset.category;

    filterBar.querySelectorAll(".filter-btn").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    applyFilters();
  });
}

// Search form
if (searchForm) {
  searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const selectedDate = travelDate.value;
    const today = getLocalDateString();

    if (selectedDate && selectedDate < today) {
      showToast("Please select today or a future departure date.");
      travelDate.focus();
      return;
    }

    activeCategory = "All";

    if (filterBar) {
      filterBar.querySelectorAll(".filter-btn").forEach(button => {
        button.classList.toggle(
          "active",
          button.dataset.category === "All"
        );
      });
    }

    applyFilters();

    document.getElementById("packages")?.scrollIntoView({
      behavior: "smooth"
    });

    if (selectedDate && bookingDate) {
      bookingDate.value = selectedDate;
    }

    if (travelersSelect && bookingTravelers) {
      bookingTravelers.value = travelersSelect.value;
    }

    if (destinationSearch.value && packageGrid.children.length === 0) {
      showToast("No packages found. Try another destination.");
    }
  });
}

// Destination cards
document.querySelectorAll("[data-destination]").forEach(card => {
  card.addEventListener("click", () => {
    destinationSearch.value = card.dataset.destination;
    activeCategory = "All";

    if (filterBar) {
      filterBar.querySelectorAll(".filter-btn").forEach(button => {
        button.classList.toggle(
          "active",
          button.dataset.category === "All"
        );
      });
    }

    applyFilters();

    document.getElementById("packages")?.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ============================================
// 6. BOOKING FORM AND TOUR OPTIONS
// ============================================

function populateTourOptions() {
  if (!bookingTour) return;

  bookingTour.innerHTML = tours.map(tour => `
    <option value="${tour.id}">
      ${escapeHTML(tour.title)} — ${formatPrice(tour.price)} per person
    </option>
  `).join("");
}

function updateBookingSummary() {
  if (!bookingTour || !bookingTravelers || !bookingSummary) return;

  const selectedTour = tours.find(
    tour => tour.id === Number(bookingTour.value)
  );

  const travelerCount = Number(bookingTravelers.value);

  if (
    !selectedTour ||
    !Number.isInteger(travelerCount) ||
    travelerCount < 1 ||
    travelerCount > 6
  ) {
    bookingSummary.textContent = "";
    return;
  }

  const total = selectedTour.price * travelerCount;

  bookingSummary.textContent =
    `Estimated total for ${travelerCount} ` +
    `${travelerCount === 1 ? "traveler" : "travelers"}: ` +
    `${formatPrice(total)}. Final price and availability must be confirmed.`;
}

function openBookingForm(mode = "inquiry", tourId = null) {
  if (!bookingDialog || !bookingForm) return;

  currentBookingMode = mode;

  bookingForm.reset();

  bookingMessage.textContent = "";

  if (bookingDate) {
    bookingDate.min = getLocalDateString();
    bookingDate.value = travelDate?.value || "";
  }

  if (bookingTravelers && travelersSelect) {
    bookingTravelers.value = travelersSelect.value || "2";
  }

  if (bookingTour && tourId !== null) {
    bookingTour.value = String(tourId);
  } else if (bookingTour && destinationSearch?.value) {
    const matchingTour = tours.find(
      tour => tour.destination === destinationSearch.value
    );

    if (matchingTour) {
      bookingTour.value = String(matchingTour.id);
    }
  }

  const isOnline = mode === "online";

  document.getElementById("bookingType").value = mode;

  document.getElementById("dialogTitle").textContent =
    isOnline ? "Start your booking" : "Plan your adventure";

  document.getElementById("dialogDescription").textContent =
    isOnline
      ? "Review your trip details. Online payment will be enabled after secure backend integration."
      : "Share your details and our travel team can help you plan your trip.";

  bookingSubmit.textContent =
    isOnline ? "Continue to Booking" : "Submit Inquiry";

  updateBookingSummary();

  if (!bookingDialog.open) {
    bookingDialog.showModal();
  }
}

// Close modal button
document.getElementById("closeDialog")?.addEventListener("click", () => {
  bookingDialog.close();
});

// Close modal by clicking its backdrop
if (bookingDialog) {
  bookingDialog.addEventListener("click", event => {
    if (event.target === bookingDialog) {
      bookingDialog.close();
    }
  });
}

// Handle both Enquire and Book Online buttons
if (packageGrid) {
  packageGrid.addEventListener("click", event => {
    const inquiryButton = event.target.closest("[data-book-tour]");
    const onlineButton = event.target.closest("[data-online-tour]");

    if (inquiryButton) {
      openBookingForm(
        "inquiry",
        Number(inquiryButton.dataset.bookTour)
      );
      return;
    }

    if (onlineButton) {
      openBookingForm(
        "online",
        Number(onlineButton.dataset.onlineTour)
      );
    }
  });
}

// Custom trip inquiry button
document.getElementById("customTripBtn")?.addEventListener("click", () => {
  openBookingForm("inquiry");
});

// Update total when tour or traveler count changes
bookingTour?.addEventListener("change", updateBookingSummary);

bookingTravelers?.addEventListener("change", updateBookingSummary);

// ============================================
// 7. BOOKING FORM SUBMISSION
// DEMO ONLY: no database or payment gateway
// ============================================


/* ============================================
   7. BOOKING FORM SUBMISSION
   Save inquiries to MySQL through the backend
============================================ */

if (bookingForm) {
  bookingForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const selectedTour = tours.find(
      tour => tour.id === Number(bookingTour.value)
    );

    const date = bookingDate.value;
    const today = getLocalDateString();

    if (!selectedTour) {
      bookingMessage.textContent =
        "Please select a valid tour package.";
      return;
    }

    if (!date || date < today) {
      bookingMessage.textContent =
        "Please choose today or a future departure date.";
      bookingDate.focus();
      return;
    }

    // Read customer details from the form fields.
    // These IDs must match the IDs in index.html.
    const name = bookingForm.querySelector('[name="name"]')?.value.trim();
    const email = bookingForm.querySelector('[name="email"]')?.value.trim();
    const phone = bookingForm.querySelector('[name="phone"]')?.value.trim();
    const message =
      bookingForm.querySelector('[name="message"]')?.value.trim() || "";

    const travelers = Number(bookingTravelers.value);

    if (!name || !email || !phone) {
      bookingMessage.textContent =
        "Please check your name, email, and phone fields.";
      return;
    }

    const payload = {
      name,
      email,
      phone,
      tour_id: selectedTour.id,
      travel_date: date,
      travelers,
      message
    };

    bookingSubmit.disabled = true;
    bookingMessage.textContent = "Submitting your enquiry...";

    try {
      const response = await fetch(
        "http://localhost:5000/api/inquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Could not save your enquiry."
        );
      }

      bookingMessage.textContent =
        `Your enquiry was saved successfully! Reference ID: ${result.inquiryId}`;

      showToast("Your enquiry has been saved!");

      bookingForm.reset();
      updateBookingSummary();

    } catch (error) {
      console.error("Booking submission failed:", error);

      bookingMessage.textContent =
        "Unable to submit your enquiry. Please ensure the backend server is running and try again.";
    } finally {
      bookingSubmit.disabled = false;
    }
  });
}


// ============================================
// 8. CONTACT FORM
// DEMO ONLY: no message is sent
// ============================================

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    contactMessageStatus.textContent =
      "Demo only: your message was not sent. A backend contact API is required.";

    contactForm.reset();
  });
}

// ============================================
// 9. MOBILE NAVIGATION
// ============================================

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// ============================================
// 10. INITIALIZE WEBSITE
// ============================================

function initializeWebsite() {
  const today = getLocalDateString();

  if (travelDate) {
    travelDate.min = today;
  }

  if (bookingDate) {
    bookingDate.min = today;
  }

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  populateTourOptions();
  applyFilters();
  updateBookingSummary();
}

initializeWebsite();


async function testBookingAPI() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/inquiries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Test Customer",
          email: "customer@example.com",
          phone: "9876543210",
          tourId: 1,
          travelDate: "2026-12-15",
          travelers: 2,
          message: "Please share the Goa package details."
        })
      }
    );

    const result = await response.json();
    console.log("HTTP Status:", response.status);
    console.log("API Response:", result);
  } catch (error) {
    console.error("Booking API test failed:", error);
  }
}

// testBookingAPI();

