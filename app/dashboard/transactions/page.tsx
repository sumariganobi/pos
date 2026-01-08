'use client'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useEffect, useState } from 'react'

interface Transaction {
  id: string
  invoiceNumber: string
  total: number
  paymentMethod: string
  createdAt: string
  user: { name: string }
  items: any[]
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions')
    if (res.ok) {
      const data = await res.json()
      setTransactions(data)
    }
  }

  const paymentMethodColors: Record<string, string> = {
    CASH: 'bg-green-100 text-green-700',
    CARD: 'bg-blue-100 text-blue-700',
    QRIS: 'bg-purple-100 text-purple-700',
    TRANSFER: 'bg-orange-100 text-orange-700'
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Riwayat Transaksi</h1>
        <p className="text-xs text-gray-600 mt-0.5">{transactions.length} transaksi tercatat</p>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">Belum ada transaksi</p>
                    <p className="text-xs text-gray-400 mt-1">Transaksi akan muncul di sini</p>
                  </td>
                </tr>
              ) : (
                transactions.map(transaction => (
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
