<script setup lang="ts">
import { Button, Message } from '@/lib/primevue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import WebForm from '@/components/WebForm.vue';

import { useConfigStore, useHelloStore } from '@/store';

// Store
const helloStore = useHelloStore();
const { getConfig } = storeToRefs(useConfigStore());
const { getHello } = storeToRefs(helloStore);

const AIFAS_CLIENT_SRC = '/aifas-client-scripts/client.js';

onMounted(() => {
  if (!document.querySelector(`script[src="${AIFAS_CLIENT_SRC}"]`)) {
    const script = document.createElement('script');
    script.src = AIFAS_CLIENT_SRC;
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div ai-mode>
    <Message
      v-if="getConfig?.notificationBanner"
      severity="warn"
    >
      {{ getConfig?.notificationBanner }}
    </Message>

    <WebForm />

    <div class="flex flex-col api-test">
      <div class="flex">
        <h4 class="font-bold">
          {{ getHello }}
        </h4>
      </div>
      <div class="flex">
        <Button @click="helloStore.helloWorld()">Make an API call to backend</Button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.api-test {
  display: none !important;
}
</style>
