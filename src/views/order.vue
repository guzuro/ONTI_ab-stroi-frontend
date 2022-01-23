<template>
  <div class="order">
    <div v-if="$route.params.actionType === 'new'">
      <b-button @click="createOrder">Создать заказ</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import OrderService from '@/services/OrderService';

@Component
export default class Order extends Vue {
  createOrder(): void {
    OrderService.createOrder({ client_id: this.customerId }).then(
      // eslint-disable-next-line camelcase
      (response: { order_id: number }) => {
        OrderService.getOrderById({ order_id: response.order_id }).then(
          (createdOrder: any) => {
            console.log(createdOrder);
          },
        );
      },
    );
  }

  get customerId(): number {
    return Number.parseFloat(this.$route.params.customerId);
  }

  created(): void {
    if (this.$route.query.orderId) {
      // eslint-disable-next-line camelcase
      OrderService.getOrderById({
        order_id: Number.parseFloat(this.$route.query.orderId.toString()),
      }).then((response: any) => {
        console.log(response);
      });
    }
  }
}
</script>
