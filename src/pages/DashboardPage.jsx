import React, { useState } from 'react';
import { products, dashboardOrders } from '../data/products';
import { Tooltip } from '../components/common/Tooltip';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  Layers, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Truck, 
  FileText, 
  Download, 
  Plus, 
  MoreHorizontal, 
  SlidersHorizontal,
  Sparkles,
  BarChart3,
  Calendar,
  Eye,
  LogOut,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const DashboardPage = ({ user, onLogout, onQuickViewProduct }) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'inventory' | 'concierge'
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ordersList, setOrdersList] = useState(dashboardOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [inventoryList, setInventoryList] = useState(products);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Orders
  const filteredOrders = ordersList.filter(o => {
    const matchesSearch = 
      o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.item.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.location.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Inventory Stock Adjustment
  const handleAdjustStock = (productId, delta) => {
    setInventoryList(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const updated = Math.max(0, p.stock + delta);
          return { ...p, stock: updated };
        }
        return p;
      })
    );
    showToast("Stock allotment updated in global inventory ledger.");
  };

  // Update Order Status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
    showToast(`Order ${orderId} updated to: ${newStatus}`);
  };

  // Mock revenue monthly chart values
  const monthlyData = [
    { month: 'MAY', revenue: 78000, orders: 110 },
    { month: 'JUN', revenue: 92000, orders: 145 },
    { month: 'JUL', revenue: 86000, orders: 130 },
    { month: 'AUG', revenue: 104000, orders: 168 },
    { month: 'SEP', revenue: 118000, orders: 195 },
    { month: 'OCT', revenue: 128450, orders: 214 }
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-16 px-4 md:px-10 max-w-[1600px] mx-auto animate-fadeIn">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border border-[#D4AF37] px-5 py-3 shadow-2xl text-xs font-mono tracking-wider flex items-center space-x-3 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dashboard Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 gap-6">
        <div>
          <div className="flex items-center space-x-3">
            <span className="w-6 h-px bg-[#D4AF37]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#6C6863] dark:text-[#9E9A93]">
              ROGUE EXECUTIVE MANAGEMENT TERMINAL
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-[#1A1A1A] dark:text-[#F9F8F6] mt-1">
            Atelier *Operations*
          </h1>
          <p className="text-xs text-[#6C6863] dark:text-[#9E9A93] font-mono mt-1">
            Logged in as: <strong className="text-[#1A1A1A] dark:text-[#F9F8F6]">{user?.name || 'Director'}</strong> • Paris Central Bureau
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => showToast("Exporting comprehensive quarterly ledger CSV...")}
            className="h-11 px-5 border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 text-xs font-mono uppercase tracking-[0.2em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors flex items-center space-x-2 text-[#1A1A1A] dark:text-[#F9F8F6]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Manifest</span>
          </button>

          <button
            onClick={onLogout}
            className="h-11 px-4 border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider flex items-center space-x-1.5"
            title="Sign Out of Terminal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Sidebar Navigation & Right Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        
        {/* Left Sidebar Menu (3 Cols) */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-[#EBE5DE]/20 dark:bg-[#1A1A1A]/60 border border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 p-4 space-y-2">
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-3.5 text-left text-xs uppercase font-mono tracking-[0.2em] flex items-center justify-between border transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#F9F8F6]'
                  : 'border-transparent text-[#6C6863] dark:text-[#9E9A93] hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                <span>Executive Overview</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-3.5 text-left text-xs uppercase font-mono tracking-[0.2em] flex items-center justify-between border transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#F9F8F6]'
                  : 'border-transparent text-[#6C6863] dark:text-[#9E9A93] hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Orders & Manifest</span>
              </div>
              <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 font-bold">
                {ordersList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full p-3.5 text-left text-xs uppercase font-mono tracking-[0.2em] flex items-center justify-between border transition-all ${
                activeTab === 'inventory'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#F9F8F6]'
                  : 'border-transparent text-[#6C6863] dark:text-[#9E9A93] hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4 text-[#D4AF37]" />
                <span>Inventory & Catalog</span>
              </div>
              <span className="text-[10px] text-[#6C6863] dark:text-[#9E9A93] font-mono">
                {inventoryList.length} Items
              </span>
            </button>

            <button
              onClick={() => setActiveTab('concierge')}
              className={`w-full p-3.5 text-left text-xs uppercase font-mono tracking-[0.2em] flex items-center justify-between border transition-all ${
                activeTab === 'concierge'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#F9F8F6]'
                  : 'border-transparent text-[#6C6863] dark:text-[#9E9A93] hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>VIP Client Desk</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Atelier Status Widget */}
          <div className="p-5 border border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] block">
              Global Workshop Status
            </span>
            <div className="space-y-2.5 text-xs text-[#6C6863] dark:text-[#9E9A93]">
              <div className="flex justify-between items-center">
                <span>Porto Finishing Line:</span>
                <span className="text-emerald-500 font-mono text-[10px] uppercase">Active [99%]</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Naples Tailoring Suite:</span>
                <span className="text-emerald-500 font-mono text-[10px] uppercase">Active [100%]</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Kojima Shuttle Looms:</span>
                <span className="text-emerald-500 font-mono text-[10px] uppercase">Active [95%]</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Dynamic Tab Content (9 Cols) */}
        <main className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* 4 Statistics Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                
                {/* Metric 1 */}
                <div className="p-6 border-t-2 border-[#D4AF37] bg-[#EBE5DE]/20 dark:bg-[#1A1A1A]/60 border-x border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6C6863] dark:text-[#9E9A93]">
                    Gross Atelier Revenue
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-[#F9F8F6]">
                      $128,450
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +24.6%
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#6C6863] dark:text-[#9E9A93] block">
                    vs. Previous Quarter ($103,100)
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="p-6 border-t-2 border-[#1A1A1A] dark:border-[#F9F8F6] bg-[#EBE5DE]/20 dark:bg-[#1A1A1A]/60 border-x border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6C6863] dark:text-[#9E9A93]">
                    Active Acquisitions
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-[#F9F8F6]">
                      214
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +18.2%
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#6C6863] dark:text-[#9E9A93] block">
                    Avg Delivery Time: 2.4 Days
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="p-6 border-t-2 border-[#D4AF37] bg-[#EBE5DE]/20 dark:bg-[#1A1A1A]/60 border-x border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6C6863] dark:text-[#9E9A93]">
                    Average Order Value
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-[#F9F8F6]">
                      $600.23
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +12.0%
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#6C6863] dark:text-[#9E9A93] block">
                    Curated Multi-Piece Bags
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="p-6 border-t-2 border-[#1A1A1A] dark:border-[#F9F8F6] bg-[#EBE5DE]/20 dark:bg-[#1A1A1A]/60 border-x border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6C6863] dark:text-[#9E9A93]">
                    Global Client Base
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-[#F9F8F6]">
                      1,480
                    </span>
                    <span className="text-[10px] font-mono text-[#D4AF37]">
                      98% VIP Return
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#6C6863] dark:text-[#9E9A93] block">
                    34 Key Global Metros
                  </span>
                </div>

              </div>

              {/* Revenue Trends Chart (Interactive Visual SVG / Canvas) */}
              <div className="p-6 md:p-8 border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 bg-[#EBE5DE]/10 dark:bg-[#1A1A1A]/40 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block">
                      FINANCIAL PERFORMANCE
                    </span>
                    <h3 className="font-serif text-2xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                      Quarterly Revenue & Acquisition Trajectory
                    </h3>
                  </div>

                  <div className="flex space-x-2">
                    {['month', 'quarter', 'year'].map(p => (
                      <button
                        key={p}
                        onClick={() => setSelectedPeriod(p)}
                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                          selectedPeriod === p
                            ? 'bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border-transparent'
                            : 'border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[#6C6863]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Bar / Chart Representation */}
                <div className="pt-6">
                  <div className="h-64 flex items-end justify-between space-x-3 md:space-x-8 border-b border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 pb-4">
                    {monthlyData.map((item, idx) => {
                      const heightPercent = (item.revenue / maxRevenue) * 100;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                          
                          {/* Tooltip on hover */}
                          <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1A1A] text-[#F9F8F6] text-[10px] font-mono px-2 py-1 pointer-events-none whitespace-nowrap border border-[#D4AF37] z-20">
                            ${item.revenue.toLocaleString()} USD • {item.orders} Orders
                          </div>

                          {/* Bar Graphic with Gold Sliding Top */}
                          <div 
                            className="w-full bg-[#1A1A1A]/80 dark:bg-[#F9F8F6]/80 group-hover:bg-[#D4AF37] transition-all duration-500 relative overflow-hidden"
                            style={{ height: `${heightPercent}%` }}
                          >
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
                          </div>

                          {/* Month Label */}
                          <span className="text-[10px] font-mono tracking-widest text-[#6C6863] dark:text-[#9E9A93] mt-3">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#6C6863] dark:text-[#9E9A93] pt-3 uppercase">
                    <span>Baseline: $78,000 USD (May 2026)</span>
                    <span className="text-[#D4AF37]">Peak: $128,450 USD (Current Month)</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Feed & Category Demand Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Activity Feed (7 Cols) */}
                <div className="lg:col-span-7 p-6 border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 pb-3">
                    <span className="font-serif text-lg text-[#1A1A1A] dark:text-[#F9F8F6]">
                      Real-Time Atelier Activity
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 uppercase flex items-center">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping mr-1.5" />
                      Live Feed
                    </span>
                  </div>

                  <div className="space-y-3">
                    {ordersList.slice(0, 4).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-[#EBE5DE]/20 dark:bg-[#121212]/50 border border-[#1A1A1A]/5 text-xs">
                        <div className="space-y-0.5">
                          <div className="font-medium text-[#1A1A1A] dark:text-[#F9F8F6] flex items-center space-x-2">
                            <span>{order.customer}</span>
                            <span className="text-[9px] font-mono text-[#D4AF37]">[{order.id}]</span>
                          </div>
                          <p className="text-[11px] text-[#6C6863] dark:text-[#9E9A93]">{order.item}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-semibold text-[#1A1A1A] dark:text-[#F9F8F6]">${order.amount} USD</span>
                          <span className="text-[9px] block text-[#D4AF37] font-mono uppercase">{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Split (5 Cols) */}
                <div className="lg:col-span-5 p-6 border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 space-y-4">
                  <div className="border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 pb-3">
                    <span className="font-serif text-lg text-[#1A1A1A] dark:text-[#F9F8F6]">
                      Category Demand Split
                    </span>
                  </div>

                  <div className="space-y-4 pt-1 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono uppercase mb-1">
                        <span className="text-[#1A1A1A] dark:text-[#F9F8F6]">Heavy Outerwear & Parkas</span>
                        <span className="text-[#D4AF37]">38% ($48.8k)</span>
                      </div>
                      <div className="h-1.5 bg-[#1A1A1A]/10 dark:bg-[#F9F8F6]/10 overflow-hidden">
                        <div className="h-full bg-[#D4AF37] w-[38%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono uppercase mb-1">
                        <span className="text-[#1A1A1A] dark:text-[#F9F8F6]">Tailored Trousers & Denim</span>
                        <span className="text-[#D4AF37]">29% ($37.2k)</span>
                      </div>
                      <div className="h-1.5 bg-[#1A1A1A]/10 dark:bg-[#F9F8F6]/10 overflow-hidden">
                        <div className="h-full bg-[#1A1A1A] dark:bg-[#F9F8F6] w-[29%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono uppercase mb-1">
                        <span className="text-[#1A1A1A] dark:text-[#F9F8F6]">320GSM Heavyweight Tees</span>
                        <span className="text-[#D4AF37]">21% ($26.9k)</span>
                      </div>
                      <div className="h-1.5 bg-[#1A1A1A]/10 dark:bg-[#F9F8F6]/10 overflow-hidden">
                        <div className="h-full bg-[#D4AF37]/80 w-[21%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono uppercase mb-1">
                        <span className="text-[#1A1A1A] dark:text-[#F9F8F6]">Sartorial Poplin Shirts</span>
                        <span className="text-[#D4AF37]">12% ($15.4k)</span>
                      </div>
                      <div className="h-1.5 bg-[#1A1A1A]/10 dark:bg-[#F9F8F6]/10 overflow-hidden">
                        <div className="h-full bg-[#6C6863] w-[12%]" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ORDERS & MANIFEST TABLE */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 bg-[#EBE5DE]/10 dark:bg-[#1A1A1A]/40">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#6C6863] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by client name, order ID, city, or garment..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-transparent border-b border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[#1A1A1A] dark:text-[#F9F8F6] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C6863]">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-xs px-3 py-1.5 text-[#1A1A1A] dark:text-[#F9F8F6] focus:outline-none font-mono"
                  >
                    <option value="all" className="bg-[#F9F8F6] dark:bg-[#1A1A1A]">All Manifests</option>
                    <option value="Delivered" className="bg-[#F9F8F6] dark:bg-[#1A1A1A]">Delivered</option>
                    <option value="In Transit" className="bg-[#F9F8F6] dark:bg-[#1A1A1A]">In Transit</option>
                    <option value="Atelier Processing" className="bg-[#F9F8F6] dark:bg-[#1A1A1A]">Atelier Processing</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EBE5DE]/40 dark:bg-[#121212] border-b border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 font-mono text-[10px] uppercase tracking-widest text-[#6C6863] dark:text-[#9E9A93]">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">VIP Client</th>
                      <th className="p-4">Destination</th>
                      <th className="p-4">Silhouettes</th>
                      <th className="p-4">Valuation</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1A]/10 dark:divide-[#F9F8F6]/10">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-[#6C6863] font-serif italic text-sm">
                          No order manifests match your search parameters.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr 
                          key={order.id}
                          className="hover:bg-[#EBE5DE]/20 dark:hover:bg-[#121212]/40 transition-colors cursor-pointer group"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="p-4 font-mono font-bold text-[#D4AF37]">{order.id}</td>
                          <td className="p-4">
                            <span className="font-serif font-medium text-[#1A1A1A] dark:text-[#F9F8F6] block">{order.customer}</span>
                            <span className="text-[10px] text-[#6C6863] font-mono">{order.email}</span>
                          </td>
                          <td className="p-4 text-[#6C6863] dark:text-[#9E9A93] font-mono text-[11px]">{order.location}</td>
                          <td className="p-4 text-[#1A1A1A] dark:text-[#F9F8F6] max-w-xs truncate">{order.item}</td>
                          <td className="p-4 font-mono font-bold text-[#1A1A1A] dark:text-[#F9F8F6]">${order.amount}</td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider border ${
                              order.status === 'Delivered' 
                                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                                : order.status === 'In Transit'
                                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10'
                                : 'border-[#1A1A1A]/40 text-[#6C6863] bg-gray-500/10'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                              }}
                              className="px-3 py-1 border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[10px] font-mono uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Order Detail Modal / Pop-up */}
              {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/80 backdrop-blur-sm animate-fadeIn">
                  <div className="relative w-full max-w-xl bg-[#F9F8F6] dark:bg-[#1A1A1A] border border-[#D4AF37]/50 p-6 md:p-8 space-y-6 shadow-2xl">
                    <div className="flex justify-between items-start border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                          MANIFEST AUDIT
                        </span>
                        <h3 className="font-serif text-2xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                          Acquisition #{selectedOrder.id}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-[#6C6863] hover:text-[#D4AF37] text-sm font-mono"
                      >
                        [ESC]
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#6C6863] block">Client Name</span>
                        <strong className="text-[#1A1A1A] dark:text-[#F9F8F6] font-serif text-sm">{selectedOrder.customer}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#6C6863] block">Destination</span>
                        <span className="font-mono text-[#1A1A1A] dark:text-[#F9F8F6]">{selectedOrder.location}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#6C6863] block">Order Valuation</span>
                        <strong className="font-mono text-base text-[#D4AF37]">${selectedOrder.amount} USD</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#6C6863] block">Dispatch Date</span>
                        <span className="font-mono text-[#1A1A1A] dark:text-[#F9F8F6]">{selectedOrder.date}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#EBE5DE]/30 dark:bg-[#121212]/60 border-l-2 border-[#D4AF37] text-xs">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C6863] block mb-1">Acquired Garments:</span>
                      <p className="text-[#1A1A1A] dark:text-[#F9F8F6] font-medium">{selectedOrder.item}</p>
                    </div>

                    {/* Change Status Action */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C6863] block">
                        Update Fulfillment Phase:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {['Atelier Processing', 'In Transit', 'Delivered'].map(st => (
                          <button
                            key={st}
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, st)}
                            className={`py-2 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                              selectedOrder.status === st
                                ? 'bg-[#D4AF37] text-[#1A1A1A] border-[#D4AF37] font-bold'
                                : 'border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[#6C6863] hover:border-[#D4AF37]'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="px-6 py-2.5 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] text-xs uppercase font-mono tracking-widest"
                      >
                        Close Inspector
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: INVENTORY & CATALOG ALLOTMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block">
                    ARCHIVAL CATALOG INVENTORY
                  </span>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                    Global Batch Allotments ({inventoryList.length} Pieces)
                  </h3>
                </div>

                <span className="text-xs font-mono text-[#6C6863] dark:text-[#9E9A93]">
                  All Perspectives Loaded
                </span>
              </div>

              {/* Inventory Product Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inventoryList.map((item) => (
                  <div 
                    key={item.id}
                    className="p-5 border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 bg-[#EBE5DE]/15 dark:bg-[#1A1A1A]/40 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex space-x-4">
                      <div className="w-20 h-24 bg-[#EBE5DE]/30 overflow-hidden border border-[#1A1A1A]/10 flex-shrink-0">
                        <img
                          src={item.images[0]?.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                          {item.category} • {item.images.length} Photos
                        </span>
                        <h4 className="font-serif text-lg text-[#1A1A1A] dark:text-[#F9F8F6] line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#6C6863] dark:text-[#9E9A93] italic font-serif line-clamp-1">
                          {item.tagline}
                        </p>
                        <div className="mt-2 text-xs font-mono text-[#1A1A1A] dark:text-[#F9F8F6]">
                          Valuation: <strong>${item.price} USD</strong>
                        </div>
                      </div>
                    </div>

                    {/* Stock Control Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C6863]">
                          Atelier Units:
                        </span>
                        <span className="font-mono font-bold text-sm text-[#1A1A1A] dark:text-[#F9F8F6]">
                          {item.stock}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAdjustStock(item.id, -1)}
                          className="px-2.5 py-1 border border-[#1A1A1A]/20 hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors text-xs font-mono"
                          title="Decrease Stock"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleAdjustStock(item.id, 1)}
                          className="px-2.5 py-1 border border-[#1A1A1A]/20 hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors text-xs font-mono"
                          title="Increase Stock"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onQuickViewProduct(item)}
                          className="ml-2 px-3 py-1 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] text-[10px] uppercase font-mono tracking-wider"
                        >
                          Inspect Photos
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: CLIENT CONCIERGE & VIP DESK */}
          {activeTab === 'concierge' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block">
                  VIP CONCIERGE DESK
                </span>
                <h3 className="font-serif text-2xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                  Private Client Inquiries & Tailoring Appointments
                </h3>
              </div>

              <div className="p-6 border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 bg-[#EBE5DE]/20 dark:bg-[#1A1A1A]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-serif text-lg text-[#1A1A1A] dark:text-[#F9F8F6]">
                      Private Salon Appointment Requests (3 Pending)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]">
                    Priority 1 Dispatch
                  </span>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-3 border border-[#1A1A1A]/10 bg-white/50 dark:bg-black/20 flex justify-between items-center">
                    <div>
                      <strong className="text-[#1A1A1A] dark:text-[#F9F8F6] block font-serif">Baroness Catherine de Montmirail</strong>
                      <span className="text-[10px] text-[#6C6863] font-mono">Paris Place Vendôme Salon • Bespoke Cashmere Fitting</span>
                    </div>
                    <button 
                      onClick={() => showToast("Appointment confirmed with client bureau.")}
                      className="px-3 py-1 bg-[#D4AF37] text-[#1A1A1A] font-mono text-[10px] uppercase font-semibold"
                    >
                      Confirm Booking
                    </button>
                  </div>

                  <div className="p-3 border border-[#1A1A1A]/10 bg-white/50 dark:bg-black/20 flex justify-between items-center">
                    <div>
                      <strong className="text-[#1A1A1A] dark:text-[#F9F8F6] block font-serif">Siddharth Oberoi</strong>
                      <span className="text-[10px] text-[#6C6863] font-mono">Virtual Bespoke Sizing Session • Kurabo Selvedge Trousers</span>
                    </div>
                    <button 
                      onClick={() => showToast("Virtual consultation invite dispatched.")}
                      className="px-3 py-1 bg-[#D4AF37] text-[#1A1A1A] font-mono text-[10px] uppercase font-semibold"
                    >
                      Dispatch Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
