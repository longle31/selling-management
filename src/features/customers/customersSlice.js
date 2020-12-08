import { client } from "../../api/client";

const { createSlice, createEntityAdapter, createAsyncThunk } = require("@reduxjs/toolkit");


const customersAdapter = createEntityAdapter({
    selectId: customer => customer._id,
})

export const fetchCustomers = createAsyncThunk('customers/fetchCustomer', async ()=>{
    const response = await client.get('api/customers');
    return response.customers;
})

const initialState = customersAdapter.getInitialState({
    status: 'idle',
    error: null,
})

const customersSlice = createSlice({
    name:'customers',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchCustomers.fulfilled]:(state, action)=>{
            state.status = 'succeeded';
            customersAdapter.updateMany(state, action.payload);
        },
        [fetchCustomers.pending]:(state, action)=>{
            state.status = 'loading';
        },
        [fetchCustomers.rejected] :(state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        }

        

    }
});


export const {
    selectAll: selectAllCustomers,
    selectById: selectCustomerById,
    selectIds: selectAllIds, 
} = customersAdapter.getSelectors(state => state.customers)

export default customersSlice.reducer;