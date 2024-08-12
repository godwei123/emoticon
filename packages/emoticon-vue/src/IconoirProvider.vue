<script setup lang="ts">
import { provide } from 'vue';
import type { SVGAttributes } from 'vue';
import providerKey from './providerKey';
interface Props {
  iconProps: SVGAttributes;
}
const props = defineProps<Props>();
provide(providerKey, props.iconProps);
</script>
<template>
  <slot />
</template>
