<template>
  <div class="customer-form">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Добавить клиента</p>
      </header>
      <div class="card-content">
        <b-field grouped>
          <div class="is-flex is-flex-direction-column">
            <div class="is-flex is-flex-direction-row mb-5">
              <b-field label="Логин">
                <b-input v-model="customerCopy.login" type="text"></b-input>
              </b-field>
              <b-field label="Пароль">
                <b-input v-model="customerCopy.password" type="text"></b-input>
              </b-field>
            </div>
            <div class="is-flex is-flex-direction-row">
              <b-field label="Имя">
                <b-input v-model="customerCopy.first_name" type="text"></b-input>
              </b-field>
              <b-field label="Фамилия">
                <b-input v-model="customerCopy.last_name" type="text"></b-input>
              </b-field>
            </div>
          </div>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop, Watch } from 'vue-property-decorator';
import { RoleEnum, RoleCustomer } from '@/types/types';

@Component
export default class CustomerForm extends Vue {
  @Prop() customer!: RoleCustomer;

  customerCopy: RoleCustomer = {
    login: '',
    password: '',
    first_name: '',
    last_name: '',
    role: RoleEnum.Customer,
  };

  @Watch('customerCopy', { deep: true })
  onProductCopyChange(newValue: RoleCustomer): void {
    this.$emit('input', newValue);
  }

  created(): void {
    this.customerCopy = this.customer;
  }
}
</script>

<style scoped lang="scss">
</style>
