<template>
  <div class="login-form">
    <p class="is-size-3 has-text-centered">Войти в учетную запись</p>
    <b-field label="Логин" type="is-danger">
      <b-input required type="text" v-model="loginData.login"> </b-input>
    </b-field>
    <b-field label="Пароль">
      <b-input
        required
        type="password"
        v-model="loginData.password"
        message="Заполните пароль"
      >
      </b-input>
    </b-field>
    <b-button
      class="is-block ml-auto"
      type="is-success"
      @click="doAuth"
      :disabled="!loginData.login && !loginData.password"
    >
      Войти
    </b-button>
  </div>
</template>

<script lang="ts">
import { LoginData } from '@/types/types';
import Vue from 'vue';
import { Component, Emit } from 'vue-property-decorator';

@Component
export default class LoginForm extends Vue {
  loginData: LoginData = {
    login: '',
    password: '',
  };

  @Emit()
  doAuth(): { data: LoginData; action: string } {
    return { action: 'login', data: this.loginData };
  }
}
</script>

<style scoped>
</style>
