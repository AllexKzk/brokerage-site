<template>
  <button type="button" class="btn btn-dark" data-bs-toggle="modal" :data-bs-target="'#' + this.id" style="margin-left: 1em">
    График
  </button>

  <div class="modal fade" :id="this.id" tabindex="-1" :aria-labelledby="this.id + 'Label'" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="this.id + 'Label'">{{this.stock}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ChartComponent :stock="this.stock"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartComponent from './ChartComponent';

export default {
  name: "ChartModal.vue",
  components: {ChartComponent},
  props: {
    id: String,
    stock: String,
    date: String,
    cost: Number
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>

<style scoped>

</style>