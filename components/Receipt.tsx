'use client'

interface ReceiptProps {
  transaction: {
    invoiceNumber: string
    createdAt: string
    items: Array<{
      productName: string
      quantity: number
      price: number
      subtotal: number
    }>
    subtotal: number
    tax: number
    total: number
    paymentAmount: number
    changeAmount: number
  }
}

export default function Receipt({ transaction }: ReceiptProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">POS SYSTEM</h1>
        <p className="text-sm">Jl. Contoh No. 123</p>
        <p className="text-sm">Telp: 021-12345678</p>
      </div>

      <div className="border-t border-b border-dashed py-2 mb-2 text-sm">
        <div className="flex justify-between">
          <span>Invoice:</span>
          <span className="font-mono">{transaction.invoiceNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Tanggal:</span>
          <span>{new Date(transaction.createdAt).toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div className="mb-2">
        {transaction.items.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between text-sm">
              <span>{item.productName}</span>
              <span>Rp {item.price.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</span>
              <span>Rp {item.subtotal.toLocaleString('id-ID')}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed pt-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>Rp {transaction.subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between">
          <span>Pajak (10%):</span>
          <span>Rp {transaction.tax.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total:</span>
          <span>Rp {transaction.total.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Bayar:</span>
          <span>Rp {transaction.paymentAmount.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between">
          <span>Kembali:</span>
          <span>Rp {transaction.changeAmount.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div className="text-center mt-4 text-sm">
        <p>Terima kasih atas kunjungan Anda!</p>
        <p className="text-xs text-gray-600 mt-2">Barang yang sudah dibeli tidak dapat dikembalikan</p>
      </div>

      <div className="mt-4 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Print Struk
        </button>
      </div>
    </div>
  )
}
