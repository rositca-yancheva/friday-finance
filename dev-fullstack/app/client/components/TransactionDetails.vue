<template>
  <div class="container mx-auto">
    <div class="flex object-left-top py-8">
      <div>
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Reference</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ formatText(data.reference) }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Amount</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ data.amount }} {{ data.currency }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Category</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
             <LabeledText :label="data.category" />
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Date</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ formatDate(data.date) }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Account</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ data.account?.name }}, {{ data.account?.bank }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import moment from "moment";
import LabeledText from "./LabeledText.vue";

export default {
    data() {
        return {
            data: {} as Transaction,
            positive: Boolean,
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
    async mounted() {
        const id = this.$route.params.id;
        const response = await axios.post("http://localhost:4000/", {
            query: ` 
      query ExampleQuery($where: TransactionWhereInput) {
        findFirstTransaction(where: $where) {
            id
            reference
            amount
            date
            account {
                bank
                name
            }
            category {
                color
                name
            }
            currency
        }
    }`,
            variables: {
                where: {
                    id: {
                        equals: id,
                    },
                },
            },
        });
        this.data = response.data.data.findFirstTransaction;
    },
    components: { LabeledText }
};
</script>
