<template>
  <div class="currency-wrapper">
    <div>
      <div class="input-field">
        <select ref="selectAll" multiple v-model="currenciesTrackedLocal" @change="trackedHandler">
          <option
            v-for="(value, key) of currenciesAll"
            :value="key"
            :key="key"
          >
            {{ key }}
          </option>
        </select>
        <label>{{ $t('forms.chooseCurs') }}</label>
      </div>
      <div class="input-field">
        <select ref="selectBase" :value="currency" @change="baseHandler($event)">
          <option
            v-for="cur of currenciesTrackedLocal"
            :value="cur"
            :key="cur"
          >
            {{ cur }}
          </option>
        </select>
        <label>{{ $t('forms.chooseBaseCur') }}</label>
      </div>
    </div>
    <div>
      <p>{{ $t('common.sorting') }}</p>
      <draggable
        class="collection"
        tag="ul"
        v-model="currenciesTrackedLocal"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        @change="trackedHandler"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li
            class="collection-item"
            v-for="element of currenciesTrackedLocal"
            :key="element"
            :class="{ ignoreDrag: element === currency }"
          >
            {{ element }}
            <i v-if="element === currency" class="secondary-content material-icons">star</i>
          </li>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { destroySelect } from '@/utils/helpers'
export default {
  name: 'ProfileCurrencyManager',
  components: { draggable },
  props: {
    currency: {
      type: String
    },
    currenciesAll: {
      type: Object
    },
    currenciesTracked: {
      type: Array
    }
  },
  data () {
    return {
      selectBase: '',
      selectAll: '',
      currenciesTrackedLocal: this.currenciesTracked,
      drag: false
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
        filter: '.ignore-drag'
      }
    }
  },
  methods: {
    baseHandler (e) {
      this.$emit('update:currency', e.target.value)
    },
    trackedHandler () {
      this.$emit('update:currenciesTracked', this.currenciesTrackedLocal)
    }
  },
  watch: {
    currenciesTrackedLocal () {
      this.$nextTick(function () {
        if (this.selectBase && this.selectBase) {
          destroySelect(this.selectBase)
          // eslint-disable-next-line no-undef
          this.selectBase = M.FormSelect.init(this.$refs.selectBase)
        }
      })
    }
  },
  async mounted () {
    // eslint-disable-next-line no-undef
    this.selectBase = await M.FormSelect.init(this.$refs.selectBase)
    // eslint-disable-next-line no-undef
    this.selectAll = await M.FormSelect.init(this.$refs.selectAll)
  },
  beforeDestroy () {
    destroySelect(this.selectBase)
    destroySelect(this.selectAll)
  }
}
</script>

<style scoped>
  .currency-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 33%);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    align-items: center;
  }
  .input-field {
    max-width: 300px;
    margin-bottom: 20px;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .collection {
    min-height: 20px;
  }
  .collection-item {
    cursor: move;
  }
  .list-group-item i {
    cursor: pointer;
  }
</style>
