<template>
  <div class="auth">
    <div class="columns">
      <div class="column is-two-fifths auth-left is-align-self-center has-shadow">
        <div class="columns">
          <div class="column">
            <b-button
              class="is-block ml-auto"
              type="is-success"
              @click="changeAuthType('login')"
            >
              Логин
            </b-button>
          </div>
          <div class="column">
            <b-button
              class="is-block ml-auto"
              type="is-success"
              @click="changeAuthType('registration')"
            >
              Нет аккаунта? Зарегистрируйтесь
            </b-button>
          </div>
        </div>
        <div class="auth-right__content px-5">
          <component :is="component[authType].view" @do-auth="doAuth" />
        </div>
      </div>
      <div class="column auth-right">
        <div class="auth-right__content px-5"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LoginForm from '@/components/LoginForm.vue';
import { LoginData, RegistrationData } from '@/types/types';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';

@Component({
  components: { LoginForm },
})
export default class Auth extends Vue {
  authType = 'login';

  changeAuthType(authType: string): void {
    this.authType = authType;
  }

  component = {
    login: {
      view: () => import('@/components/LoginForm.vue'),
    },
    registration: {
      view: () => import('@/components/RegistrationForm.vue'),
    },
  };

  doAuth = (userInfo: { data: LoginData | RegistrationData; action: string }): void => {
    if (userInfo.action === 'login') {
      AuthService.login(userInfo.data as LoginData).then(() => {
        UserService.getUserData().then((response) => {
          this.$store.dispatch('userModule/setUserToStore', response);
          this.$store.dispatch('userModule/setAuthState', true);
          this.$router.push({
            name: 'UserProfile',
            params: {
              role: (response as any).role,
            },
          });
        });
      });
    }
    if (userInfo.action === 'registration') {
      AuthService.register(userInfo.data as RegistrationData);
    }
  };
}
</script>

<style lang="scss">
.auth {
  height: 100%;
  &-right {
    background-image: url('../assets/images/login-right.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
}
</style>
