// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Demo from "./views/Demo.vue";
import keycloak from "./services/keycloak";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/demo",
    name: "Demo",
    component: Demo,
    meta: { requiresAuth: true }, // protected
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !keycloak.authenticated) {
    // Only redirect to login for protected routes
    return keycloak.login({ redirectUri: window.location.href });
  }
  next();
});

export default router;