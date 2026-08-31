import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

const payload = await getPayload({ config: payloadConfig })

const email = process.env.ADMIN_EMAIL || 'admin@centroxy.com'
const newPassword = process.env.NEW_PASSWORD || 'Centroxy@2026'

const found = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
})

if (!found.totalDocs) {
  console.log('No user found with that email')
  process.exit(1)
}

await payload.update({
  collection: 'users',
  id: found.docs[0].id,
  data: { password: newPassword },
})

console.log(`Password reset for ${email} — new password: ${newPassword}`)
process.exit(0)
