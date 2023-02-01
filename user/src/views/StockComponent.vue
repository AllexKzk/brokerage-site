<template>
  <div class="stockId card" style="margin: 1em">
    <div class="card-body">
      <h3 class="card-title">{{stock.stock}}</h3>
      <div style="display: flex;">
        <p class="price card-text">Стоимость: {{stock.cost}} </p>
        <p :style=" {color: stock.ratio > 0 ? 'green' : 'red', marginLeft: '1em'}">{{stock.ratio}}%</p>
      </div>

      <div v-if="brokerStore.getters.getStock(stock.stock).count > 0" style="display: flex;">
        <p class="stockCount">Количество: {{brokerStore.getters.getStock(stock.stock).count}}</p>
        <p class="differ" :style="{color: getDiff() > 0 ? 'Green' : 'Red', marginLeft: '1em'}">
          {{getDiff() > 0 ? 'Прибыль: ' : 'Убыток: '}}
          {{getDiff()}}$
        </p>
      </div>
      <div class="d-flex flex-row bd-highlight mb-3">
        <div class="input-group" style="width: auto">
          <button type="button" class="buyBtn btn btn-dark" @click="buyStock">Купить</button>
          <span class="input-group-text">$</span>
          <input type="number" class="btn btn-outline-dark" min="1" max="10" v-model="this.buyValue">
        </div>
        <div v-if="brokerStore.getters.getStock(stock.stock).count > 0" class="input-group" style="width: auto">
          <button type="button" class="btn btn-warning" style="margin-left: 1em" @click="sellStock">Продать</button>
          <span class="input-group-text">$</span>
          <input type="number" class="btn btn-outline-dark" min="1" max="10" v-model="this.sellValue">
        </div>
        <ChartModal :id="stock.stock + '_id'" :stock="stock.stock" :date="stock.date" :cost="parseFloat(stock.cost.split('$')[1])" />
      </div>
    </div>
  </div>
</template>

<script>
import userStore from "@/Store/store";
import ChartModal from './ChartModal';
import {socket} from "@/socket";

export default {
  name: "StockComponent.vue",
  components: {ChartModal},
  data() {
    return {
      brokerStore: userStore,
      buyValue: 1,
      sellValue: 1,
    }
  },
  props: {
    stock: {},
  },
  methods: {
    getDiff(){
      const brokerData = this.brokerStore.getters.getStock(this.stock.stock);
      return Number((brokerData.count * parseFloat(this.stock.cost.split('$')[1]) - brokerData.cost).toFixed(2));
    },
    buyStock() {
      const money = userStore.state.money;
      const cost = Number(parseFloat(this.stock.cost.split('$')[1]).toFixed(2));
      if (money > cost*this.buyValue && this.buyValue > 0){
        fetch('http://localhost:4000/buystock', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            broker: userStore.state.userName,
            cost: cost,
            count: this.buyValue,
            stock: this.stock.stock
          })
        }).then(() => {
          userStore.commit('setUser');
          socket.emit('addBroker');
        });
      }
      else
        console.log("Недостаточно денег!");
    },
    sellStock() {
      if (this.sellValue <= 0 || this.sellValue > this.brokerStore.getters.getStock(this.stock.stock).count)
        return;
      const cost = Number(parseFloat(this.stock.cost.split('$')[1]).toFixed(2));
      fetch('http://localhost:4000/sellstock', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          broker: userStore.state.userName,
          cost: cost,
          count: this.sellValue,
          stock: this.stock.stock
        })
      }).then(() => userStore.commit('setUser'));
    },
  }
}
</script>
