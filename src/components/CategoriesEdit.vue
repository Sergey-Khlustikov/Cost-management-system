<template>
  <div>
    <div class="page-subtitle">
      <h4>{{ $t('common.edit') }}</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <select id="select__editCategory" ref="select" v-model="currentCat">
          <option
            v-for="cat of categories"
            :value="cat.id"
            :key="cat.id"
          >
            {{ cat.title }}
          </option>
        </select>
        <label for="select__editCategory">{{ $t('forms.chooseCat') }}</label>
      </div>

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
        {{ $t('buttons.update') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { destroySelect } from '@/utils/helpers'

function setCurrent (id) {
  const { title, limit } = this.categories.find(c => c.id === id)
  this.title = title
  this.limit = limit
  this.currentCat = id
}

export default {
  name: 'CategoriesEdit',
  data () {
    return {
      select: '',
      title: '',
      limit: '',
      currentCat: null
    }
  },
  computed: {
    ...mapGetters('categories', {
      categories: 'categories'
    }),
    isTitleValid () {
      return this.$v.title.$error
    },
    isLimitValid () {
      return this.$v.limit.$error
    }
  },
  methods: {
    ...mapActions('categories', {
      fetchCategories: 'fetchCategories'
    }),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.$store.dispatch('categories/updateCategory', {
          id: this.currentCat,
          title: this.title,
          limit: this.limit
        })
        await this.fetchCategories()
        this.$alert(this.$t('alert.catUpdated'))
      } catch (e) {}
    }
  },
  watch: {
    categories () {
      this.$nextTick(function () {
        if (this.select && this.select.destroy) {
          this.select.destroy()
        }
        // eslint-disable-next-line no-undef
        this.select = M.FormSelect.init(this.$refs.select)
      })
    },
    currentCat (catId) {
      setCurrent.call(this, catId)
    }
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(100) }
  },
  created () {
    if (this.categories) {
      setCurrent.call(this, this.categories[0].id)
    }
  },
  async mounted () {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  beforeDestroy () {
    destroySelect(this.select)
  }
}
</script>
