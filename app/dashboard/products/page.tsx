'use client'

import PageHeader from '@/components/PageHeader'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  category?: { name: string }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    description: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    if (res.ok) {
      const data = await res.json()
      setProducts(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      setShowForm(false)
      setFormData({ name: '', sku: '', price: '', stock: '', description: '' })
      fetchProducts()
    }
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-6">
        <div className="flex-1">
          <PageHeader 
            title="Manajemen Produk" 
            subtitle={`${products.length} produk tersedia`}
          />
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2 flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showForm ? "M6 18L18 6M6 6l12 12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
          </svg>
          {showForm ? 'Tutup' : 'Tambah Produk'}
        </button>
      </div>

      {showForm && (
        <div className="card p-4 mb-6 animate-slide-in">
          <h2 className="text-base font-semibold mb-4">Tambah Produk Baru</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Produk</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                placeholder="Contoh: Nasi Goreng"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                className="input-field"
                placeholder="Contoh: FD001"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="input-field"
                placeholder="25000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Stok</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="input-field"
                placeholder="50"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="input-field"
                rows={2}
                placeholder="Deskripsi produk (opsional)"
              />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary">
                Simpan Produk
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Harga</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Stok</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Kategori</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-sm text-gray-500">Belum ada produk</p>
                    <p className="text-xs text-gray-400 mt-1">Klik tombol "Tambah Produk" untuk memulai</p>
                  </td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">{product.sku}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-blue-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        product.stock < 10 
                          ? 'bg-red-100 text-red-700' 
                          : product.stock < 20 
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.category?.name || '-'}
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
