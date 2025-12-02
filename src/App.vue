<script setup>
import { inject } from "vue";
import AppHeader from './components/AppHeader.vue'

const kc = inject("keycloak");
</script>
<template>
    <div>
        <AppHeader />
        <router-view />
    </div>
</template>
