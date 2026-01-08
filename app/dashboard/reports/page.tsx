'use client'

import { useEffect, useState } from 'react'

interface ReportData {
  totalSales: number
  totalTransactions: number
  averageTransaction: number
  topProducts: Array<{
    name: string
    quantity: number
    revenue: number
  }>
}

export default function ReportsPage() {
  const [period, setPeriod] = useState('today')
  const [report, setReport] = useState<ReportData>({
    totalSales: 0,
    totalTransactions: 0,
    averageTransaction: 0,
    topProducts: []
  })

  useEffect(() => {
    fetchReport()
  }, [period])

  const fetchReport = async () => {
    const res = await fetch(`/api/reports?period=${period}`)
    if (res.ok) {
      const data = await res.json()
      setReport(data)
    }
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Laporan Penjualan</h1>
          <p className="text-xs text-gray-600 mt-0.5">Analisis performa penjualan</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="input-field w-full sm:w-auto"
        >
          <option value="today">Hari Ini</option>
          <option value="week">Minggu Ini</option>
          <option value="month">Bulan Ini</option>
          <option value="year">Tahun Ini</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-600">Total Penjualan</div>
              <div className="text-xl font-bold text-green-600">
                Rp {report.totalSales.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-600">Total Transaksi</div>
              <div className="text-xl font-bold text-blue-600">{report.totalTransactions}</div>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-600">Rata-rata</div>
              <div className="text-xl font-bold text-purple-600">
                Rp {report.averageTransaction.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Produk Terlaris
        </h2>
        <div className="space-y-2">
          {report.topProducts.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm text-gray-500">Belum ada data</p>
              <p className="text-xs text-gray-400 mt-1">Data akan muncul setelah ada transaksi</p>
            </div>
          ) : (
            report.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-600">{product.quantity} terjual</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">
                    Rp {product.revenue.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
