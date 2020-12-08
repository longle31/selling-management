import { client } from "../../api/client";

const { createSlice, createEntityAdapter, createAsyncThunk } = require("@reduxjs/toolkit");


const productsAdapter = createEntityAdapter({
    selectId: customer => customer._id,
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ()=>{
    const response = await client.get("api/products");

    return response.products;
})

export const addNewProduct = createAsyncThunk('products/addNewProduct', async product => {
    const response = await client.post("api/products", {product});
    return response.product;
})

const productsModal = {
    isDisplay: false,
    modalOption : 1
}
const initialState = 
 productsAdapter.getInitialState({
    status: 'idle',
    error: null,
    productsModal,
})

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        displayProductsModal :(state, action)=>{
            state.productsModal.isDisplay = action.payload;
        },
        setProductModalOption : (state, action)=>{
            state.productsModal.modalOption = action.payload;
        }
    },
    extraReducers:{
        [fetchProducts.fulfilled]:(state, action)=>{
            state.status = 'succeeded';
            productsAdapter.upsertMany(state, action.payload);
        },
        [fetchProducts.pending]:(state, action)=>{
            state.status = 'loading';
        },
        [fetchProducts.rejected] :(state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        },
        [addNewProduct.fulfilled] :(state ,action) => productsAdapter.addOne(state, action.payload)

        

    }
});


export const {
    displayProductsModal,
    setProductModalOption
} = productSlice.actions;

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds,
} = productsAdapter.getSelectors(state => state.products)

export default productSlice.reducer;