<script setup lang="ts">
import { Message } from '@/lib/primevue';
import { storeToRefs } from 'pinia';
import { useConfigStore } from '@/store';

// Store
const { getConfig } = storeToRefs(useConfigStore());
</script>
<template>
  <Message
    v-if="getConfig?.notificationBanner"
    severity="warn"
  >
    {{ getConfig?.notificationBanner }}
  </Message>
  <h2>What is this all about?</h2>

  <p class="mt-6">
    We're here to tell you about the AI Form Assistant, an innovative solution designed to enhance your form-filling
    experience using artificial intelligence. The Form Assistant is part of the Common AI Services initiative, helping
    program areas leverage AI.
  </p>
  <h3>What does the Form Assistant do?</h3>
  <ul>
    <li>Guide people through completion of a webform</li>
    <li>Provide a conversational interface for completing a webform</li>
    <li>Offer AI-powered suggestions and auto-completions</li>
    <li>Integrate with external data and tools</li>
  </ul>

  <!--
  # Onboarding Tenants to AI Form Assist


## Create a RAG knowledge resource

* Upload documents to Storage > Storage Account > Blob Storage
* To manage AI Search service, connect to Azure Portal using UDP [via Bastion](https://portal.azure.com/#@bcgov.onmicrosoft.com/resource/subscriptions/56358ccd-64df-4586-98cc-f472e4c7323f/resourceGroups/d94cca-dev-networking/providers/Microsoft.Compute/virtualMachines/css-ai-dev-window/bastionHost)
* In [AI Search service](https://portal.azure.com/#@bcgov.onmicrosoft.com/resource/subscriptions/56358ccd-64df-4586-98cc-f472e4c7323f/resourceGroups/d94cca-dev-networking/providers/Microsoft.Search/searchServices/css-ai-dev-aisearch/overview), click on 'import data' and follow wizard:
  * Choose Azure Blob Storage
  * RAG
  * choose a storage account and blob container (pre-configured)
  * Authenticate using managed identity > System-assigned
  * choose LLM service (eg: openai)
  * choose embedding (eg: text-embedding-3-large)

* After the wizard has created the data source, index, skillset, go into the new index, click 'edit JSON' and set the parameters.configuration.excecutionEnvironment: "private"
* Go into the new indexer and 'Run' (repeat as required)

## Configure nr-ai-form API to use resources for a specific tenant
-->
  <router-link
    to="/demo"
    class="primary"
  >
    Try the demo
  </router-link>
</template>
