<template>
  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>{{ 'Table_Summa'|localize }}</th>
        <th>{{ 'Table_date'|localize }}</th>
        <th>{{ 'Table_category'|localize }}</th>
        <th>{{ 'Table_type'|localize }}</th>
        <th>{{ 'Table_open'|localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, idx) in records" :key="rec.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ rec.amount | currency }}</td>
        <td>{{ rec.date | date('datetime')}}</td>
        <td>{{ rec.categoryName }}</td>
        <td>
          <span class="white-text badge"
              :class="[rec.typeClass]"
          >{{ rec.typeText }}</span>
        </td>
        <td>
          <button 
              v-tooltip="'Table_watch' "
              class="btn-small btn" 
              @click="$router.push('/detail/' + rec.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  }
}
</script>
