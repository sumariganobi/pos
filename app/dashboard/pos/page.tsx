'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
}

interface CartItem extends Product {
  quantity: number
}

export default function POSPage() {
  const { data: session } = useSession()
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [search, setSearch] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      if (existing.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    setShowCart(true)
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ))
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax
  const payment = parseFloat(paymentAmount) || 0
  const change = payment - total

  const handleCheckout = async () => {
    if (payment < total) {
      alert('Pembayaran kurang!')
      return
    }

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          subtotal,
          tax,
          total,
          paymentAmount: payment,
          changeAmount: change,
          paymentMethod: 'CASH'
        })
      })

      if (res.ok) {
        alert('Transaksi berhasil! ✅')
        setCart([])
        setPaymentAmount('')
        setShowCart(false)
        fetchProducts()
      }
    } catch (error) {
      alert('Transaksi gagal!')
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Products Section */}
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kasir</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari produk atau SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="card p-4 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-3 flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm mb-1 truncate">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.sku}</p>
              <p className="text-lg font-bold text-blue-600">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
              <p className={`text-xs mt-1 ${product.stock < 10 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                Stok: {product.stock}
              </p>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500">Produk tidak ditemukan</p>
          </div>
        )}
      </div>

      {/* Mobile Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="lg:hidden fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-30"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {cart.length}
          </span>
        )}
      </button>

      {/* Cart Overlay (Mobile) */}
      {showCart && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowCart(false)}
        />
      )}

      {/* Cart Section */}
      <div className={`
        fixed lg:static inset-y-0 right-0 z-40
        w-full sm:w-96 bg-white shadow-2xl lg:shadow-xl flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${showCart ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Cart Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold">Keranjang</h2>
          <button
            onClick={() => setShowCart(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500">Keranjang kosong</p>
              <p className="text-sm text-gray-400 mt-1">Tambahkan produk untuk memulai</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="card p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-red-50 rounded text-red-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-blue-600">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pajak (10%):</span>
                <span className="font-semibold">Rp {tax.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span className="text-blue-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Bayar</label>
              <input
                type="number"
                placeholder="0"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="input-field text-lg font-semibold"
              />
            </div>

            {payment > 0 && (
              <div className={`p-4 rounded-xl ${change >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Kembalian:</span>
                  <span className={`text-xl font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Rp {Math.max(0, change).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || payment < total}
              className="w-full btn-primary py-4 text-lg font-semibold"
            >
              Bayar Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
