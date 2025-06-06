<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { Person } from './data/schema'
import { computed } from 'vue'
// import { priorities, statuses } from './data/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import { Icon } from '#components'

interface DataTableToolbarProps {
  table: Table<Person>
}

const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: h(Icon, { name: 'i-radix-icons-question-mark-circled' }),
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: h(Icon, { name: 'i-radix-icons-circle' }),
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: h(Icon, { name: 'i-radix-icons-stopwatch' }),
  },
  {
    value: 'done',
    label: 'Done',
    icon: h(Icon, { name: 'i-radix-icons-check-circled' }),
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: h(Icon, { name: 'i-radix-icons-cross-circled' }),
  },
]

const priorities = [
  {
    value: 'low',
    label: 'Low',
    icon: h(Icon, { name: 'i-radix-icons-arrow-down' }),
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: h(Icon, { name: 'i-radix-icons-arrow-right' }),
  },
  {
    value: 'high',
    label: 'High',
    icon: h(Icon, { name: 'i-radix-icons-arrow-up' }),
  },
]

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input placeholder="Filter firstName..."
        :model-value="(table.getColumn('firstName')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]" @input="table.getColumn('firstName')?.setFilterValue($event.target.value)" />
      <DataTableFacetedFilter v-if="table.getColumn('status')" :column="table.getColumn('status')" title="Status"
        :options="statuses" />
      <!-- <DataTableFacetedFilter v-if="table.getColumn('priority')" :column="table.getColumn('priority')" title="Priority"
        :options="priorities" /> -->

      <Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="table.resetColumnFilters()">
        Reset
        <Icon name="i-radix-icons-cross-2" class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
