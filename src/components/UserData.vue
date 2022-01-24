<template>
  <div class="client-data">
    <div class="card">
      <div class="card-header p-2">Информация о пользователе</div>
      <div class="card-content">
        <div class="content">
          <div class="list">
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">ID</p>
              <p class="list__property_right">{{ user.id }}</p>
            </div>
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">Логин</p>
              <p class="list__property_right">{{ user.login }}</p>
            </div>
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">Имя</p>
              <p class="list__property_right">{{ user.first_name }}</p>
            </div>
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">Фамилия</p>
              <p class="list__property_right">{{ user.last_name }}</p>
            </div>
            <div class="list__item is-flex is-justify-content-space-between">
              <p class="list__property_left is-size-6 has-text-weight-bold">Роль</p>
              <p class="list__property_right">{{ user.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- "id" : 53, "login" : "1", "password" : null, "first_name" : "1", "last_name" : "1",
    "role" : "CUSTOMER", "created_at" : null, "order_id" : 10, "invited_by" : null -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class UserData extends Vue {
  @Prop() user!: any;
}
</script>
