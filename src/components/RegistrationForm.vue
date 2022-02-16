<template>
  <div class="registration-form">
    <b-field label="Логин">
      <b-input type="text" required v-model="registrationFields.login"> </b-input>
    </b-field>
    <b-field label="Пароль">
      <b-input type="password" required v-model="registrationFields.password"> </b-input>
    </b-field>
    <b-field label="Имя">
      <b-input type="text" required v-model="registrationFields.first_name"> </b-input>
    </b-field>
    <b-field label="Фамилия">
      <b-input type="text" required v-model="registrationFields.last_name"> </b-input>
    </b-field>
    <b-button
      class="is-block ml-auto"
      type="is-success"
      @click="doAuth"
      :disabled="disabled"
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
    first_name: '',
    last_name: '',
    role: RoleEnum.Administrator,
  };

  get disabled(): boolean {
    return Object.values(this.registrationFields).some((value) => !value);
  }

  @Emit()
  doAuth(): { data: RegistrationData; action: string } {
    return { data: this.registrationFields, action: 'registration' };
  }
}
</script>
