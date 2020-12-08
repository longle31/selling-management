import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProduct, displayProductsModal } from './productsSlice';

export const AddNewProductForm = () => {
    const dispatch = useDispatch();

    const [loadingStatus, setLoadingStatus] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        productName: '',
        productType: 'smart phone',
        price: 0,
        cost: 0,
    });


    const validation = currentProduct.productName && currentProduct.price > 0 && currentProduct.cost > 0;




    const createWarningApearance = (warningText, status) => {
        if (status === false)
            return (
                <i className="fa fa-exclamation-circle input-group-text reg-icon"
                    style={{ color: "red" }} aria-hidden="true"
                >
                </i>
            );
        else {
            return (<i className="fa fa-check input-group-text reg-icon"
                style={{ color: "green" }} aria-hidden="true"
            >
            </i>)
        }
    }


    const onSave = () => {
        setLoadingStatus(true);
        dispatch(addNewProduct(currentProduct))
            .then(() => {
                setLoadingStatus(false)
                setCurrentProduct({
                    productName: '',
                    productType: 'smart phone',
                    price: 0,
                    cost: 0,
                })
            })
            .catch(() => setLoadingStatus(false));

    }

    return (
        <div class="modal show fade " id="addNewProductForm" tabindex="-1" aria-labelledby="analysisModalLabel" aria-hidden="true"
            style={{ display: "block" }}
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="analysisModalLabel">Add New Product</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            onClick={() => dispatch(displayProductsModal(false))}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="addNewProductForm">
                            <div className='input-group flex-nowrap mb-2' >
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Product Name</span>
                                </div>

                                <input type="text" name="productName" id="productName"
                                    className="form-control" value={currentProduct.productName}
                                    onChange={e => setCurrentProduct({ ...currentProduct, productName: e.target.value })}
                                />
                                <div className="input-group-append ">

                                </div>


                            </div>
                            <div className="input-group flex-nowrap mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Type</span>
                                </div>
                                <select className="form-control" name="type" id="type"
                                    value={currentProduct.type}
                                    onChange={e => setCurrentProduct({ ...currentProduct, type: e.target.vlue })}
                                >
                                    <option value="employee">smart phone</option>
                                    <option value="technician">tablet</option>
                                </select>
                            </div>
                            <div className='input-group flex-nowrap mb-2'>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Price</span>
                                </div>

                                <input type="number" name="price" id="price"
                                    datatoggle="tooltip" title="Some tooltip text!"
                                    className="form-control" min="0" step="1"
                                    value={currentProduct.price}
                                    onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                />
                                <div className="input-group-append ">

                                </div>

                            </div>
                            <div className='input-group flex-nowrap mb-2'>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Cost</span>
                                </div>

                                <input type="number" name="cost" id="cost" className="form-control"
                                    min="0" step="1" value={currentProduct.cost}
                                    onChange={e => setCurrentProduct({ ...currentProduct, cost: e.target.value })}
                                />
                                <div className="input-group-append ">

                                </div>
                            </div>

                        </form>

                    </div>
                    <div className="modal-footer">
                        <button
                            type="button" className="btn btn-secondary" data-dismiss="modal"
                            onClick={() => dispatch(displayProductsModal(false))}
                        >
                            Close
                        </button>
                        <button
                            type="button" className="btn btn-primary"
                            disabled={!validation}
                            onClick={e => onSave(e)}
                        >
                            {loadingStatus ? <i className="fa fa-circle-o-notch fa-spin"></i> : ''}
                            &nbsp;Save
                    </button>
                    </div>

                </div>
            </div>



        </div>
    );
}