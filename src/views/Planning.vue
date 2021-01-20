<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Plan_plan' | localize }}</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      Категорий еще нет ->
      <router-link to="/categories">{{
        'Plan_add_cat' | localize
      }}</router-link>
    </p>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency }} {{ 'From' | localize }}
          {{ cat.limit | currency }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPersent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  metaInfo() {
    return { title: this.$title('Menu_Planning') }
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)
      const persent = (100 * spend) / cat.limit
      const progressPersent = persent > 100 ? 100 : persent
      const progressColor =
        persent < 60 ? 'green' : persent < 100 ? 'yellow' : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0
          ? localizeFilter('Plan_exceed')
          : localizeFilter('Plan_left')
      } ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...cat,
        progressPersent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>
