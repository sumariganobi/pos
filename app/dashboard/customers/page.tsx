'use client'

import PageHeader from '@/components/PageHeader'
import { useEffect, useState } from 'react'

interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  totalSpent: number
  totalVisits: number
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    const res = await fetch('/api/customers')
    if (res.ok) {
      const data = await res.json()
      setCustomers(data)
    }
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-6">
        <div className="flex-1">
          <PageHeader 
            title="Data Pelanggan" 
            subtitle={`${customers.length} pelanggan terdaftar`}
          />
        </div>
        <button className="btn-primary flex items-center gap-2 flex-shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Tambah Pelanggan
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Telepon</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Total Belanja</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Kunjungan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p className="text-sm text-gray-500">Belum ada data pelanggan</p>
                    <p className="text-xs text-gray-400 mt-1">Tambahkan pelanggan untuk memulai</p>
                  </td>
                </tr>
              ) : (
                customers.map(customer => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{customer.email || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{customer.phone || '-'}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">
                      Rp {customer.totalSpent.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {customer.totalVisits}x
                      </span>
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
