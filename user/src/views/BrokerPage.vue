<template>
  <div class="card" style="margin: 1em">
    <div class="card-body">
      <h3 class="card-title">{{userStore.state.userName}}</h3>
      <p class="card-text" id="cashId">Счёт: ${{userStore.state.money}}</p>
      <div>
        <h3> Подробная прибыль: </h3>
        <div v-for="stock in userStore.getters.getStocks" v-bind:key="stock.stock +'sum'">
          {{stock.count * stockStore.getters.getStockCost(stock.stock) - stock.bought}}
        </div>
        <h1>{{sum.toFixed(2)}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import userStore from "@/Store/store";
import stocksStore from "@/Store/stocksStore";

export default {
  name: "BrokerPage.vue",
  data() {
    return {
      userStore: userStore,
      stockStore: stocksStore,
      sum: 0
    }
  },
  updated() {
    this.sum = 0;
    for (const stock of this.userStore.getters.getStocks){
      const cost = this.stockStore.getters.getStockCost(stock.stock);
      this.sum += Number(stock.count * cost - stock.bought);
    }
  }
}
</script>

<style scoped>

</style>