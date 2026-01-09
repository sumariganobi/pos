'use client'

import PageHeader from '@/components/PageHeader'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useEffect, useState } from 'react'

interface TransactionItem {
  id: string
  quantity: number
  price: number
  product: {
    name: string
    sku: string
  }
}

interface Transaction {
  id: string
  invoiceNumber: string
  total: number
  subtotal: number
  tax: number
  paymentMethod: string
  paymentAmount: number
  changeAmount: number
  createdAt: string
  user: { name: string }
  items: TransactionItem[]
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    filterTransactions()
  }, [transactions, startDate, endDate])

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions')
    if (res.ok) {
      const data = await res.json()
      setTransactions(data)
    }
  }

  const filterTransactions = () => {
    let filtered = [...transactions]

    if (startDate) {
      filtered = filtered.filter(t => 
        new Date(t.createdAt) >= new Date(startDate + 'T00:00:00')
      )
    }

    if (endDate) {
      filtered = filtered.filter(t => 
        new Date(t.createdAt) <= new Date(endDate + 'T23:59:59')
      )
    }

    setFilteredTransactions(filtered)
  }

  const clearFilters = () => {
    setStartDate('')
    setEndDate('')
  }

  const paymentMethodColors: Record<string, string> = {
    CASH: 'bg-green-100 text-green-700',
    CARD: 'bg-blue-100 text-blue-700',
    QRIS: 'bg-purple-100 text-purple-700',
    TRANSFER: 'bg-orange-100 text-orange-700'
  }

  const displayTransactions = startDate || endDate ? filteredTransactions : transactions

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <PageHeader 
        title="Riwayat Transaksi" 
        subtitle={`${displayTransactions.length} transaksi tercatat`}
      />

      {/* Filter Section */}
      <div className="card p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
          <div className="flex-1 w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Dari Tanggal</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field w-full"
            />
          </div>
          <div className="flex-1 w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Sampai Tanggal</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field w-full"
            />
          </div>
          {(startDate || endDate) && (
            <button
              onClick={clearFilters}
              className="btn-secondary flex items-center gap-2 w-full sm:w-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset Filter
            </button>
          )}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Invoice</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Kasir</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Pembayaran</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">
                      {startDate || endDate ? 'Tidak ada transaksi pada periode ini' : 'Belum ada transaksi'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {startDate || endDate ? 'Coba ubah filter tanggal' : 'Transaksi akan muncul di sini'}
                    </p>
                  </td>
                </tr>
              ) : (
                displayTransactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-gray-900 font-semibold">
                        {transaction.invoiceNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {format(new Date(transaction.createdAt), 'dd MMM yyyy', { locale: id })}
                      <br />
                      <span className="text-xs text-gray-400">
                        {format(new Date(transaction.createdAt), 'HH:mm', { locale: id })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{transaction.user.name}</td>
                    <td className="px-4 py-3 text-sm font-bold text-blue-600">
                      Rp {transaction.total.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        paymentMethodColors[transaction.paymentMethod] || 'bg-gray-100 text-gray-700'
                      }`}>
                        {transaction.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {transaction.items.length} item
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTransaction && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSelectedTransaction(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Detail Transaksi</h2>
                  <p className="text-sm text-gray-600 font-mono mt-1">{selectedTransaction.invoiceNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Transaction Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Tanggal & Waktu</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {format(new Date(selectedTransaction.createdAt), 'dd MMMM yyyy, HH:mm', { locale: id })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Kasir</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedTransaction.user.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Metode Pembayaran</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      paymentMethodColors[selectedTransaction.paymentMethod] || 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedTransaction.paymentMethod}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Item</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedTransaction.items.length} item</p>
                  </div>
                </div>

                {/* Items List */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Produk yang Dibeli</h3>
                  <div className="space-y-2">
                    {selectedTransaction.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{item.product.name}</p>
                          <p className="text-xs text-gray-600 font-mono">{item.product.sku}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-blue-600">
                            Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold text-gray-900">
                      Rp {selectedTransaction.subtotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pajak (10%):</span>
                    <span className="font-semibold text-gray-900">
                      Rp {selectedTransaction.tax.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-blue-600">
                      Rp {selectedTransaction.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-gray-600">Jumlah Bayar:</span>
                    <span className="font-semibold text-gray-900">
                      Rp {selectedTransaction.paymentAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kembalian:</span>
                    <span className="font-semibold text-green-600">
                      Rp {selectedTransaction.changeAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
