<template>
  <div class="project p-6">
    <div class="navigation is-flex is-justify-content-space-between">
      <b-button
        @click="isModalActive = true"
        v-if="
          project &&
          project.prepayment_success &&
          $store.getters['userModule/getUserRole'] === 'ADMINISTRATOR'
        "
      >
        Добавить этап строительства
      </b-button>
      <b-button @click="routeBack" class="mb-5">Назад</b-button>
    </div>
    <div class="project-body">
      <b-modal v-model="isModalActive">
        <div class="card">
          <div class="card-header p-2 m-5">Добавить этап строительства</div>
          <div class="card-content">
            <div class="order-smeta__add">
              <b-field label="title">
                <b-input v-model="newStepModel.title"></b-input>
              </b-field>
              <b-field label="description">
                <b-input type="textarea" v-model="newStepModel.description"></b-input>
              </b-field>
              <b-field label="step_cost">
                <b-input type="number" v-model="newStepModel.step_cost"></b-input>
              </b-field>
              <b-field label="Дата окончания">
                <b-datepicker
                  v-model="newStepModel.end_date"
                  placeholder="Click to select..."
                  icon="calendar-today"
                  trap-focus
                >
                </b-datepicker>
              </b-field>

              <b-button @click="addStep">Сохранить</b-button>
            </div>
          </div>
        </div>
      </b-modal>

      <div v-if="project !== null && project.id">
        <div class="project-end">
          <div class="list__item is-flex is-justify-content-space-between">
            <p class="list__property_left is-size-6 has-text-weight-bold">
              Примерная дата окончания работ
            </p>
            <p class="list__property_right ml-2">{{ project.project_end_date }}</p>
          </div>
        </div>
        <div v-if="project.prepayment_success">
          <div v-if="project.steps.length" class="mt-5">
            <div v-for="(step, index) in project.steps" :key="index">
              <div class="card">
                <div class="card-header p-2">
                  {{ step.title }}
                  <div v-if="step.step_payed" class="ml-2" style="color: green">
                    | Этап строительства оплачен
                  </div>
                  <div v-else>
                    <div class="ml-2" style="color: red">
                      | К оплате - {{ step.step_cost }}
                    </div>
                  </div>
                </div>
                <div class="card-content p-2">
                  <div class="list">
                    <div
                      class="list__item is-flex is-justify-content-space-between"
                      v-if="step.description"
                    >
                      <p class="list__property_left is-size-6 has-text-weight-bold">
                        Описание этапа
                      </p>
                      <p class="list__property_right ml-2">{{ step.description }}</p>
                    </div>
                    <div class="list__item is-flex is-justify-content-space-between">
                      <p class="list__property_left is-size-6 has-text-weight-bold">
                        Дата окончания
                      </p>
                      <p class="list__property_right">{{ step.end_date }}</p>
                    </div>
                  </div>
                  <div>
                    <b-field
                      v-if="$store.getters['userModule/getUserRole'] === 'ADMINISTRATOR'"
                      class="file is-primary"
                      :class="{ 'has-name': !!file }"
                    >
                      <b-upload
                        v-model="file"
                        class="file-label"
                        @input="uploadFile(step.id)"
                      >
                        <span class="file-cta">
                          <b-icon class="file-icon" icon="upload"></b-icon>
                          <span class="file-label">Загрузить фотографии</span>
                        </span>
                        <span class="file-name" v-if="file">
                          {{ file.name }}
                        </span>
                      </b-upload>
                    </b-field>
                  </div>
                  <b-collapse
                    v-if="step.photo.length"
                    class="card mt-5"
                    animation="slide"
                    aria-id="contentIdForA11y3"
                  >
                    <template #trigger="props">
                      <div
                        class="card-header"
                        role="button"
                        aria-controls="contentIdForA11y3"
                      >
                        <p class="card-header-title">Фотог рафии строительства</p>
                        <a class="card-header-icon">
                          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
                        </a>
                      </div>
                    </template>

                    <div class="card-content">
                      <div class="photos">
                        <div v-for="(img, index) in step.photo" :key="index">
                          <div class="is-flex">
                            <img
                              style="width: 500px; height: 500px"
                              :src="`http://localhost:3080/assets/static/${img.name}`"
                            />
                            <div>
                              <b-button
                                type="is-danger"
                                icon-right="delete"
                                @click="removePhoto(img.id)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-collapse>
                </div>
                <footer class="card-footer p-2">
                  <div
                    v-if="
                      !step.step_payed &&
                      $store.getters['userModule/getUserRole'] === 'CUSTOMER'
                    "
                  >
                    <b-button @click="payStep(step.id)">Оплатить</b-button>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="$store.getters['userModule/getUserRole'] === 'ADMINISTRATOR'">
            Ожидает оплаты клиентом
          </div>
          <div v-if="$store.getters['userModule/getUserRole'] === 'CUSTOMER'">
            Для начала строительства вам небходимо внести предоплату. Затем, оплата будет
            производиться по частям по мере выполненеия этапов стройки.
            <div class="customer-payment">
              <div class="card">
                <div class="card-header">ДАнные по предоплате на основе сметы</div>
                <div class="card-content">
                  <div class="is-flex is-justify-content-between">
                    <div class="pay-sum">{{ project.prepayment_sum }}</div>
                    <div class="pay">
                      <b-button @click="doPayment">Оплатить</b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          Примерная дата окончания работ
          <b-datepicker
            v-model="projectEndDate"
            placeholder="Примерная дата окончания работ"
            icon="calendar-today"
            trap-focus
          >
          </b-datepicker
          ><b-button @click="addProject" :disabled="isDisabled">
            Добавить проект
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ProjectService from '@/services/ProjectService';
import Vue from 'vue';
import Component from 'vue-class-component';
import moment from 'moment';

@Component
export default class extends Vue {
  project: any = null;

  file = null;

  newStepModel: any = {
    title: '',
    description: '',
    step_cost: 0,
    end_date: new Date(),
  };

  isModalActive = false;

  projectEndDate = new Date();

  get isDisabled(): boolean {
    return moment(this.projectEndDate).isBefore(moment());
  }

  addStep(): any {
    const step = { project_id: this.project.id, ...this.newStepModel };

    step.end_date = moment(this.newStepModel.end_date).format('YYYY-MM-DD').toString();

    ProjectService.addStep(step).then(() => {
      this.getProject();
    });
  }

  doPayment(): void {
    ProjectService.doPayment({ id: this.project.id, prepayment_success: true }).then(
      () => {
        this.getProject();
      },
    );
  }

  routeBack(): void {
    this.$router.back();
  }

  addProject() {
    ProjectService.addProject({
      client_id: Number.parseFloat(this.$route.params.customerId),
      order_id: Number.parseFloat(this.$route.params.orderId),
      project_end_date: moment(this.projectEndDate).format('YYYY-MM-DD'),
    }).then(() => {
      this.getProject();
    });
  }

  getProject() {
    ProjectService.getProject({
      order_id: Number.parseInt(this.$route.params.orderId, 10),
    })
      .then(({ data }) => {
        if (!data.id) {
          this.project = null;
        } else {
          this.project = data;
        }
      })
      .catch((err: any) => {
        if (err.code === 404) {
          console.error(err.code);
        }
      });
  }

  payStep(stepId: number): void {
    ProjectService.payStep({ id: stepId }).then(() => {
      this.getProject();
    });
  }

  uploadFile(stepId: number): void {
    const fd = new FormData();
    fd.append('step_id', stepId.toString());
    if (this.file !== null) {
      fd.append('step_photo', this.file);
    }
    ProjectService.uploadPhoto(fd).then(() => {
      this.getProject();
      this.file = null;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  removePhoto(photoId: number): void {
    ProjectService.removePhoto({
      image_id: photoId,
    }).then(() => {
      this.getProject();
    });
  }

  created(): void {
    this.getProject();
  }
}
</script>
