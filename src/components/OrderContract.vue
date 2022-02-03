<template>
  <div class="order-contract">
    <div class="card">
      <div class="card-header p-2">Договор о намерениях</div>
      <div class="card-content">
        <div v-if="contract === null || !contract.contract_main" class="mb-5">
          Договор о намерениях еще не загружен, загрузите его в систему, чтобы клиент
          подписал его
        </div>
        <div class="mb-5">
          <div class="is-flex is-justify-content-space-between">
            <div class="is-flex is-flex-direction-column">
              <b-field label="Договор к подписи">
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
                      v-if="
                        contract.contract_main &&
                        $store.getters['userModule/getUserRole'] === 'ADMINISTRATOR'
                      "
                      class="flex is-align-self-flex-start"
                      type="is-danger"
                      icon-left="delete"
                      :disabled="contract.contract_approved"
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
            <div class="is-flex is-flex-direction-column">
              <b-field label="Подписанный договор">
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
              <div v-if="contract.contract_signed || contractSigned">
                <div class="is-flex is-flex-direction-column">
                  {{ contract.contract_signed || contractSigned.name }}
                  <div class="is-flex">
                    <b-button
                      v-if="
                        contract.contract_signed &&
                        $store.getters['userModule/getUserRole'] === 'CUSTOMER'
                      "
                      class="flex is-align-self-flex-start"
                      type="is-danger"
                      icon-left="delete"
                      @click="removeFileFromContract('contract_signed')"
                      :disabled="contract.contract_approved"
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
        </div>
        <div class="mt-5 is-flex is-justify-content-end">
          <b-button
            class="is-success"
            v-if="
              $store.getters['userModule/getUserRole'] === 'ADMINISTRATOR' &&
              contract.contract_signed
            "
            @click="approveContract"
            :disabled="contract.contract_approved"
          >
            Утвердить
          </b-button>
          <b-button @click="saveContract" :disabled="contract.contract_approved">
            Сохранить контракт
          </b-button>
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

  contractMain: null | Blob | string = null;

  contractSigned: null | Blob | string = null;

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

  approveContract() {
    this.$emit('approve', {
      order_id: Number.parseInt(this.orderId, 10),
      contract_approved: true,
    });
  }

  saveContract(): void {
    const formData = new FormData();
    formData.set('order_id', this.orderId);
    if (this.contractMain !== null || this.contract.contract_main) {
      formData.set(
        'contract_main',
        this.contract.contract_main ? this.contract.contract_main : this.contractMain,
      );
    }
    if (this.contractSigned !== null) {
      formData.set(
        'contract_signed',
        this.contract.contract_signed
          ? this.contract.contract_signed
          : this.contractSigned,
      );
    }
    this.$emit('save', formData);
  }
}
</script>
