// Script to generate NEXTAUTH_SECRET
const crypto = require('crypto')

const secret = crypto.randomBytes(32).toString('base64')

console.log('\n=================================')
console.log('NEXTAUTH_SECRET Generated:')
console.log('=================================')
console.log(secret)
console.log('=================================\n')
console.log('Copy this value and add it to:')
console.log('1. Vercel Dashboard → Settings → Environment Variables')
console.log('2. Add as: NEXTAUTH_SECRET = ' + secret)
console.log('\n')
