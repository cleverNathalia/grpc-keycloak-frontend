<template>
  <v-container class="mt-12">
    <v-layout wrap>
      <v-card class="mx-auto" width="600">
        <v-card-title class="headline">Admin</v-card-title>
        <v-list disabled>
          <v-list-item-group v-model="item">
            <!-- LOOP THROUGH BOTH ARRAYS FROM APP.VUE TO DISPLAY DATA FROM BACKEND -->
            <v-list-item v-for="(item, i) in peopleHeader" :key="i" inactive>
              <v-list-item-content>
                <v-list-item-title>{{ item }}</v-list-item-title>
                <v-list-item-subtitle>{{ peopleArr[i] }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-layout>
  </v-container>
</template>
 
<script lang='ts'>
import Vue from "vue";
export default Vue.extend({
  name: "Admin",
  data: () => ({
    item: 0
  }),
  props: {
    peopleArr: Array,
    peopleHeader: Array
  }
});
</script>