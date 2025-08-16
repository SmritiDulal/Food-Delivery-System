const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock data
let restaurants = [
  { id: 1, name: "Pizza Palace", menu: [
      { id: 101, name: "Margherita", price: 12 },
      { id: 102, name: "Pepperoni", price: 15 }
    ]
  },
  { id: 2, name: "Sushi House", menu: [
      { id: 201, name: "Salmon Roll", price: 10 },
      { id: 202, name: "Tuna Roll", price: 11 }
    ]
  }
];

let orders = [];

// Routes
app.get("/restaurants", (req, res) => {
  res.json(restaurants);
});

app.get("/menu/:restaurantId", (req, res) => {
  const restaurant = restaurants.find(r => r.id == req.params.restaurantId);
  if (restaurant) res.json(restaurant.menu);
  else res.status(404).json({ error: "Restaurant not found" });
});

app.post("/order", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    items: req.body.items,
    status: "Pending"
  };
  orders.push(newOrder);
  res.json(newOrder);
});

app.get("/order/:id", (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (order) res.json(order);
  else res.status(404).json({ error: "Order not found" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));