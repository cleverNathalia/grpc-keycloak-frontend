<template>
  <v-app-bar app :color="headerName" dark>
    <div class="d-flex align-center">
      <header></header>
    </div>
    <v-spacer></v-spacer>
    <v-btn v-on:click="keycloak.logout()" color="white" outlined>
      LOGOUT
      <v-icon class="pl-2">fas fa-sign-out-alt</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang='ts'>
import Vue from "vue";
import Keycloak from "../../node_modules/keycloak-js/dist/keycloak";

export default Vue.extend({
  name: "Nav",
  data: () => ({}),
  props: {
    headerName: String,
    keycloak: Keycloak
  }
});
</script>
