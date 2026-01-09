'use client'

import PageHeader from '@/components/PageHeader'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface Stats {
  todaySales: number
  todayTransactions: number
  totalProducts: number
  lowStock: number
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats>({
    todaySales: 0,
    todayTransactions: 0,
    totalProducts: 0,
    lowStock: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const statCards = [
    {
      title: 'Penjualan Hari Ini',
      value: `Rp ${stats.todaySales.toLocaleString('id-ID')}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Transaksi Hari Ini',
      value: stats.todayTransactions.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Total Produk',
      value: stats.totalProducts.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Stok Menipis',
      value: stats.lowStock.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ]

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header with Mobile Menu Button */}
      <PageHeader 
        title="Dashboard" 
        subtitle={
          <>
            Selamat datang kembali, <span className="font-semibold text-blue-600">{session?.user?.name}</span> 👋
          </>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="card p-4 hover:scale-105 transition-transform cursor-pointer animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${card.bgGradient} mb-3`}>
              <div className={`text-transparent bg-clip-text bg-gradient-to-br ${card.gradient}`}>
                {card.icon}
              </div>
            </div>
            <div className="text-xs text-gray-600 mb-1">{card.title}</div>
            <div className={`text-xl lg:text-2xl font-bold bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="card p-4">
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="/dashboard/pos"
              className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-all active:scale-95"
            >
              <svg className="w-6 h-6 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs font-medium text-gray-700">Buka Kasir</span>
            </a>
            <a
              href="/dashboard/products"
              className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-all active:scale-95"
            >
              <svg className="w-6 h-6 text-purple-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-xs font-medium text-gray-700">Tambah Produk</span>
            </a>
          </div>
        </div>

        <div className="card p-4">
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips Hari Ini
          </h2>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
              <span className="text-lg">💡</span>
              <div>
                <p className="text-xs font-medium text-gray-900">Cek Stok Produk</p>
                <p className="text-xs text-gray-600">Ada {stats.lowStock} produk dengan stok menipis</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
              <span className="text-lg">📊</span>
              <div>
                <p className="text-xs font-medium text-gray-900">Lihat Laporan</p>
                <p className="text-xs text-gray-600">Analisis penjualan minggu ini</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-4">
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Aktivitas Terbaru
        </h2>
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm text-gray-500">Belum ada aktivitas hari ini</p>
          <p className="text-xs text-gray-400 mt-1">Mulai transaksi pertama Anda</p>
        </div>
      </div>
    </div>
  )
}
