const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 3000

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")))

// Serve CSS and JS files
app.use("/css", express.static(path.join(__dirname, "styles")))
app.use("/js", express.static(path.join(__dirname, "scripts")))

// API endpoints for mock data
app.get("/api/dashboard-stats", (req, res) => {
  res.json({
    totalInventory: 15420 + Math.floor(Math.random() * 100 - 50),
    lowStockItems: 23 + Math.floor(Math.random() * 5 - 2),
    pendingOrders: 45 + Math.floor(Math.random() * 10 - 5),
    activeSuppliers: 127,
    monthlySpend: 284500,
    costSavings: 12.5,
    efficiency: 94.2 + (Math.random() - 0.5) * 4,
    onTimeDelivery: 87.8 + (Math.random() - 0.5) * 6,
  })
})

app.get("/api/inventory", (req, res) => {
  const inventoryData = [
    {
      id: "INV001",
      name: "Steel Pipes",
      category: "Raw Materials",
      stock: 150,
      reorderLevel: 200,
      status: "Low Stock",
      supplier: "MetalCorp Ltd",
      lastUpdated: "2024-01-15",
      trend: "down",
      value: 45000,
      location: "Warehouse A",
    },
    {
      id: "INV002",
      name: "Electronic Components",
      category: "Components",
      stock: 850,
      reorderLevel: 300,
      status: "In Stock",
      supplier: "TechSupply Co",
      lastUpdated: "2024-01-14",
      trend: "up",
      value: 125000,
      location: "Warehouse B",
    },
    {
      id: "INV003",
      name: "Packaging Materials",
      category: "Packaging",
      stock: 45,
      reorderLevel: 100,
      status: "Critical",
      supplier: "PackPro Inc",
      lastUpdated: "2024-01-15",
      trend: "down",
      value: 8500,
      location: "Warehouse C",
    },
    {
      id: "INV004",
      name: "Safety Equipment",
      category: "Safety",
      stock: 320,
      reorderLevel: 150,
      status: "In Stock",
      supplier: "SafeGuard Ltd",
      lastUpdated: "2024-01-13",
      trend: "stable",
      value: 32000,
      location: "Warehouse A",
    },
    {
      id: "INV005",
      name: "Industrial Tools",
      category: "Tools",
      stock: 89,
      reorderLevel: 120,
      status: "Low Stock",
      supplier: "ToolMaster Pro",
      lastUpdated: "2024-01-15",
      trend: "down",
      value: 15600,
      location: "Warehouse B",
    },
  ]
  res.json(inventoryData)
})

app.get("/api/orders", (req, res) => {
  const orderData = [
    {
      id: "PO001",
      supplier: "MetalCorp Ltd",
      items: "Steel Pipes, Fittings",
      amount: 15420,
      status: "In Transit",
      orderDate: "2024-01-10",
      expectedDelivery: "2024-01-18",
      progress: 75,
      priority: "High",
    },
    {
      id: "PO002",
      supplier: "TechSupply Co",
      items: "Electronic Components",
      amount: 8750,
      status: "Delivered",
      orderDate: "2024-01-08",
      expectedDelivery: "2024-01-15",
      progress: 100,
      priority: "Medium",
    },
    {
      id: "PO003",
      supplier: "PackPro Inc",
      items: "Packaging Materials",
      amount: 3200,
      status: "Processing",
      orderDate: "2024-01-12",
      expectedDelivery: "2024-01-20",
      progress: 25,
      priority: "Critical",
    },
    {
      id: "PO004",
      supplier: "SafeGuard Ltd",
      items: "Safety Equipment",
      amount: 12800,
      status: "Approved",
      orderDate: "2024-01-14",
      expectedDelivery: "2024-01-22",
      progress: 10,
      priority: "Medium",
    },
    {
      id: "PO005",
      supplier: "ToolMaster Pro",
      items: "Industrial Tools",
      amount: 6500,
      status: "Pending",
      orderDate: "2024-01-15",
      expectedDelivery: "2024-01-25",
      progress: 5,
      priority: "Low",
    },
  ]
  res.json(orderData)
})

app.get("/api/suppliers", (req, res) => {
  const supplierData = [
    {
      id: "SUP001",
      name: "MetalCorp Ltd",
      category: "Raw Materials",
      rating: 4.8,
      orders: 156,
      contact: "john@metalcorp.com",
      phone: "+1-555-0123",
      status: "Active",
      performance: 92,
      location: "Detroit, MI",
    },
    {
      id: "SUP002",
      name: "TechSupply Co",
      category: "Components",
      rating: 4.6,
      orders: 89,
      contact: "sales@techsupply.com",
      phone: "+1-555-0124",
      status: "Active",
      performance: 88,
      location: "Austin, TX",
    },
    {
      id: "SUP003",
      name: "PackPro Inc",
      category: "Packaging",
      rating: 4.2,
      orders: 67,
      contact: "orders@packpro.com",
      phone: "+1-555-0125",
      status: "Active",
      performance: 85,
      location: "Portland, OR",
    },
    {
      id: "SUP004",
      name: "SafeGuard Ltd",
      category: "Safety",
      rating: 4.9,
      orders: 134,
      contact: "info@safeguard.com",
      phone: "+1-555-0126",
      status: "Active",
      performance: 96,
      location: "Chicago, IL",
    },
    {
      id: "SUP005",
      name: "ToolMaster Pro",
      category: "Tools",
      rating: 4.4,
      orders: 78,
      contact: "support@toolmaster.com",
      phone: "+1-555-0127",
      status: "Under Review",
      performance: 78,
      location: "Denver, CO",
    },
  ]
  res.json(supplierData)
})

// Serve the main HTML file for all routes (SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Supply Chain Management System is running on http://localhost:${PORT}`)
  console.log(`📊 Dashboard: http://localhost:${PORT}`)
  console.log(`📦 API Endpoints:`)
  console.log(`   - GET /api/dashboard-stats`)
  console.log(`   - GET /api/inventory`)
  console.log(`   - GET /api/orders`)
  console.log(`   - GET /api/suppliers`)
  console.log(`\n✨ Ready to optimize your supply chain!`)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 Shutting down gracefully...")
  process.exit(0)
})

process.on("SIGINT", () => {
  console.log("\n👋 Shutting down gracefully...")
  process.exit(0)
})
