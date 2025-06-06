import { createColumnHelper, type ColumnDef } from '@tanstack/vue-table'
import type { Person } from './data/schema'
import { Checkbox } from '#components'
import DataTableColumnHeader from './DataTableColumnHeader.vue'

const columnHelper = createColumnHelper<Person>()

export const columns: ColumnDef<Person>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'firstName',
    header: () => 'FirstName',
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('firstName')),
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'lastName',
    cell: (info) => info.getValue(),
    header: () => 'Last Name',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'age',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Age' }),
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'visits',
    header: () => 'Visits',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
]
