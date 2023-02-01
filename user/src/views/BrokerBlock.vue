<template>
  <div class="card">
    <div class="card-body">
      <h2>{{brokerData.name}}</h2>
      <p>Счёт: {{brokerData.startMoney}}$</p>
    </div>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + brokerData.name" aria-expanded="true" :aria-controls="'#' + brokerData.name">
            Акции
          </button>
        </h2>
        <div :id="brokerData.name" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div v-for="stock in brokerData.stocks" v-bind:key="stock + brokerData.name">
              <div class="card" v-if="stock.count > 0">
                <div class="card-body">
                  <StockBlock :stock="stock"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stocksStore from "@/Store/stocksStore";
import StockBlock from "@/views/StockBlock.vue";

export default {
  name: "BrokerBlock.vue",
  components: {StockBlock},
  props: {
    brokerData: {},
  },
  data() {
    return {
      activeStocks: stocksStore,
      curDif: 0
    }
  },
  methods: {
    setDif(name, count, cost) {
      const curStockCost = this.activeStocks.getters.getStockCost(name);
      if (!curStockCost)
        return 'Не участвует в торгах';
      const dif = cost - count * curStockCost;
      return (dif >= 0 ? 'Прибыль: ' + dif : 'Убыток: ' + dif) + '$';
    }
  }
}
</script>

<style scoped>

</style>