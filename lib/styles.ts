// Reusable Tailwind class combinations

export const styles = {
  // Cards
  card: 'bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow',
  
  // Buttons
  btnPrimary: 'bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
  btnSecondary: 'bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 active:scale-95 transition-all',
  btnDanger: 'bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 active:scale-95 transition-all',
  
  // Inputs
  input: 'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
  
  // Badges
  badge: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
  badgeGreen: 'bg-green-100 text-green-700',
  badgeBlue: 'bg-blue-100 text-blue-700',
  badgeRed: 'bg-red-100 text-red-700',
  badgeYellow: 'bg-yellow-100 text-yellow-700',
  badgePurple: 'bg-purple-100 text-purple-700',
  
  // Tables
  table: 'w-full',
  tableHead: 'bg-gray-50 border-b border-gray-100',
  tableTh: 'px-4 py-3 text-left text-xs font-semibold text-gray-700',
  tableTd: 'px-4 py-3 text-sm',
  tableRow: 'hover:bg-gray-50 transition-colors',
}
