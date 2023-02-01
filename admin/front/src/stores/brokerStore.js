import {createSlice, configureStore} from "@reduxjs/toolkit";

const brokersSlice = createSlice({
    name: 'brokers',
    initialState: [],
    reducers: {
        loadBrokers: (state, action) => {
            for (let key in action.payload){
                state.push({id: key, value: action.payload[key]});
            }
        }
    }
});

const { loadBrokers } = brokersSlice.actions

const storeBrokers = configureStore({
    reducer: brokersSlice.reducer
});

export {brokersSlice, loadBrokers, storeBrokers}