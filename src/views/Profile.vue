<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('routes.profile') }}</h3>
    </div>
    <Loader v-if="loading" />
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: isInvalidName }"
        >
        <label for="description" :class="{active: name.length}">{{ $t('forms.name') }}</label>
        <span v-if="isInvalidName" class="helper-text invalid">{{ $t('validationErrors.nameReq') }}</span>
      </div>
      <div class="page-title">
        <h3>{{ $tc('common.currency', 2) }}</h3>
      </div>
      <profile-currency-manager
        :currency.sync="currency"
        :currenciesAll="currenciesAll"
        :currenciesTracked.sync="currenciesTracked"
      />

      <button class="btn waves-effect waves-light" type="submit">
        {{ $t('buttons.update') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import ProfileCurrencyManager from '../components/ProfileCurrencyManager'

export default {
  name: 'Profile',
  metaInfo () {
    return {
      title: this.$t('routes.profile')
    }
  },
  components: { ProfileCurrencyManager },
  data () {
    return {
      name: '',
      currency: '',
      currenciesTracked: [],
      currenciesAll: '',
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    isInvalidName () {
      return this.$v.name.$error
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'user/updateUser',
      fetchAllCurrencies: 'fetchAllCurrencies'
    }),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateUser({
          name: this.name,
          currency: this.currency,
          currenciesTracked: this.currenciesTracked
        })
        this.$alert(this.$t('alert.profileUpdated'))
      } catch (e) {}
    }
  },
  validations: {
    name: { required }
  },
  async mounted () {
    this.currenciesAll = await this.fetchAllCurrencies()
    this.name = this.user.name
    this.currency = this.user.currency
    this.currenciesTracked = this.user.currenciesTracked
    this.loading = false
  }
}
</script>

<style scoped>
  .input-field {
    max-width: 300px;
  }
.form {
  max-width: 100%;
}
</style>
