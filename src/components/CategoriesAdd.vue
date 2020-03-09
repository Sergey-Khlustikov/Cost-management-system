<template>
  <div>
    <div class="page-subtitle">
      <h4>{{ $t('common.create') }}</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="name1"
          type="text"
          v-model="title"
          :class="{ invalid: isTitleValid }"
        >
        <label for="name1">{{ $t('common.title') }}</label>
        <span  v-if="isTitleValid" class="helper-text invalid">{{ $t('validationErrors.catNameReq') }}</span>
      </div>

      <div class="input-field">
        <input
          id="limit1"
          type="number"
          v-model.number="limit"
          :class="{ invalid: isLimitValid }"
        >
        <label for="limit1">{{ $t('common.limit') }}</label>
        <span v-if="isLimitValid" class="helper-text invalid">
          {{ $v.limit.required ?
            $t('validationErrors.minV', { minV: $v.limit.$params.minValue.min }) :
            $t('validationErrors.valReq') }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $t('buttons.create') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
export default {
  name: 'CategoriesAdd',
  data () {
    return {
      title: '',
      limit: 100
    }
  },
  computed: {
    isTitleValid () {
      return this.$v.title.$error
    },
    isLimitValid () {
      return this.$v.limit.$error
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.$store.dispatch('categories/addCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.$alert(this.$t('alert.categoryCreated'))
        this.$v.reset()
      } catch (e) {}
    }
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(100) }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  }
}
</script>
