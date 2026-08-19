import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: 'devadmin@centroxy.com' } },
  limit: 1,
})

if (existing.totalDocs === 0) {
  await payload.create({
    collection: 'users',
    data: { email: 'devadmin@centroxy.com', password: 'Centroxy@2026' },
  })
  console.log('created devadmin@centroxy.com')
} else {
  console.log('devadmin already exists')
}

const emp = await payload.find({
  collection: 'employees',
  where: { name: { equals: 'Test Employee One' } },
  limit: 1,
})

if (emp.totalDocs === 0) {
  await payload.create({
    collection: 'employees',
    data: {
      name: 'Test Employee One',
      email: 'one@centroxy.com',
      department: 'Engineering',
      designation: 'Software Engineer',
    },
  })
  await payload.create({
    collection: 'employees',
    data: {
      name: 'Test Employee Two',
      email: 'two@centroxy.com',
      department: 'Product',
      designation: 'UX Designer',
    },
  })
  console.log('created test employees')
} else {
  console.log('test employees already exist')
}

process.exit(0)
