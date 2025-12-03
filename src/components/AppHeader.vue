<template>
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <router-link to="/">AI Form Assistant</router-link>
            </div>
            <div class="auth-buttons">
                <button v-if="!kc.authenticated" @click="kc.login()">Login</button>
                <button v-else @click="kc.logout()">Logout</button>
            </div>
        </div>

        <nav class="nav-container">
            <ul class="nav-links">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/demo">Demo</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { inject } from "vue";

const kc = inject("keycloak"); // assumes Keycloak instance is provided in app
</script>

<style scoped>
.header {
    width: 100%;
    background-color: #003366;
    color: #fff;

}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #FCBA19;
    padding: 1rem 2rem;
}

.logo a {
    color: #fff;
    font-weight: bold;
    font-size: 1.2rem;
    text-decoration: none;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 1rem;
    padding: .5rem 2rem;
}

.nav-links a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
}

.nav-links ::v-deep(.router-link-active),
.nav-links a:hover {
    text-decoration: underline;
}

.header button {
    color: white;
    border: 2px solid #fff;
}

</style>
