import { client } from "../../api/client";

const { createSlice, createEntityAdapter, createAsyncThunk } = require("@reduxjs/toolkit");


export const addNewStrategy = createAsyncThunk('strategies/addNewStrategy', async strategy => {
    const response = await client.post('api/strategies', {strategy});
    return response.strategy;
});

export const fetchStrategies = createAsyncThunk('strategies/fetchStrategies', async () => {
    const response = await client.get('api/strategies');
    return response.strategies;
});

const strategiesAdapter = createEntityAdapter({
    selectId: strategy => strategy._id,
})

const initialState = strategiesAdapter.getInitialState({
    status: 'idle',
    error: null,
})

const strategiesSlice = createSlice({
    name: 'strategies',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchStrategies.rejected] : (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        },
        [fetchStrategies.pending] : (state, action)=>{
            state.status = 'loading';
            
        },
        [fetchStrategies.fulfilled] : (state, action)=>{
            state.status = 'succeeded';
            strategiesAdapter.upsertMany(state, action.payload);
        },
       [addNewStrategy.fulfilled]: 
       (state, action) => strategiesAdapter.addOne(state, action.payload)
    }
});


export const {
    selectAll: selectAllStrategies,
    selectIds: selectStrategyIds,
    selectById: selectStrategyById,
} = strategiesAdapter.getSelectors(state => state.strategies)

export default strategiesSlice.reducer;