//  Global state
let currentTab = "dashboard"
let darkMode = false
let dashboardData = {}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Hide loading screen after 2 seconds and show main app
  setTimeout(() => {
    document.getElementById("loading").style.display = "none"
    document.getElementById("main-app").classList.remove("hidden")
    initializeApp()
  }, 2000)
})

function initializeApp() {
  setupEventListeners()
  loadDashboardData()
  startRealTimeUpdates()
  populateActivityFeed()

  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const tab = e.currentTarget.dataset.tab
      switchTab(tab)
    })
  })

  // Dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle")
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode)
  }
}

function switchTab(tabName) {
  // Update active tab button
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active")
  })
  const activeTab = document.querySelector(`[data-tab="${tabName}"]`)
  if (activeTab) {
    activeTab.classList.add("active")
  }

  // Show/hide tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.add("hidden")
  })
  const tabContent = document.getElementById(`${tabName}-tab`)
  if (tabContent) {
    tabContent.classList.remove("hidden")
  }

  currentTab = tabName

  // Load tab-specific data
  switch (tabName) {
    case "inventory":
      loadInventoryData()
      break
    case "orders":
      loadOrdersData()
      break
    case "suppliers":
      loadSuppliersData()
      break
  }
}

function toggleDarkMode() {
  darkMode = !darkMode
  document.body.classList.toggle("dark", darkMode)

  const icon = document.querySelector("#darkModeToggle i")
  if (icon) {
    if (darkMode) {
      icon.setAttribute("data-lucide", "moon")
    } else {
      icon.setAttribute("data-lucide", "sun")
    }
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }
}

async function loadDashboardData() {
  try {
    const response = await fetch("/api/dashboard-stats")
    dashboardData = await response.json()
    updateDashboardUI()
  } catch (error) {
    console.error("Error loading dashboard data:", error)
    // Use fallback data if API fails
    dashboardData = {
      totalInventory: 15420,
      lowStockItems: 23,
      pendingOrders: 45,
      efficiency: 94.2,
    }
    updateDashboardUI()
  }
}

function updateDashboardUI() {
  // Animate counters
  animateCounter("total-inventory", dashboardData.totalInventory)
  animateCounter("low-stock", dashboardData.lowStockItems)
  animateCounter("pending-orders", dashboardData.pendingOrders)
  animateCounter("efficiency", dashboardData.efficiency, "%")
}

function animateCounter(elementId, targetValue, suffix = "") {
  const element = document.getElementById(elementId)
  if (!element) return

  const startValue = 0
  const duration = 2000
  const startTime = Date.now()

  function updateCounter() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const currentValue = Math.floor(startValue + (targetValue - startValue) * progress)

    element.textContent = currentValue.toLocaleString() + suffix

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }

  updateCounter()
}

async function loadInventoryData() {
  try {
    const response = await fetch("/api/inventory")
    const inventory = await response.json()
    renderInventoryList(inventory)
  } catch (error) {
    console.error("Error loading inventory data:", error)
  }
}

function renderInventoryList(inventory) {
  const container = document.getElementById("inventory-list")
  if (!container) return

  container.innerHTML = inventory
    .map(
      (item) => `
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg card-hover">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                        ${item.name.charAt(0)}
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg">${item.name}</h3>
                        <p class="text-sm text-gray-600">${item.category} • ${item.location}</p>
                    </div>
                </div>
                <div class="flex items-center gap-6">
                    <div class="text-center">
                        <div class="text-2xl font-bold">${item.stock}</div>
                        <div class="text-xs text-gray-500">Units</div>
                    </div>
                    <div class="w-32">
                        <div class="flex justify-between text-sm mb-1">
                            <span>Stock Level</span>
                            <span class="text-gray-500">Min: ${item.reorderLevel}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="progress-bar" style="width: ${Math.min((item.stock / (item.reorderLevel * 2)) * 100, 100)}%"></div>
                        </div>
                    </div>
                    <span class="status-badge ${getStatusClass(item.status)}">
                        ${item.status}
                    </span>
                    <div class="flex gap-2">
                        <button class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm transition-colors">
                            View
                        </button>
                        <button class="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm transition-colors">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

async function loadOrdersData() {
  try {
    const response = await fetch("/api/orders")
    const orders = await response.json()
    renderOrdersList(orders)
  } catch (error) {
    console.error("Error loading orders data:", error)
  }
}

function renderOrdersList(orders) {
  const container = document.getElementById("orders-list")
  if (!container) return

  container.innerHTML = orders
    .map(
      (order) => `
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg card-hover">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        ${order.id.slice(-2)}
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg flex items-center gap-2">
                            ${order.id}
                            <div class="w-2 h-2 rounded-full ${getPriorityColor(order.priority)}"></div>
                        </h3>
                        <p class="text-sm text-gray-600">${order.supplier}</p>
                        <p class="text-sm font-medium">${order.items}</p>
                    </div>
                </div>
                <div class="flex items-center gap-6">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-600">$${order.amount.toLocaleString()}</div>
                        <div class="text-xs text-gray-500">Order Value</div>
                    </div>
                    <div class="w-40">
                        <div class="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span class="text-gray-500">${order.progress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="progress-bar" style="width: ${order.progress}%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Expected: ${order.expectedDelivery}</div>
                    </div>
                    <span class="status-badge ${getStatusClass(order.status)}">
                        ${order.status}
                    </span>
                    <div class="flex gap-2">
                        <button class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm transition-colors">
                            Track
                        </button>
                        <button class="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm transition-colors">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

async function loadSuppliersData() {
  try {
    const response = await fetch("/api/suppliers")
    const suppliers = await response.json()
    renderSuppliersList(suppliers)
  } catch (error) {
    console.error("Error loading suppliers data:", error)
  }
}

function renderSuppliersList(suppliers) {
  const container = document.getElementById("suppliers-list")
  if (!container) return

  container.innerHTML = suppliers
    .map(
      (supplier) => `
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg card-hover">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                        ${supplier.name.charAt(0)}
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg">${supplier.name}</h3>
                        <p class="text-sm text-gray-600">${supplier.category} • ${supplier.location}</p>
                        <div class="flex items-center gap-4 mt-2">
                            <div class="flex items-center gap-1 text-sm">
                                📧 ${supplier.contact}
                            </div>
                            <div class="flex items-center gap-1 text-sm text-gray-500">
                                📞 ${supplier.phone}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-6">
                    <div class="text-center">
                        <div class="flex items-center gap-1 text-lg font-bold">
                            <span class="text-yellow-500">★</span>
                            ${supplier.rating}
                        </div>
                        <div class="text-xs text-gray-500">Rating</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-blue-600">${supplier.orders}</div>
                        <div class="text-xs text-gray-500">Total Orders</div>
                    </div>
                    <div class="w-32">
                        <div class="flex justify-between text-sm mb-1">
                            <span>Performance</span>
                            <span class="text-gray-500">${supplier.performance}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="progress-bar" style="width: ${supplier.performance}%"></div>
                        </div>
                    </div>
                    <span class="status-badge ${getStatusClass(supplier.status)}">
                        ${supplier.status}
                    </span>
                    <div class="flex gap-2">
                        <button class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm transition-colors">
                            Contact
                        </button>
                        <button class="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm transition-colors">
                            Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case "critical":
      return "status-critical"
    case "low stock":
      return "status-low"
    case "in stock":
    case "delivered":
    case "active":
      return "status-good"
    default:
      return "status-low"
  }
}

function getPriorityColor(priority) {
  switch (priority.toLowerCase()) {
    case "critical":
      return "bg-red-500"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

function populateActivityFeed() {
  const activities = [
    { icon: "➕", message: "New order PO006 created", time: "2 min ago", type: "order" },
    { icon: "✅", message: "Order PO002 delivered successfully", time: "5 min ago", type: "delivery" },
    { icon: "⚠️", message: "Low stock alert for Packaging Materials", time: "8 min ago", type: "alert" },
    { icon: "👥", message: "New supplier TechCorp added", time: "12 min ago", type: "supplier" },
  ]

  const container = document.getElementById("activity-feed")
  if (!container) return

  container.innerHTML = activities
    .map(
      (activity) => `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-in">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                ${activity.icon}
            </div>
            <div class="flex-1">
                <p class="text-sm font-medium">${activity.message}</p>
                <p class="text-xs text-gray-500">${activity.time}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

function startRealTimeUpdates() {
  // Update dashboard stats every 5 seconds
  setInterval(async () => {
    if (currentTab === "dashboard") {
      await loadDashboardData()
    }
  }, 5000)

  // Add new activity every 10 seconds
  setInterval(() => {
    const newActivities = [
      { icon: "📊", message: "Inventory levels updated", time: "Just now" },
      { icon: "🚚", message: "Shipment PO007 dispatched", time: "Just now" },
      { icon: "💰", message: "Cost savings target achieved", time: "Just now" },
      { icon: "📈", message: "Performance metrics updated", time: "Just now" },
    ]

    const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]

    const container = document.getElementById("activity-feed")
    if (!container) return

    const newActivityHTML = `
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-in">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                    ${randomActivity.icon}
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium">${randomActivity.message}</p>
                    <p class="text-xs text-gray-500">${randomActivity.time}</p>
                </div>
            </div>
        `

    container.insertAdjacentHTML("afterbegin", newActivityHTML)

    // Keep only the latest 5 activities
    const activities = container.children
    if (activities.length > 5) {
      container.removeChild(activities[activities.length - 1])
    }
  }, 10000)
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
})

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp)
} else {
  initializeApp()
}
