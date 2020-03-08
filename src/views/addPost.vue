<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('routes.newPost') }}</h3>
    </div>
    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">{{ $t('common.createCatsFirst') }} <router-link :to="{ name: 'categories' }">{{ $t('common.create') }}</router-link></p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <transition name="fade" mode="out-in">
        <div>
          <div class="input-field" >
            <select ref="select" v-model="currentCat">
              <option
                v-for="cat of categories"
                :value="cat.id"
                :key="cat.id"
              >
                {{ cat.title }}
              </option>
            </select>
            <label>{{ $t('forms.chooseCat') }}</label>
          </div>

          <p>
            <label>
              <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="type"
              />
              <span>{{ $t('common.income') }}</span>
            </label>
          </p>

          <p>
            <label>
              <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="type"
              />
              <span>{{ $t('common.outcome') }}</span>
            </label>
          </p>
          <div class="input-field">
            <input
              id="amount"
              type="number"
              v-model.number="sum"
              :class="{ invalid: isSumValid }"
            >
            <label for="amount">{{ $t('common.amount') }}</label>
            <span v-if="isSumValid" class="helper-text invalid">
          {{ $v.sum.required ?
            $t('validationErrors.minV', { minV: $v.sum.$params.minValue.min }) :
            $t('validationErrors.valReq') }}
        </span>
          </div>

          <div class="input-field">
            <input
              id="description"
              type="text"
              v-model="desc"
              :class="{ invalid: isDescValid }"
            >
            <label for="description">{{ $t('common.description') }}</label>
            <span  v-if="isDescValid" class="helper-text invalid">{{ $t('validationErrors.descReq') }}</span>
          </div>

          <button class="btn waves-effect waves-light" type="submit">
            {{ $t('buttons.create') }}
            <i class="material-icons right">send</i>
          </button>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { destroySelect } from '@/utils/helpers'

export default {
  name: 'AddPost',
  metaInfo () {
    return {
      title: this.$t('routes.newPost')
    }
  },
  data () {
    return {
      loading: true,
      select: null,
      currentCat: null,
      sum: 1,
      type: 'outcome',
      desc: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      posts: 'posts/posts'
    }),
    categories () {
      return this.$store.getters['categories/categories']
    },
    isSumValid () {
      return this.$v.sum.$error
    },
    isDescValid () {
      return this.$v.desc.$error
    },
    canCreatePost () {
      if (this.type === 'income') {
        return true
      }
      return this.user.bill >= this.sum
    }
  },
  methods: {
    ...mapActions({
      fetchCategories: 'categories/fetchCategories',
      addPost: 'posts/addPost',
      updateUser: 'user/updateUser'
    }),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreatePost) {
        try {
          await this.addPost({
            categoryId: this.currentCat,
            sum: this.sum,
            desc: this.desc,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.user.bill + this.sum
            : this.user.bill - this.sum

          await this.updateUser({ bill })
          this.$alert(this.$t('alert.postCreated'))
          this.$v.$reset()
          this.sum = 1
          this.desc = ''
        } catch (e) {}
      } else {
        this.$alert(`Сумма превышает баланс. Сейчас на счету ${this.user.bill}`)
      }
    }
  },
  validations: {
    sum: { required, minValue: minValue(1) },
    desc: { required }
  },
  async mounted () {
    await this.fetchCategories()
    this.loading = false
    if (this.categories.length) {
      this.currentCat = this.categories[0].id
    }
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select)
      // eslint-disable-next-line no-undef
      M.updateTextFields()
    }, 0)
  },
  beforeDestroy () {
    destroySelect(this.select)
  }
}
</script>

<style scoped>

</style>
