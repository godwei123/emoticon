import type {SVGAttributes} from "vue";

const template = (svg:any) => `<script lang="ts" setup>
import { inject } from "vue";
import type { SVGAttributes } from "vue";
import providerKey from "../providerKey";

const context = providerKey ? inject<SVGAttributes>(providerKey) : {};
</script>

<template>
  ${svg}
</template>`;

export default template;
