import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../algorithms/knapsack';
import { knapsack } from '../../algorithms/knapsack';
import { AddNewProductForm } from './AddNewProductForm';
import { AnalysisModal } from './AnalysisModal';
import { fetchProducts, selectAllProducts } from './productsSlice';

export const ProductsPage = () => {
    const products = useSelector(selectAllProducts);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    const modalDisplayed = useSelector(state => state.products.productsModal.isDisplay);
    const modalOption  = useSelector(state => state.products.productsModal.modalOption);


    useEffect(()=>{
        if(status === 'idle'){
            dispatch(fetchProducts())
        }
    }, [status]);

    let content;
    if(status === 'failed'){
        content = <tr>{error}</tr>

    }else if(status === 'succeeded'){

        content = products.map(product => 
            <tr key={product._id}>
                <td data-label="Pro.ID">{product._id}</td>
                <td data-label="Pro.Name">{product.productName}</td>
                <td data-label="Pro.Type">{product.productType}</td>
                <td datsa-label="Price">{product.price}$</td>
                <td data-label="Cost">{product.cost}$</td>
            </tr>    
        );
    }else if(status === 'loading'){
        content = <tr>loading...</tr>
    }
    


    return (
        <div className={modalDisplayed?"page modal-open":"page"}>
            {modalDisplayed? modalOption === 0 ? <AnalysisModal/> : <AddNewProductForm/> :""}
            <table className="responsive-table">
                <thead>
                    <th>Pro.ID</th>
                    <th>Pro.Name</th>
                    <th>Pro.Type</th>
                    <th>Price</th>
                    <th>Cost</th>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </div>
    )


}