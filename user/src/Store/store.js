import { createStore } from 'vuex'

const userStore = createStore({
    state () {
        return {
            userName: localStorage.getItem('user'),
            money: 0,
            stocks: [],
            super: false
        }
    },
    getters: {
        getStocks (state) {
            return state.stocks;
        },
        getStock: (state) => (name) => {
            for (const stock of state.stocks){
                if (stock.stock === name) {
                    return {
                        set: true,
                        count: stock.count,
                        cost: stock.bought
                    }
                }
            }
            return {
                set: false,
                count: 0,
                cost: 0
            };
        }
    },
    mutations: {
        setUser (state) {
            state.userName = localStorage.getItem('user');
            if (!state.userName)
                return;
            fetch('http://localhost:4000/getbroker' + state.userName)
                .then(res => res.json())
                .then(data => {
                    state.money = data.startMoney;
                    state.stocks = data.stocks;
                    state.super = data.super;
                });
        }
    }
})

export default userStore