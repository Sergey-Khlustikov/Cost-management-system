<template>
  <empty-layout>
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">{{ $t('common.bookkeeping') }}</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{ invalid: isInvalidEmail }"
          >
          <label for="email">{{ $t('forms.email') }}</label>
          <small v-if="isInvalidEmail" class="helper-text invalid">
            {{ $v.email.$dirty && $v.email.required ?
            $t('validationErr.emailInc') :
            $t('validationErr.emailReq') }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model="password"
            :class="{ invalid: isInvalidPassword }"
          >
          <label for="password">{{ $t('forms.password') }}</label>
          <small v-if="isInvalidPassword" class="helper-text invalid">
            {{ $v.password.$dirty && $v.password.required ?
            $t('validationErrors.passMinL', { minL: $v.password.$params.minLength.min, l: password.length }) :
            $t('validationErrors.passReq') }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{ invalid: isInvalidName }"
          >
          <label for="name">{{ $t('forms.name') }}</label>
          <small v-if="isInvalidName" class="helper-text invalid">{{ $t('validationErr.nameReq') }}</small>
        </div>
        <p>
          <label class="agree-label" :class="{ invalid: !$v.agree.checked }">
            <input type="checkbox" v-model="agree" />
            <span>{{ $t('forms.privacy') }}</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            {{ $t('buttons.signUp') }}
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          {{ $t('common.haveAcc') }}
          <router-link :to="{ name: 'login' }">{{ $t('links.signIn') }}</router-link>
        </p>
      </div>
    </form>
  </empty-layout>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import EmptyLayout from '../layouts/EmptyLayout'
export default {
  name: 'Registration',
  metaInfo () {
    return {
      title: this.$t('routes.registration')
    }
  },
  components: {
    EmptyLayout
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  computed: {
    isInvalidEmail () {
      return (this.$v.email.$dirty && !this.$v.email.required) || (this.$v.email.$dirty && !this.$v.email.email)
    },
    isInvalidPassword () {
      return (this.$v.password.$dirty && !this.$v.password.required) || (this.$v.password.$dirty && !this.$v.password.minLength)
    },
    isInvalidName () {
      return this.$v.name.$dirty && !this.$v.name.required
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        locale: this.$i18n.locale
      }
      try {
        await this.$store.dispatch('user/register', formData)
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.agree-label.invalid {
  color: red;
}
</style>
