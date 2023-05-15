<template>
  <span class="label" v-bind:style="{ backgroundColor: boxColor }">
    {{ label?.name }}
  </span>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    label: { type: Object as PropType<Category> },
  },
  mounted() {
    this.label;
  },
  computed: {
    boxColor(): string {
      const opacy = 50;
      const defaultColor = "#e6edf0";
      return this.label?.color ? "#" + this.label?.color + opacy : defaultColor;
    },
  },
};
</script>

<style scoped src="./../assets/css/transactions-table.css"></style>
