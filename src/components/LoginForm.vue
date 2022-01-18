<template>
  <div class="login-form">
    <p class="is-size-3 has-text-centered">Войти в учетную запись</p>
    <b-field label="Email" type="is-danger" message="This email is invalid">
      <b-input type="email" v-model="loginData.login"> </b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password" v-model="loginData.password"> </b-input>
    </b-field>
    <b-button class="is-block ml-auto" type="is-success" @click="doAuth">Войти</b-button>
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
  doAuth(): LoginData {
    return this.loginData;
  }
}
</script>

<style scoped>
</style>
