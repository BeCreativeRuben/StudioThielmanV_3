// Simple script to hash a password for admin user
// Usage: node scripts/hash-password.js <password>

import bcrypt from 'bcryptjs'

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/hash-password.js <password>')
  process.exit(1)
}

bcrypt.hash(password, 10).then(hash => {
  console.log('\nHashed password:')
  console.log(hash)
  console.log('\nAdd this to your .env file as ADMIN_PASSWORD_HASH\n')
})
