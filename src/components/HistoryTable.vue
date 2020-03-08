<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ $t('common.amount') }}</th>
      <th>{{ $t('common.date') }}</th>
      <th>{{ $t('common.category') }}</th>
      <th>{{ $t('common.type') }}</th>
      <th />
    </tr>
    </thead>
      <tbody>
      <tr v-for="(post, i) of posts" :key="post.id">
        <td>{{ i + 1 }}</td>
        <td>{{ post.sum | currencyFilter }}</td>
        <td>{{ post.date | dateFilter('date') }}</td>
        <td>{{ post.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="post.typeClass">{{ $t(`common.${post.type}`) }}</span>
        </td>
        <td>
          <router-link
            tag="button"
            :to="`/detail/${post.id}`"
            v-tooltip:top="$t('tooltip.openPost')"
            class="btn-small btn">
            <i class="material-icons">open_in_new</i>
          </router-link>
        </td>
      </tr>
      </tbody>
  </table>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
