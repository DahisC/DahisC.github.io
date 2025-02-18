<template>
  <div>I m a Emoji</div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}

const props = defineProps<Props>();

console.log(props.name);
</script>
