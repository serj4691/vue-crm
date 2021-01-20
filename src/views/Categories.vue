<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Category'|localize}}</h3>
    </div>
    <div class="row">
      <section>
        <Loader v-if="loading" />
        <div v-else class="row">
          <CategoryCreate @created="addNewCategory" />

          <CategoryEdit 
                v-if="categories.length"
                :categories="categories"
                :key="categories.length + updateCount"
                @updated="updateCat"
          />
          <p v-else class="center">{{'Category_not'|localize}}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
  name: "categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  metaInfo() {
    return { title: this.$title('Menu_Category') }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories")
    this.loading = false
    //console.log(this.categories)
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCat(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
};
</script>
