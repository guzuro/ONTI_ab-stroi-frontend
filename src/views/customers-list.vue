<template>
  <div class="customers-list p-6">
    <div class="is-flex is-justify-content-space-between">
      <h1>Все клиенты</h1>
      <b-button class="is-right" type="is-warning" @click="addButtonHandler">
        Добавить
      </b-button>
    </div>
    <div v-if="!data.length">Вы еще не добавили клиентов в систему.</div>

    <b-table
      v-else
      :data="data"
      :pagination-simple="true"
      :paginated="true"
      :per-page="20"
      :sort-icon="'arrow-up'"
      :sort-icon-size="'is-small'"
    >
      <b-table-column
        field="code"
        label="ID"
        width="40"
        numeric
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="first_name" label="Имя" searchable sortable v-slot="props">
        {{ props.row.first_name }}
      </b-table-column>

      <b-table-column field="last_name" label="Фамилия" sortable v-slot="props">
        {{ props.row.last_name }}
      </b-table-column>

      <b-table-column field="login" label="Логин" sortable v-slot="props">
        {{ props.row.login }}
      </b-table-column>

      <b-table-column field="order_id" label="№ заказа" sortable v-slot="props">
        <div
          class="is-inline-block is-clickable"
          @click="handleOrderClickIcon(props.row.id, props.row.order_id)"
        >
          <b-tooltip
            type="is-warning"
            :label="
              props.row.order_id === null ? 'Сформировать заказ' : 'Просмотр заказа'
            "
          >
            <b-icon
              :icon="props.row.order_id === null ? 'plus' : 'eye'"
              type="is-success"
            ></b-icon>
          </b-tooltip>
        </div>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import UserService from '@/services/UserService';
import { RoleCustomer } from '@/types/types';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CustomersList extends Vue {
  data: Array<RoleCustomer> = [];

  addButtonHandler(): void {
    this.$router.push({
      name: 'Customer',
      params: {
        actionType: 'new',
      },
    });
  }

  handleOrderClickIcon(customerId: number, orderId: number | null): void {
    if (typeof orderId === 'number') {
      this.$router.push({
        name: 'Order',
        params: {
          customerId: customerId.toString(),
          actionType: 'edit',
        },
        query: {
          orderId: orderId.toString(),
        },
      });
    }
    if (orderId === null) {
      this.$router.push({
        name: 'Order',
        params: {
          customerId: customerId.toString(),
          actionType: 'new',
        },
      });
    }
  }

  created(): void {
    UserService.getClients().then(({ data }: any) => {
      this.data = data;
    });
  }
}
</script>
