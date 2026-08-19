import type { CollectionConfig } from 'payload'

export const Employees: CollectionConfig = {
  slug: 'employees',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'department', 'designation', 'photo'],
    group: 'Portal',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'department',
      type: 'text',
    },
    {
      name: 'designation',
      type: 'text',
    },
    {
      name: 'joinedAt',
      type: 'date',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
