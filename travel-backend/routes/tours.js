
const express = require("express");
const router = express.Router();

// Sample tour packages.
// We will replace this array with MySQL data later.
const tours = [
  {
    id: 1,
    title: "Goa Beach Escape",
    destination: "Goa",
    duration: "3 Days / 2 Nights",
    price: 7999,
    category: "Beach",
    description: "Relax on beautiful beaches and explore Goa.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    title: "Manali Mountain Adventure",
    destination: "Manali",
    duration: "5 Days / 4 Nights",
    price: 12999,
    category: "Adventure",
    description: "Enjoy mountain views and scenic landscapes.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    title: "Kerala Nature Retreat",
    destination: "Kerala",
    duration: "4 Days / 3 Nights",
    price: 10999,
    category: "Nature",
    description: "Discover lush greenery and peaceful backwaters.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    title: "Kashmir Scenic Holiday",
    destination: "Kashmir",
    duration: "5 Days / 4 Nights",
    price: 15999,
    category: "Nature",
    description: "Explore beautiful valleys and mountain scenery.",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5,
    title: "Rajasthan Heritage Tour",
    destination: "Rajasthan",
    duration: "4 Days / 3 Nights",
    price: 9999,
    category: "Culture",
    description: "Explore historic forts and royal architecture.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85"
  }
];

// GET /api/tours
// Retrieve all packages.
router.get("/", (req, res) => {
  res.json({
    success: true,
    count: tours.length,
    data: tours
  });
});

// GET /api/tours/:id
// Retrieve one package by ID.
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid tour ID"
    });
  }

  const tour = tours.find((item) => item.id === id);

  if (!tour) {
    return res.status(404).json({
      success: false,
      message: "Tour not found"
    });
  }

  res.json({
    success: true,
    data: tour
  });
});

module.exports = router;
