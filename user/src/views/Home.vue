<template>
  <div class="trade-div">
    <h1>Биржа</h1>
    <div class="card" style="margin: 1em">
      <div class="card-body">
        <h3 class="card-title">{{userStore.state.userName}}</h3>
        <p class="card-text" id="cashId">Счёт: ${{userStore.state.money}}</p>
      </div>
    </div>
    <div v-if="stocksStore.getters.getUpdate.length === 0">
      <h1 style="color: red">Биржа закрыта</h1>
    </div>
    <div v-else>
      <h1>Акции</h1>
      <h2>Дата: {{stocksStore.getters.getLastDate}}</h2>
      <div v-for="stock in stocksStore.getters.getUpdate" v-bind:key="stock.stock">
        <StockComponent :stock="stock"/>
      </div>
    </div>
  </div>
</template>
<script>
import userStore from "@/Store/store";
import StockComponent from './StockComponent'
import stocksStore from "@/Store/stocksStore";

export default {
  name: 'TradeComponent',
  components: {StockComponent},
  data() {
    return {
      userStore: userStore,
      stocksStore: stocksStore,
    }
  },
  created: function (){
    userStore.commit('setUser');
  }
}
</script>
<style>

.trade-div {
  margin: 1em;
}

</style>