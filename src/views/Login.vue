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
            :class="{invalid: isInvalidPassword}"
          >
          <label for="password">{{ $t('forms.password') }}</label>
          <small v-if="isInvalidPassword" class="helper-text invalid">
            {{ $v.password.$dirty && $v.password.required ?
            $t('validationErrors.passMinL', { minL: $v.password.$params.minLength.min, l: password.length }) :
            $t('validationErrors.passReq') }}
          </small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            {{ $t('buttons.signIn') }}
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
         {{ $t('common.noAcc') }}
          <router-link :to="{ name: 'registration' }">{{ $t('links.signUp') }}</router-link>
        </p>
      </div>
    </form>
  </empty-layout>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
import EmptyLayout from '../layouts/EmptyLayout'
export default {
  name: 'Login',
  metaInfo () {
    return {
      title: this.$t('routes.login')
    }
  },
  components: {
    EmptyLayout
  },
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    isInvalidEmail () {
      return (this.$v.email.$dirty && !this.$v.email.required) || (this.$v.email.$dirty && !this.$v.email.email)
    },
    isInvalidPassword () {
      return (this.$v.password.$dirty && !this.$v.password.required) || (this.$v.password.$dirty && !this.$v.password.minLength)
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('user/login', formData)
        this.$router.push({ name: 'dashboard' })
      } catch (e) {}
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$alert(messages[this.$route.query.message])
    }
  }
}
</script>

<style scoped>

</style>
