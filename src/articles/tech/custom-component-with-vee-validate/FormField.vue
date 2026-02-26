<template>
  <div class="inline-flex flex-col gap-y-10px">
    <div class="flex gap-x-8px items-center">
      <slot name="label" :id="name">
        <label v-if="label" :for="name" class="text-h6 flex items-center gap-x-5px">
          {{ label }}
          <span v-if="required" class="text-orange-dark">*</span>
        </label>
      </slot>

      <slot name="label-append" />
    </div>

    <slot :id="name" :model="field.value" />

    <p v-if="!hideErrorMessage && hasErrorMessage" class="text-12px text-orange !m-0">{{ field.errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useField } from 'vee-validate';

interface Props {
  label?: string;
  name: string;
  required?: boolean;
  error?: boolean;
  hideErrorMessage?: boolean;
}

const { name, label, required = false, hideErrorMessage = false } = defineProps<Props>();

//

const field = useField(() => name);
const hasErrorMessage = computed(() => !!field.errorMessage.value);
</script>
