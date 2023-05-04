<template>
  <div class="container mx-auto">
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead
                class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"
              >
                <tr>
                  <th scope="col" class="px-6 py-4">Reference</th>
                  <th scope="col" class="px-6 py-4">Category</th>
                  <th scope="col" class="px-6 py-4">Date</th>
                  <th scope="col" class="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, id) in data"
                  :key="id"
                  class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  @click="$router.push(`/transaction/${item.id}`)"
                >
                  <td class="whitespace-nowrap px-6 py-4">
                    {{ formatText(item.reference) }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <span class="label">
                      {{ item.category.name }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">{{ formatDate(item.date) }}</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {{ item.amount }} {{ item.currency }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import moment from "moment";
import VueRouter from "vue-router";

declare interface Category {
  name: string;
  color?: string;
}

declare interface Transaction {
  id: string;
  reference: string;
  category: Category;
  currency: string;
  amount: number;
  date: Date;
}

export default {
  data() {
    return {
      data: [] as Transaction[],
    };
  },

  methods: {
    formatDate(dateString: string | Date) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    formatText(text: string | null) {
      return text ? text : "-";
    },
  },
  //todo find a way to pass the item to the :style binding
  computed: {
    boxColor(item: Transaction) {
      return item.category.color || "#2196f3";
    },
  },

  async mounted() {
    const response = await axios.post("http://localhost:4000/", {
      query: `
          query Accounts($take: Int, $orderBy: [TransactionOrderByWithRelationInput!], $skip: Int) {
            transactions(take: $take, orderBy: $orderBy, skip: $skip) {
              id
              reference
              amount
              currency
              date
              account {
                id
                name
                bank
              }
              category {
                color
                id
                name
              }
            }
          }
        `,
      variables: {
        take: 30,
        orderBy: [{ id: "asc" }],
        skip: 0,
      },
    });
    this.data = response.data.data.transactions;
  },
};
</script>
<style scoped src="./../assets/css/transactions-table.css"></style>
