<template>
  <div class="user-profile p-6">
    <user-data :user="userData" />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import UserData from '@/components/UserData.vue';

@Component({
  components: {
    UserData,
  },
})
export default class UserProfile extends Vue {
  get userData(): any {
    return this.$store.getters['userModule/getUserData'];
  }
}
</script>

<style scoped>
</style>
