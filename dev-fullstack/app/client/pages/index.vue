<template>
  <div class="container mx-auto w-full p-4">
    <h1  class="text-3xl font-bold underline">Transactions</h1>
    <transactions-table />
  </div>
</template>

<script>
import TransactionsTable from '../components/TransactionsTable.vue';

export default {
  components: {
    TransactionsTable
  },
};
</script>
