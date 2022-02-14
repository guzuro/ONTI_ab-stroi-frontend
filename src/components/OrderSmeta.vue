<template>
  <div class="order-smeta">
    <b-modal v-model="isModalActive">
      <div class="card">
        <div class="card-header p-2">Смета</div>
        <div class="card-content">
          <div class="order-smeta__add">
            <b-field label="Наименование">
              <b-input v-model="smetaItem.item_name"></b-input>
            </b-field>
            <b-field label="Количество">
              <b-input v-model="smetaItem.quantity" @input="makeItemTotal"></b-input>
            </b-field>
            <b-field label="ед.">
              <b-select placeholder="Select a name" v-model="smetaItem.unit">
                <option
                  v-for="option in unitOptions"
                  :value="option.value"
                  :key="option.value"
                >
                  {{ option.label }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Цена">
              <b-input v-model="smetaItem.price" @input="makeItemTotal"></b-input>
            </b-field>
            <b-field label="Итого по товару">
              <b-input disabled :value="smetaItem.item_tыotal"></b-input>
            </b-field>
            <b-button @click="saveSmetaItem">Сохранить</b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <div class="card">
      <div class="card-header p-2">
        Смета
        <div v-if="smetaApproved" class="ml-2" style="color: green">
          (Смета утверждена)
        </div>
      </div>
      <div class="card-content">
        <div v-if="smetaCopy && smetaCopy.length" class="list">
          <b-table
            :data="smetaCopy"
            :pagination-simple="true"
            :paginated="true"
            :per-page="20"
            :sort-icon="'arrow-up'"
            :sort-icon-size="'is-small'"
          >
            <b-table-column
              field="item_name"
              label="Наименование"
              searchable
              sortable
              v-slot="props"
            >
              {{ props.row.item_name }}
            </b-table-column>

            <b-table-column field="quantity" label="Количество" sortable v-slot="props">
              {{ props.row.quantity }}
            </b-table-column>

            <b-table-column field="unit" label="ед." sortable v-slot="props">
              {{ props.row.unit }}
            </b-table-column>

            <b-table-column field="price" label="Цена" sortable v-slot="props">
              <div v-if="props.row.id !== -100">{{ props.row.price }} руб.</div>
            </b-table-column>

            <b-table-column
              field="item_total"
              label="Итого за позицию"
              sortable
              v-slot="props"
            >
              {{ props.row.item_total }} руб.
            </b-table-column>

            <b-table-column
              field="actions"
              label="Действия"
              sortable
              v-slot="props"
              v-if="$store.getters['userModule/getUserRole'] === 'ADMINISTRATOR'"
            >
              <div class="is-flex" v-if="props.row.id !== -100">
                <b-button
                  type="is-danger"
                  icon-right="delete"
                  @click="setToRemove(props.index)"
                />
                <b-button
                  type="is-warning"
                  class="ml-2"
                  icon-right="pencil"
                  @click="editItem(props)"
                />
              </div>
            </b-table-column>
          </b-table>
        </div>
        <div
          v-if="
            $store.getters['userModule/getUserRole'] === 'ADMINISTRATOR' && !smetaApproved
          "
        >
          <b-button @click="$emit('save', smetaCopy)">Сохранить смету</b-button>
          <b-button @click="isModalActive = true">Добавить позицию</b-button>
        </div>
        <div
          v-if="$store.getters['userModule/getUserRole'] === 'CUSTOMER' && !smetaApproved"
        >
          <b-button @click="$emit('approve')">Утвердить смету</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class OrderSmeta extends Vue {
  @Prop() smeta!: Array<any>;

  @Prop() orderId!: string;

  @Prop() smetaApproved!: boolean;

  unitOptions = [
    { label: 'Киллограмм', value: 'kg' },
    { label: 'Штук', value: 'piece' },
  ];

  smetaItem = {
    id: null,
    item_name: '',
    unit: '',
    quantity: 0,
    price: 0,
    item_total: 0,
    to_delete: false,
  };

  smetaCopy: Array<any> = [];

  isModalActive = false;

  selectedIndex = -1;

  makeItemTotal(): void {
    this.smetaItem.item_total = this.smetaItem.quantity * this.smetaItem.price;
  }

  saveSmetaItem(): void {
    if (this.selectedIndex !== -1) {
      this.smetaCopy.slice(this.selectedIndex, 1);
    }
    if (this.smetaItem.id) {
      this.smetaCopy = this.smetaCopy.filter(
        (item: any) => item.id !== this.smetaItem.id,
      );
    }
    this.smetaCopy.push(this.smetaItem);
    this.$emit('save', this.smetaCopy);
    this.smetaItem = {
      id: null,
      item_name: '',
      unit: '',
      quantity: 0,
      price: 0,
      item_total: 0,
      to_delete: false,
    };
  }

  setToRemove(index: number): void {
    const toDelete = this.smetaCopy[index];
    if (toDelete.id) {
      this.smetaCopy[index].to_delete = !this.smetaCopy[index].to_delete;
    } else {
      this.smetaCopy.splice(index, 1);
    }
  }

  editItem(smetaItem: any): void {
    this.smetaItem = { ...smetaItem.row };
    this.selectedIndex = smetaItem.index;
    this.isModalActive = true;
  }

  getTotal = (smetaItems: any[]) => {
    const initialValue = 0;

    // eslint-disable-next-line implicit-arrow-linebreak
    return smetaItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.item_total,
      initialValue,
    );
  };

  mounted(): void {
    const smetaItems = [...this.smeta];
    console.log(this.getTotal(smetaItems));

    smetaItems.push({
      id: -100,
      item_name: 'ИТОГ',
      item_total: this.getTotal(smetaItems),
    });
    this.smetaCopy = [...smetaItems];
  }
}
</script>
