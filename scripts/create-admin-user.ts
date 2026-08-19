import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const email = process.env.ADMIN_EMAIL || 'admin@centroxy.com'
const password = process.env.ADMIN_PASSWORD || 'Centroxy@2026'

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
})

if (existing.totalDocs > 0) {
  console.log(`User ${email} already exists, skipping.`)
} else {
  await payload.create({
    collection: 'users',
    data: { email, password },
  })
  console.log(`Created admin user: ${email}`)
}

process.exit(0)
