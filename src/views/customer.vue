<template>
  <div class="customer p-6">
    <div class="is-flex is-justify-content-end">
      <b-button @click="routeBack" class="mb-5">Назад</b-button>
    </div>

    <customer-form :customer="customerModel" @input="onCustomerModelChange" />

    <div class="customer__actions is-justify-content-end is-flex">
      <b-button type="is-success" @click="handleSaveClick">Сохранить</b-button>
      <b-button type="is-danger ml-2" @click="navigateBack">Отмена</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import CustomerForm from '@/components/CustomerForm.vue';
import UserService from '@/services/UserService';
import { RoleCustomer, RoleEnum } from '@/types/types';
import Vue from 'vue';
import Component from 'vue-class-component';
import { NavigationGuardNext } from 'vue-router';

Component.registerHooks(['beforeRouteLeave']);

@Component({
  components: {
    CustomerForm,
  },
})
export default class Customer extends Vue {
  customerModel: RoleCustomer = {
    login: '',
    password: '',
    first_name: '',
    last_name: '',
    role: RoleEnum.Customer,
  };

  userCreated = false;

  onCustomerModelChange(customerModel: RoleCustomer): void {
    this.customerModel = customerModel;
  }

  navigateBack(): void {
    this.$router.back();
  }

  handleSaveClick(): void {
    UserService.createCustomer(this.customerModel).then(() => {
      this.userCreated = true;
      this.$router.push({
        name: 'CustomersList',
      });
    });
  }

  // createCustomer(): void {}

  get customerFormObject(): Omit<RoleCustomer, 'role'> {
    return {
      login: this.customerModel.login,
      password: this.customerModel.password,
      first_name: this.customerModel.first_name,
      last_name: this.customerModel.last_name,
    };
  }

  beforeRouteLeave(to: Location, from: Location, next: NavigationGuardNext): void {
    if (
      Object.values(this.customerFormObject).some((value: string) => value)
      && !this.userCreated
    ) {
      this.$buefy.dialog.confirm({
        title: 'Предупреждение',
        message: 'Есть не сохраненные данные, покинуть страницу создания?',
        confirmText: 'Покинуть',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => next(),
      });
    } else {
      next();
    }
  }

  routeBack(): void {
    this.$router.back();
  }
}
</script>
