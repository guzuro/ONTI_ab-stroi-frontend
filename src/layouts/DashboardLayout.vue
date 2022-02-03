<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        type="is-light"
        :fullheight="true"
        :overlay="false"
        :right="false"
        v-model="open"
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        :delay="expandWithDelay ? 500 : null"
      >
        <div class="p-1">
          <div class="is-flex is-align-items-end mb-5">
            <img style="height: 65px; width: 65px" src="../assets/images/logo-icon.svg" />
            <p class="sidebar-title has-text-weight-bold is-size-5">
              Управление <br />
              продажами
            </p>
          </div>
          <b-menu>
            <b-menu-list label="Навигация">
              <b-menu-item
                label="Мой профиль"
                icon="link"
                tag="router-link"
                :to="{ name: 'UserProfile' }"
              />

              <b-menu-item
                v-if="isAdmin"
                icon="cart"
                label="Клиенты"
                tag="router-link"
                :to="{ name: 'CustomersList' }"
              />

              <b-menu-item
                v-if="!isAdmin"
                label="Заявка"
                icon="link"
                tag="router-link"
                :to="{
                  name: 'Order',
                  params: {
                    customerId: $store.state.userModule.userData.id,
                    actionType: 'edit',
                  },
                  query: {
                    orderId: $store.state.userModule.userData.order_id,
                  },
                }"
              />
              <!-- <b-menu-item
                icon="format-list-bulleted-square"
                label="Категории"
                tag="router-link"
                :to="{ name: 'Categories' }"
              /> -->
              <b-menu-item label="Выйти" @click="logout"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
      <div class="content">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AuthService from '@/services/AuthService';

@Component
export default class DashboardLayout extends Vue {
  expandOnHover = false;

  expandWithDelay = false;

  mobile = 'reduce';

  reduce = false;

  open = true;

  get isAdmin(): boolean {
    return this.$store.getters['userModule/getUserRole'] === 'ADMINISTRATOR';
  }

  logout(): void {
    AuthService.logout().then(() => {
      this.$store.commit('userModule/RESET_IS_AUTHENTICATED');
      this.$store.commit('userModule/RESET_USER_STATE');
      this.$router.push({
        name: 'Login',
      });
    });
  }
}
</script>

<style lang="scss">
@import '../assets/styles/bulma/sidebar.scss';

.dashboard-layout {
  height: 100%;
}

.menu-list a:hover {
  background-color: #dbdbdb;
  color: #363636;
}

.content {
  width: 100%;
  margin: 10px;
}
</style>
