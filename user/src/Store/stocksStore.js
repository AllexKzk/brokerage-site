import { createStore } from 'vuex'
import {socket} from "@/socket";

const stocksStore = createStore({
    state () {
        return {
            lastUpdate: [],
            /*{
                date: String,
                stock: String,
                cost: String,
                ratio: Number
            }*/
        }
    },
    getters: {
        getUpdate (state) {
            return state.lastUpdate;
        },
        getLastDate(state) {
            if (state.lastUpdate.length)
                return state.lastUpdate[0].date;
            return '';
        },
        getStockCost: (state) => (name) => {
            for (const stock of state.lastUpdate) {
                if(stock.stock === name)
                    return parseFloat(stock.cost.split('$')[1]);
            }
            return 0;
        }
    },
    mutations:{
        setUpdate(state, update) {
            state.lastUpdate = update;
        }
    }
})

socket.on('tradeStarted', (message) => stocksStore.commit('setUpdate', message));

export default stocksStore
