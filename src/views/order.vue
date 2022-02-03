<template>
  <div class="order">
    <div v-if="$route.params.actionType === 'new'">
      <b-button @click="createOrder">Создать заказ</b-button>
    </div>
    <div v-else>
      <h3>Заказ № {{ orderId }}</h3>
      <user-data :user="order.client_id" />
      <hr />
      <order-contract
        v-if="order.contract"
        :contract="order.contract"
        :order-id="orderId"
        @save="saveContract"
        @download="downloadContractFile"
        @approve="approveContract"
      />
      <div v-if="order.contract.contract_approved === true">
        <order-smeta
          v-if="order.smeta !== undefined"
          :smeta="order.smeta"
          :order-id="orderId"
          @save="saveSmeta"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import OrderService from '@/services/OrderService';
import UserData from '@/components/UserData.vue';
import OrderContract from '@/components/OrderContract.vue';
import axios from 'axios';
import { saveAs } from 'file-saver';
import OrderSmeta from '@/components/OrderSmeta.vue';

@Component({
  components: {
    UserData,
    OrderContract,
    OrderSmeta,
  },
})
export default class Order extends Vue {
  order = {} as any;

  createOrder(): void {
    OrderService.createOrder({ client_id: this.customerId }).then(
      // eslint-disable-next-line camelcase
      (response: { order_id: number }) => {
        OrderService.getOrderById({ order_id: response.order_id });
      },
    );
  }

  saveContract = (contractData: any): void => {
    OrderService.saveContract(contractData).then(() => {
      this.getOrder();
    });
  };

  downloadContractFile = (contractType: string): void => {
    axios
      .get(`http://localhost:3080/assets/static/${contractType}`, {
        responseType: 'blob',
      })
      .then((res) => {
        saveAs(res.data, contractType);
      });
  };

  approveContract(contractToApprove: any): void {
    OrderService.approveContract(contractToApprove).then(() => {
      this.getOrder();
    });
  }

  saveSmeta(smeta: any[]): void {
    const smetaToReq = smeta.filter((i: any) => i.id !== -100);
    OrderService.saveSmeta({
      order_id: Number.parseFloat(this.orderId),
      smeta: smetaToReq,
    }).then(() => {
      this.getOrder();
    });
  }

  get customerId(): number {
    return Number.parseFloat(this.$route.params.customerId);
  }

  get orderId(): string {
    return this.$route.query.orderId.toString();
  }

  getOrder(): void {
    if (this.$route.query.orderId) {
      // eslint-disable-next-line camelcase
      OrderService.getOrderById({
        order_id: Number.parseFloat(this.$route.query.orderId.toString()),
      }).then((response: any) => {
        this.order = response;
      });
    }
  }

  created(): void {
    this.getOrder();
  }
}
</script>
