import {createSlice, configureStore} from "@reduxjs/toolkit";

const stocksSlice = createSlice({
    name: 'stocks',
    initialState: [],
    reducers: {
        addStock: (state, action) => {
            state.push(action.payload);
        },
        delStock: (state, action) => {
            let index = 0;
            for (let stock of state) {
                if (stock === action.payload)
                    break;
                ++index;
            }
            state.splice(index, 1);
        }
    }
});

const { addStock, delStock } = stocksSlice.actions

const storeStocks = configureStore({
    reducer: stocksSlice.reducer
});
storeStocks.subscribe(() => console.info(storeStocks.getState()))

export { addStock, delStock, storeStocks }