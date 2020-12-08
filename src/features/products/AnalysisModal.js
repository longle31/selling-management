import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { knapsack } from '../../algorithms/knapsack';
import { addNewStrategy } from '../strategies/strategiesSlice';
import { displayProductsModal, selectAllProducts } from './productsSlice';

export const AnalysisModal = () => {
    const products = useSelector(selectAllProducts);
    const dispatch = useDispatch();

    const [step, setStep] = useState(0);

    const [currentStrategy, setCurrentStrategy] = useState({
        products: [],
        totalPrice: 0,
        totalCost: 0,
        startingDate: "",
        endingDate: "",
        title: '',
    });

    const saveValiation = currentStrategy.products.length > 0 && currentStrategy.title
        && currentStrategy.startingDate && currentStrategy.endingDate && currentStrategy.endingDate.localeCompare(currentStrategy.startingDate) > 0;

    const renderedProducts = currentStrategy.products.map(product =>
        <tr key={product._id}>
            <td>{product.productName}</td>
            <td>{product.price}</td>
            <td>{product.cost}</td>
        </tr>);

    const analyze = () => {


        let input = products.sort((a, b) => a.cost - b.cost);

        const solution = knapsack(input, currentStrategy.totalCost);
        setCurrentStrategy({
            ...currentStrategy, totalPrice: solution.maxValue, products: solution.set,
            totalCost: solution.set.reduce((total, p) => { return total + p.cost }, 0)
        });

        setStep(step + 1);
    }

    const save = () => {
        
        dispatch(addNewStrategy(currentStrategy));
        setCurrentStrategy({
            products: [],
            totalPrice: 0,
            totalCost: 0,
            startingDate: "",
            endingDate: "",
            title: '',})
        setStep(0);
    }


    return (
        <div class="modal show fade " id="analysisModal" tabindex="-1" aria-labelledby="analysisModalLabel" aria-hidden="true"
            style={{ display: "block" }}
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="analysisModalLabel">Analyze</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            onClick={() => dispatch(displayProductsModal(false))}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <form>
                            <div className="input-group flex-nowrap mb-2">

                                <span class="label input-group-text">Total Cost</span>

                                <input type="number" min="0" step="1" name="cost" value={currentStrategy.totalCost}
                                    id="cost" className="form-control" onChange={(e) => setCurrentStrategy({ ...currentStrategy, totalCost: e.target.value })}
                                />
                            </div>
                            {step !== 0 ?
                                <div>
                                    <div className="input-group flex-nowrap mb-2">
                                        <span class="label input-group-text">Begin Date</span>
                                        <input type="date" name="beginDate" id="beginDate" className="form-control"
                                            value={currentStrategy.startingDate}
                                            onChange={e => setCurrentStrategy({ ...currentStrategy, startingDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="input-group flex-nowrap mb-2">
                                        <span class="label input-group-text">End Date</span>
                                        <input type="date" name="endDate" id="endDate" className="form-control"
                                            value={currentStrategy.endingDate}
                                            onChange={e => setCurrentStrategy({ ...currentStrategy, endingDate: e.target.value })}
                                        />
                                    </div>

                                    <div className="input-group flex-nowrap mb-2">
                                        <span class="label input-group-text">Title</span>
                                        <input type="text" name="title" id="title" className="form-control"
                                            value={currentStrategy.title}
                                            onChange={e => setCurrentStrategy({ ...currentStrategy, title: e.target.value })}
                                        />
                                    </div>
                                </div>
                                : ""}

                        </form>


                        <table className="table table-bordered table-hover assign-table">
                            <thead className="bg-success">
                                <tr>
                                    <th>pro.name</th>
                                    <th>price</th>
                                    <th>cost</th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {renderedProducts}

                            </tbody>
                        </table>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={() => dispatch(displayProductsModal(false))}
                        >Close</button>
                        {step > 0 ? <button type="button" class="btn btn-danger"
                            data-dismiss="modal"
                            onClick={() => step > 0 ? setStep(step - 1) : ""}
                        >Previous</button> : ""}


                        <button type="button" className={step === 0 ? "btn btn-warning" : "btn btn-primary"}
                            onClick={parseInt(step) === 0 ? analyze : save}
                            disabled={step === 0 ? !currentStrategy.totalCost > 0 : (step === 1) ? !saveValiation : ""}
                        >
                            {step === 0 ? "Analyze" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}