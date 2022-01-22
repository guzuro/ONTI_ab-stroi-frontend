<template>
  <div class="customers-list p-2">
    <div class="is-flex is-justify-content-space-between">
      <h1>Все клиенты</h1>
      <b-button class="is-right" type="is-warning" @click="addButtonHandler">
        Добавить
      </b-button>
    </div>

    <b-table
      :data="data"
      :checked-rows.sync="checkedRows"
      checkable
      :checkbox-position="'left'"
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
        {{ props.row.order_id }}
      </b-table-column>

      <b-table-column field="action" label="Действие" v-slot="props">
        <div>
          <div class="is-inline-block is-clickable" @click="editIconHandler(props.row)">
            <b-tooltip type="is-warning" label="Изменить">
              <b-icon icon="pencil" type="is-warning"></b-icon>
            </b-tooltip>
          </div>
          <div class="is-inline-block is-clickable" @click="removeIconHandler(props.row)">
            <b-tooltip type="is-danger" label="Удалить">
              <b-icon icon="delete" type="is-danger"></b-icon>
            </b-tooltip>
          </div>
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
  addButtonHandler(): void {
    this.$router.push({
      name: 'Customer',
      params: {
        actionType: 'new',
      },
    });
  }

  data: Array<RoleCustomer> = [];

  created(): void {
    UserService.getClients().then((response: Array<RoleCustomer>) => {
      this.data = response;
    });
  }
}
</script>
