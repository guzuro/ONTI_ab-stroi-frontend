<template>
  <div class="order">
    <div v-if="$route.params.actionType === 'new'">
      <b-button @click="createOrder">Создать заказ</b-button>
    </div>
    <div v-if="order !== null">
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
          :smetaApproved="order.smeta_approved"
          @save="saveSmeta"
          @approve="approveSmeta"
        />
      </div>

      <div class="card">
        <div class="card-header p-2">
          <p>Договор на строительство</p>
          <div class="ml-2" v-if="order.order_approved" style="color: green">
            (Договор на строительство утвержден)
          </div>
        </div>
        <div class="card-content">
          <div v-if="order === null || !order.order_doc_main" class="mb-5">
            Договор на строительство еще не загружен, загрузите его в систему, чтобы
            клиент подписал его
          </div>
          <div class="mb-5">
            <div class="is-flex is-justify-content-space-between">
              <div class="is-flex is-flex-direction-column">
                <b-field label="Договор к подписи">
                  <b-upload
                    v-model="orderDocMain"
                    drag-drop
                    :disabled="
                      $store.getters['userModule/getUserRole'] === 'CUSTOMER' ||
                      order.order_approved
                    "
                  >
                    <section class="section">
                      <div class="content has-text-centered">
                        <p>
                          <b-icon icon="upload" size="is-large"> </b-icon>
                        </p>
                        <p>Нажмите или перетащите файл для его загрузки</p>
                      </div>
                    </section>
                  </b-upload>
                </b-field>
                <div v-if="order.order_doc_main || orderDocMain">
                  <div class="is-flex is-flex-direction-column">
                    {{ order.order_doc_main || orderDocMain.name }}
                    <div class="is-flex">
                      <b-button
                        v-if="
                          order.order_doc_main &&
                          $store.getters['userModule/getUserRole'] === 'ADMINISTRATOR' &&
                          !order.order_approved
                        "
                        class="flex is-align-self-flex-start"
                        type="is-danger"
                        icon-left="delete"
                      >
                        Удалить файл
                      </b-button>
                      <b-button
                        v-if="order.order_doc_main"
                        class="ml-2 flex is-align-self-flex-start"
                      >
                        Скачать файл
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="is-flex is-flex-direction-column">
                <b-field label="Подписанный договор">
                  <b-upload
                    v-model="orderDocSigned"
                    drag-drop
                    :disabled="
                      $store.getters['userModule/getUserRole'] === 'ADMINISTRATOR' ||
                      order.order_approved
                    "
                  >
                    <section class="section">
                      <div class="content has-text-centered">
                        <p>
                          <b-icon icon="upload" size="is-large"> </b-icon>
                        </p>
                        <p>Нажмите или перетащите файл для его загрузки</p>
                      </div>
                    </section>
                  </b-upload>
                </b-field>
                <div v-if="order.order_doc_signed || orderDocSigned">
                  <div class="is-flex is-flex-direction-column">
                    {{ order.order_doc_signed || orderDocSigned.name }}
                    <div class="is-flex">
                      <b-button
                        v-if="
                          order.order_doc_signed &&
                          $store.getters['userModule/getUserRole'] === 'CUSTOMER' &&
                          !order.order_approved
                        "
                        class="flex is-align-self-flex-start"
                        type="is-danger"
                        icon-left="delete"
                      >
                        Удалить файл
                      </b-button>
                      <b-button
                        v-if="order.order_doc_signed"
                        class="ml-2 flex is-align-self-flex-start"
                      >
                        Скачать файл
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 is-flex is-justify-content-end" v-if="!order.order_approved">
            <b-button @click="saveOrderDoc"> Сохранить контракт </b-button>
          </div>
          <b-button
            class="is-success"
            v-if="
              $store.getters['userModule/getUserRole'] === 'ADMINISTRATOR' &&
              !order.order_approved
            "
            @click="approveOrder"
          >
            Утвердить
          </b-button>
        </div>
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
  order: any = null;

  orderDocMain = null;

  orderDocSigned = null;

  saveOrderDoc(): void {
    const formData = new FormData();
    formData.set('order_id', this.orderId);
    if (this.order !== null) {
      if (this.orderDocMain !== null || this.order.order_doc_main) {
        formData.set(
          'order_doc_main',
          this.order.order_doc_main ? this.order.order_doc_main : this.orderDocMain,
        );
      }
      if (this.orderDocSigned !== null) {
        formData.set(
          'order_doc_signed',
          this.order.order_doc_signed ? this.order.order_doc_signed : this.orderDocSigned,
        );
      }
      OrderService.saveOrderDoc(formData).then(() => {
        this.getOrder();
      });
    }
  }

  approveOrder = (): void => {
    OrderService.approveOrder({
      order_id: Number.parseFloat(this.orderId),
      order_approved: true,
    }).then(() => {
      this.getOrder();
    });
  };

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

  approveSmeta(): void {
    OrderService.approveSmeta({
      order_id: Number.parseFloat(this.orderId),
      smeta_approved: true,
    }).then(() => {
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
