<template>
  <div class="order">
    <div v-if="$route.params.actionType === 'new'">
      <b-button @click="createOrder">Создать заказ</b-button>
    </div>
    <div v-if="order">
      <h3>Заказ № {{ orderId }}</h3>
      <user-data :user="order.client_id" />
      <hr />
      <order-contract :contract="order.contract" :order-id="orderId" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import OrderService from '@/services/OrderService';
import UserData from '@/components/UserData.vue';
import OrderContract from '@/components/OrderContract.vue';

@Component({
  components: {
    UserData,
    OrderContract,
  },
})
export default class Order extends Vue {
  order = {} as any;

  createOrder(): void {
    OrderService.createOrder({ client_id: this.customerId }).then(
      // eslint-disable-next-line camelcase
      (response: { order_id: number }) => {
        OrderService.getOrderById({ order_id: response.order_id }).then(
          (createdOrder: any) => {
            console.log('OK, CREATED');
          },
        );
      },
    );
  }

  get customerId(): number {
    return Number.parseFloat(this.$route.params.customerId);
  }

  get orderId(): string {
    return this.$route.query.orderId.toString();
  }

  created(): void {
    if (this.$route.query.orderId) {
      // eslint-disable-next-line camelcase
      OrderService.getOrderById({
        order_id: Number.parseFloat(this.$route.query.orderId.toString()),
      }).then((response: any) => {
        this.order = response;
      });
    }
  }
}
</script>
