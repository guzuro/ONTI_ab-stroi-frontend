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

@Component({
  components: { LoginForm },
})
export default class Auth extends Vue {
  authType = 'registration';

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

  doAuth = (aaa: any) => {
    console.log(aaa);
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
