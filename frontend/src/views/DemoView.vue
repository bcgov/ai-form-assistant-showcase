<script setup lang="ts">
import { onMounted } from 'vue';

import DemoDisclaimerBanner from '@/components/DemoDisclaimerBanner.vue';
import WebForm from '@/components/WebForm.vue';
import WebFormResources from '@/components/WebFormResources.vue';
import { useConfigStore } from '@/store';

// Set per environment via FRONTEND_AIFAS_CLIENT_SRC
const AIFAS_CLIENT_SRC: string | undefined = useConfigStore().getConfig?.aifasClientSrc;

onMounted(() => {
  if (!AIFAS_CLIENT_SRC) {
    // eslint-disable-next-line no-console
    console.error('AI Form Assistant client source is not configured (FRONTEND_AIFAS_CLIENT_SRC)');
    return;
  }

  if (!document.querySelector(`script[src="${AIFAS_CLIENT_SRC}"]`)) {
    const script = document.createElement('script');
    script.src = AIFAS_CLIENT_SRC;
    script.type = 'module';
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div ai-mode>
    <div class="full-bleed -mt-6">
      <DemoDisclaimerBanner />
    </div>

    <div class="pb-30">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-8">
          <WebForm />
        </div>
        <div class="col-span-3 col-start-10 mt-22">
          <WebFormResources />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.full-bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
