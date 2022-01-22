<template>
  <div class="user-profile">
    <div class="card">
      <div class="card-header p-2">Информация о пользователе</div>
      <div class="card-content">
        <div class="content">
          <div class="list">
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">
                ID
              </p>
              <p class="list__property_right">{{ userData.id }}</p>
            </div>
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">Логин</p>
              <p class="list__property_right">{{ userData.login }}</p>
            </div>
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">Имя</p>
              <p class="list__property_right">{{ userData.first_name }}</p>
            </div>
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">Фамилия</p>
              <p class="list__property_right">{{ userData.last_name }}</p>
            </div>
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">Роль</p>
              <p class="list__property_right">{{ userData.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class UserProfile extends Vue {
  get userData(): any {
    return this.$store.getters['userModule/getUserData'];
  }
}
</script>

<style scoped>
</style>
