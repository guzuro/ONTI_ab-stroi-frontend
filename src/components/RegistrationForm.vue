<template>
  <div class="registration-form">
    <b-field label="Логин">
      <b-input type="text" v-model="registrationFields.login"> </b-input>
    </b-field>
    <b-field label="Пароль">
      <b-input type="password" v-model="registrationFields.password"> </b-input>
    </b-field>
    <b-field label="Имя">
      <b-input type="text" v-model="registrationFields.firstName"> </b-input>
    </b-field>
    <b-field label="Фамилия">
      <b-input type="text" v-model="registrationFields.lastName"> </b-input>
    </b-field>
    <b-button class="is-block ml-auto" type="is-success" @click="doAuth"
      >Регистрация</b-button
    >
  </div>
</template>

<script lang="ts">
import { RegistrationData, RoleEnum } from '@/types/types';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit } from 'vue-property-decorator';

@Component
export default class RegistrationForm extends Vue {
  registrationFields: RegistrationData = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    role: RoleEnum.Administrator,
  };

  @Emit()
  doAuth(): RegistrationData {
    return this.registrationFields;
  }
}
</script>
