<template>
  <div class="order-contract">
    <div class="card">
      <div class="card-header p-2">Контракт</div>
      <div class="card-content">
        <div v-if="contract === null || !contract.contract_main" class="mb-5">
          Контракт еще не загружен, загрузите его в систему, чтобы клиент подписал его
        </div>
        <div class="mb-5">
          <div class="is-flex is-justify-content-space-between">
            <div class="is-flex is-flex-direction-column">
              <b-field label="Контракт к подписи">
                <b-upload
                  v-model="contractMain"
                  drag-drop
                  :disabled="$store.getters['userModule/getUserRole'] === 'CUSTOMER'"
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
              <div v-if="contract.contract_main || contractMain">
                <div class="is-flex is-flex-direction-column">
                  {{ contract.contract_main || contractMain.name }}
                  <div class="is-flex">
                    <b-button
                      v-if="contract.contract_main"
                      class="flex is-align-self-flex-start"
                      type="is-danger"
                      icon-left="delete"
                      @click="removeFileFromContract('contract_main')"
                    >
                      Удалить файл
                    </b-button>
                    <b-button
                      v-if="contract.contract_main"
                      class="ml-2 flex is-align-self-flex-start"
                      @click="$emit('download', contract.contract_main)"
                    >
                      Скачать файл
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="is-flex is-flex-direction-column"></div>
            <b-field label="Подписанный контракт">
              <b-upload
                v-model="contractSigned"
                drag-drop
                :disabled="$store.getters['userModule/getUserRole'] === 'ADMINISTRATOR'"
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
            <div v-if="contract.contract_signed">
              <div class="is-flex is-flex-direction-column">
                {{ contract.contract_signed }}
                <div class="is-flex">
                  <b-button
                    v-if="contract.contract_signed"
                    class="flex is-align-self-flex-start"
                    type="is-danger"
                    icon-left="delete"
                    @click="removeFileFromContract('contract_signed')"
                  >
                    Удалить файл
                  </b-button>
                  <b-button
                    v-if="contract.contract_signed"
                    class="ml-2 flex is-align-self-flex-start"
                    @click="$emit('download', contract.contract_signed)"
                  >
                    Скачать файл
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="is-flex is-justify-content-end">
          <b-button class="mt-5" @click="saveContract">Сохранить контракт</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class OrderContract extends Vue {
  @Prop({ default: null }) contract!: any | null;

  @Prop() orderId!: string;

  contractMain: null | Blob = null;

  contractSigned: null | Blob = null;

  removeFileFromContract(contractType: string): void {
    const formData = new FormData();
    formData.set('order_id', this.orderId);
    if (contractType === 'contract_main') {
      formData.set('contract_main', '');
      formData.set('contract_signed', this.contract.contract_signed);
    }
    if (contractType === 'contract_signed') {
      formData.set('contract_signed', this.contract.contract_main);
      formData.set('contract_signed', '');
    }
    this.$emit('save', formData);
  }

  saveContract(): void {
    const formData = new FormData();
    formData.set('order_id', this.orderId);
    if (this.contractMain !== null) {
      formData.set('contract_main', this.contractMain);
    }
    if (this.contractSigned !== null) {
      formData.set('contract_signed', this.contractSigned);
    }
    this.contractMain = null;
    this.contractSigned = null;
    this.$emit('save', formData);
  }
}
</script>
