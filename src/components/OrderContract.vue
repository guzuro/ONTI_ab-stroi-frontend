<template>
  <div class="order-contract">
    <div class="card">
      <div class="card-header p-2">Контракт</div>
      <div class="card-content">
        <div v-if="contract !== null">info</div>
        <div>
          Контракт еще не загружен, загрузите его в систему, чтобы клиент подписал его
          <div class="is-flex is-justify-content-space-between">
            <b-field label="Контракт к подписи">
              <b-upload v-model="contractMain" drag-drop>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"> </b-icon>
                    </p>
                    <p>Нажмите или перетащите файл для его загрузки</p>
                  </div>
                </section>
              </b-upload>
              <div v-if="contract.contract_main"></div>
            </b-field>
            <b-field label="Подписанный контракт">
              <b-upload v-model="contractSigned" drag-drop>
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
          </div>
        </div>
      </div>
    </div>
    <b-button @click="saveContract">СОхранить</b-button>
  </div>
</template>

<script lang="ts">
import OrderService from '@/services/OrderService';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class OrderContract extends Vue {
  @Prop({ default: null }) contract!: any | null;

  @Prop() orderId!: string;

  contractMain: null | Blob = null;

  contractSigned: null | Blob = null;

  saveContract(): void {
    const formData = new FormData();
    formData.set('order_id', this.orderId);
    if (this.contractMain !== null) {
      formData.set('contract_main', this.contractMain);
    }
    if (this.contractSigned !== null) {
      formData.set('contract_signed', this.contractSigned);
    }

    OrderService.saveContract(formData).then((response) => {
      OrderService.getContract({ order_id: Number.parseFloat(this.orderId) }).then(
        (contract: any) => {
          console.log(contract, 'getttttttttttttttt');
        },
      );
      //   console.log(this.saveByteArray([response.contract.contract_main], 'example.txt'));
    });
  }
}
</script>
