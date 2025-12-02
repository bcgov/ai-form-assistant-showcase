<template>
  <h1>Demo</h1>

  <p>Your name: {{ kc.tokenParsed?.preferred_username }}</p>
  <p>Your token expires at: {{ new Date(kc.tokenParsed?.exp * 1000).toLocaleString() }}</p>
</template>

<script setup>
import { inject } from "vue";
const kc = inject("keycloak");
</script>
