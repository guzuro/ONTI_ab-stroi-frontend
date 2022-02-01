<template>
  <div class="order-smeta">
    <b-modal v-model="isModalActive">
      <div class="card">
        <div class="card-header p-2">Смета</div>
        <div class="card-content">
          <div class="order-smeta__add">
            <b-field label="item_name">
              <b-input v-model="smetaItem.item_name"></b-input>
            </b-field>
            <b-field label="quantity">
              <b-input v-model="smetaItem.quantity"></b-input>
            </b-field>
            <b-field label="unit">
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
            <b-field label="price">
              <b-input v-model="smetaItem.price"></b-input>
            </b-field>
            <b-field label="item_total">
              <b-input v-model="smetaItem.item_total"></b-input>
            </b-field>
            <b-button @click="addSmetaItem">Добавить</b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <div class="card">
      <div class="card-header p-2">Смета</div>
      <div class="card-content">
        <div v-if="smetaCopy && smetaCopy.length">
          <div v-for="(sm, index) in smetaCopy" :key="index">
            {{ sm }}

            <b-button type="is-danger" icon-right="delete" @click="setToRemove(index)" />
          </div>
        </div>
        <b-button @click="isModalActive = true">Добавить позицию</b-button>
        <b-button @click="$emit('save', smetaCopy)">Сохранить смету</b-button>
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

  unitOptions = [
    { label: 'Киллограмм', value: 'kg' },
    { label: 'Штук', value: 'piece' },
  ];

  smetaItem = {
    item_name: '',
    unit: '',
    quantity: 0,
    price: 0,
    item_total: 0,
    to_delete: null,
  };

  smetaCopy: Array<any> = [];

  isModalActive = false;

  addSmetaItem(): void {
    this.smetaCopy.push(this.smetaItem);
    this.$emit('save', this.smetaCopy);
    this.smetaItem = {
      item_name: '',
      unit: '',
      quantity: 0,
      price: 0,
      item_total: 0,
      to_delete: null,
    };
  }

  setToRemove(index: number): void {
    this.smetaCopy[index].to_delete = true;
  }

  mounted(): void {
    if (this.smeta !== undefined) {
      this.smetaCopy = [...this.smeta];
      console.log(this.smeta);
    }
  }
}
</script>
