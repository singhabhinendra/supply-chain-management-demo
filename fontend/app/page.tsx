"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Users,
  BarChart3,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
  Moon,
  Sun,
  Zap,
  Activity,
  Target,
  Globe,
  Layers,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Gauge,
  Workflow,
} from "lucide-react"

// Enhanced mock data with more dynamic properties
const dashboardStats = {
  totalInventory: 15420,
  lowStockItems: 23,
  pendingOrders: 45,
  activeSuppliers: 127,
  monthlySpend: 284500,
  costSavings: 12.5,
  efficiency: 94.2,
  onTimeDelivery: 87.8,
}

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

// Animated Counter Component
function AnimatedCounter({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Real-time Activity Feed
function ActivityFeed() {
  const [activities, setActivities] = useState([
    { id: 1, type: "order", message: "New order PO006 created", time: "2 min ago", icon: Plus },
    { id: 2, type: "delivery", message: "Order PO002 delivered successfully", time: "5 min ago", icon: CheckCircle },
    {
      id: 3,
      type: "alert",
      message: "Low stock alert for Packaging Materials",
      time: "8 min ago",
      icon: AlertTriangle,
    },
    { id: 4, type: "supplier", message: "New supplier TechCorp added", time: "12 min ago", icon: Users },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: "update",
        message: "Inventory levels updated",
        time: "Just now",
        icon: Activity,
      }
      setActivities((prev) => [newActivity, ...prev.slice(0, 4)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Live Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors animate-in slide-in-from-right duration-300"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <activity.icon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Interactive Chart Component
function InteractiveChart({
  title,
  data,
  color = "blue",
}: {
  title: string
  data: number[]
  color?: string
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const maxValue = Math.max(...data)

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">{title}</h4>
      <div className="flex items-end gap-2 h-32">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`w-full rounded-t transition-all duration-300 ${
                color === "blue"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : color === "green"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-purple-500 hover:bg-purple-600"
              } ${hoveredIndex === index ? "opacity-100 scale-105" : "opacity-80"}`}
              style={{ height: `${(value / maxValue) * 100}%` }}
            />
            {hoveredIndex === index && (
              <div className="absolute -mt-8 bg-black text-white text-xs px-2 py-1 rounded animate-in fade-in duration-200">
                {value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SupplyChainDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [realTimeData, setRealTimeData] = useState(dashboardStats)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        totalInventory: prev.totalInventory + Math.floor(Math.random() * 10 - 5),
        lowStockItems: Math.max(0, prev.lowStockItems + Math.floor(Math.random() * 3 - 1)),
        pendingOrders: Math.max(0, prev.pendingOrders + Math.floor(Math.random() * 3 - 1)),
        efficiency: Math.min(100, Math.max(80, prev.efficiency + (Math.random() - 0.5) * 2)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "critical":
        return "destructive"
      case "low stock":
        return "secondary"
      case "in stock":
        return "default"
      case "delivered":
        return "default"
      case "in transit":
        return "secondary"
      case "processing":
        return "secondary"
      case "approved":
        return "default"
      case "pending":
        return "outline"
      case "active":
        return "default"
      case "under review":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "in transit":
        return <Truck className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with Dark Mode Toggle */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Supply Chain Management System
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Optimize procurement and inventory management with real-time insights
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              <Moon className="h-4 w-4" />
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Zap className="h-4 w-4 mr-2" />
              Quick Actions
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm border shadow-lg">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Package className="h-4 w-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Truck className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="suppliers"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Suppliers
            </TabsTrigger>
            <TabsTrigger
              value="procurement"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Workflow className="h-4 w-4 mr-2" />
              Procurement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Enhanced KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Inventory Items</CardTitle>
                  <Package className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <AnimatedCounter value={realTimeData.totalInventory} />
                  </div>
                  <p className="text-xs opacity-80 flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3" />
                    +2.5% from last month
                  </p>
                </CardContent>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              </Card>

              <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Low Stock Alerts</CardTitle>
                  <AlertTriangle className="h-5 w-5 opacity-80 animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <AnimatedCounter value={realTimeData.lowStockItems} />
                  </div>
                  <p className="text-xs opacity-80 mt-2">Requires immediate attention</p>
                </CardContent>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              </Card>

              <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Pending Orders</CardTitle>
                  <Clock className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <AnimatedCounter value={realTimeData.pendingOrders} />
                  </div>
                  <p className="text-xs opacity-80 mt-2">Awaiting processing</p>
                </CardContent>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              </Card>

              <Card className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">System Efficiency</CardTitle>
                  <Gauge className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <AnimatedCounter value={realTimeData.efficiency} suffix="%" />
                  </div>
                  <p className="text-xs opacity-80 flex items-center gap-1 mt-2">
                    <Target className="h-3 w-3" />
                    Optimal performance
                  </p>
                </CardContent>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              </Card>
            </div>

            {/* Interactive Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Performance Metrics */}
              <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-500" />
                    Performance Analytics
                  </CardTitle>
                  <CardDescription>Real-time system performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InteractiveChart title="Monthly Orders" data={[45, 52, 38, 67, 73, 58, 62]} color="blue" />
                    <InteractiveChart title="Cost Savings" data={[12, 15, 18, 22, 19, 25, 28]} color="green" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="text-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                      <div className="text-2xl font-bold text-blue-600">
                        <AnimatedCounter value={dashboardStats.onTimeDelivery} suffix="%" />
                      </div>
                      <div className="text-sm text-blue-700">On-Time Delivery</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                      <div className="text-2xl font-bold text-green-600">
                        <AnimatedCounter value={dashboardStats.costSavings} suffix="%" />
                      </div>
                      <div className="text-sm text-green-700">Cost Reduction</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
                      <div className="text-2xl font-bold text-purple-600">
                        <AnimatedCounter value={dashboardStats.activeSuppliers} />
                      </div>
                      <div className="text-sm text-purple-700">Active Suppliers</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer">
                      <div className="text-2xl font-bold text-orange-600">
                        <AnimatedCounter value={284} prefix="$" suffix="K" />
                      </div>
                      <div className="text-sm text-orange-700">Monthly Spend</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live Activity Feed */}
              <ActivityFeed />
            </div>

            {/* Enhanced Alerts */}
            <Card className="bg-white/70 backdrop-blur-sm border shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Critical Alerts & Notifications
                </CardTitle>
                <CardDescription>Real-time system alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-red-200 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="flex justify-between items-center">
                    <div>
                      <strong className="text-red-700">Critical Stock Level:</strong> Packaging Materials (INV003) has
                      reached critical level with only 45 units remaining.
                    </div>
                    <Badge variant="destructive" className="animate-pulse">
                      URGENT
                    </Badge>
                  </AlertDescription>
                </Alert>

                <Alert className="border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <AlertDescription className="flex justify-between items-center">
                    <div>
                      <strong className="text-orange-700">Delayed Shipment:</strong> Order PO001 from MetalCorp Ltd is
                      experiencing a 2-day delay.
                    </div>
                    <Badge variant="secondary">DELAYED</Badge>
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-200 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="flex justify-between items-center">
                    <div>
                      <strong className="text-green-700">Order Delivered:</strong> Electronic Components (PO002) has
                      been successfully delivered and received.
                    </div>
                    <Badge className="bg-green-500">COMPLETED</Badge>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-blue-500" />
                      Inventory Management
                    </CardTitle>
                    <CardDescription>
                      Track stock levels and manage inventory items with real-time updates
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 backdrop-blur-sm border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <Button variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white/80">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="grid gap-4">
                  {inventoryData.map((item) => (
                    <Card
                      key={item.id}
                      className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white/80 backdrop-blur-sm"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Globe className="h-3 w-3" />
                                {item.category} • {item.location}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold">{item.stock}</div>
                              <div className="text-xs text-muted-foreground">Units</div>
                            </div>

                            <div className="w-32">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Stock Level</span>
                                <span className="text-muted-foreground">Min: {item.reorderLevel}</span>
                              </div>
                              <Progress value={(item.stock / (item.reorderLevel * 2)) * 100} className="h-3" />
                            </div>

                            <div className="flex items-center gap-2">
                              {getTrendIcon(item.trend)}
                              <Badge variant={getStatusColor(item.status)} className="animate-pulse">
                                {getStatusIcon(item.status)}
                                <span className="ml-1">{item.status}</span>
                              </Badge>
                            </div>

                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="hover:bg-blue-50"
                                    onClick={() => setSelectedItem(item)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <Package className="h-5 w-5" />
                                      {item.name} Details
                                    </DialogTitle>
                                    <DialogDescription>Comprehensive inventory item information</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid grid-cols-2 gap-6 py-4">
                                    <div className="space-y-4">
                                      <div>
                                        <label className="text-sm font-medium">Item ID</label>
                                        <p className="text-lg">{item.id}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Category</label>
                                        <p className="text-lg">{item.category}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Current Stock</label>
                                        <p className="text-2xl font-bold text-blue-600">{item.stock} units</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Reorder Level</label>
                                        <p className="text-lg">{item.reorderLevel} units</p>
                                      </div>
                                    </div>
                                    <div className="space-y-4">
                                      <div>
                                        <label className="text-sm font-medium">Supplier</label>
                                        <p className="text-lg">{item.supplier}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Location</label>
                                        <p className="text-lg">{item.location}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Total Value</label>
                                        <p className="text-2xl font-bold text-green-600">
                                          ${item.value.toLocaleString()}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Last Updated</label>
                                        <p className="text-lg">{item.lastUpdated}</p>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button size="sm" variant="outline" className="hover:bg-green-50">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-blue-500" />
                      Order Tracking & Management
                    </CardTitle>
                    <CardDescription>Monitor procurement orders and shipments in real-time</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    New Order
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {orderData.map((order) => (
                    <Card
                      key={order.id}
                      className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01] bg-white/80 backdrop-blur-sm"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                              {order.id.slice(-2)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg flex items-center gap-2">
                                {order.id}
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(order.priority)}`} />
                              </h3>
                              <p className="text-sm text-muted-foreground">{order.supplier}</p>
                              <p className="text-sm font-medium">{order.items}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">${order.amount.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">Order Value</div>
                            </div>

                            <div className="w-40">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span className="text-muted-foreground">{order.progress}%</span>
                              </div>
                              <Progress value={order.progress} className="h-3" />
                              <div className="text-xs text-muted-foreground mt-1">
                                Expected: {order.expectedDelivery}
                              </div>
                            </div>

                            <Badge variant={getStatusColor(order.status)} className="animate-pulse">
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </Badge>

                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="hover:bg-blue-50">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="hover:bg-green-50">
                                <Truck className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      Supplier Network Management
                    </CardTitle>
                    <CardDescription>Manage supplier relationships and performance metrics</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Supplier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {supplierData.map((supplier) => (
                    <Card
                      key={supplier.id}
                      className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01] bg-white/80 backdrop-blur-sm"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                              {supplier.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{supplier.name}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Globe className="h-3 w-3" />
                                {supplier.category} • {supplier.location}
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1 text-sm">
                                  <Mail className="h-3 w-3" />
                                  {supplier.contact}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {supplier.phone}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-lg font-bold">
                                <span className="text-yellow-500">★</span>
                                {supplier.rating}
                              </div>
                              <div className="text-xs text-muted-foreground">Rating</div>
                            </div>

                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{supplier.orders}</div>
                              <div className="text-xs text-muted-foreground">Total Orders</div>
                            </div>

                            <div className="w-32">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Performance</span>
                                <span className="text-muted-foreground">{supplier.performance}%</span>
                              </div>
                              <Progress value={supplier.performance} className="h-3" />
                            </div>

                            <Badge variant={getStatusColor(supplier.status)}>{supplier.status}</Badge>

                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="hover:bg-blue-50">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="hover:bg-green-50">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procurement" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-blue-500" />
                    Purchase Order Workflow
                  </CardTitle>
                  <CardDescription>Automated purchase order creation and approval process</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-white font-semibold">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Request Creation</h4>
                        <p className="text-sm text-muted-foreground">Create purchase requisition</p>
                      </div>
                      <Badge className="bg-blue-500 animate-bounce">Active</Badge>
                    </div>

                    <div className="flex items-center gap-3 p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Manager Approval</h4>
                        <p className="text-sm text-muted-foreground">Awaiting manager review</p>
                      </div>
                      <Badge variant="secondary" className="animate-pulse">
                        Pending
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer opacity-60">
                      <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Purchase Order</h4>
                        <p className="text-sm text-muted-foreground">Generate and send PO</p>
                      </div>
                      <Badge variant="outline">Waiting</Badge>
                    </div>

                    <div className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer opacity-60">
                      <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Delivery Tracking</h4>
                        <p className="text-sm text-muted-foreground">Monitor shipment status</p>
                      </div>
                      <Badge variant="outline">Waiting</Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Purchase Request
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    Procurement Analytics
                  </CardTitle>
                  <CardDescription>Real-time procurement metrics and performance insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Order Processing Time</span>
                        <span className="text-sm text-muted-foreground font-bold">3.2 days avg</span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Supplier Performance</span>
                        <span className="text-sm text-muted-foreground font-bold">92% on-time</span>
                      </div>
                      <Progress value={92} className="h-3" />
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Cost Optimization</span>
                        <span className="text-sm text-muted-foreground font-bold">12.5% savings</span>
                      </div>
                      <Progress value={85} className="h-3" />
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Approval Efficiency</span>
                        <span className="text-sm text-muted-foreground font-bold">1.8 days avg</span>
                      </div>
                      <Progress value={68} className="h-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 cursor-pointer">
                      <div className="text-3xl font-bold">
                        <AnimatedCounter value={47} prefix="$" suffix="K" />
                      </div>
                      <div className="text-sm opacity-90">Monthly Savings</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer">
                      <div className="text-3xl font-bold">
                        <AnimatedCounter value={156} />
                      </div>
                      <div className="text-sm opacity-90">Orders This Month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
