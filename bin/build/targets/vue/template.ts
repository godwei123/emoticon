const template = (svg) => `<script lang="ts" setup>
import { inject } from "vue";
import type { SVGAttributes } from "vue";
import providerKey from "../providerKey";

const context = inject<SVGAttributes>(providerKey);
</script>

<template>
  ${svg}
</template>`;

export default template;
