import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStrategies, selectAllStrategies } from './strategiesSlice';


export const StrategiesPage = () => {
    const strategies = useSelector(selectAllStrategies);
    const status = useSelector(state => state.strategies.status);
    const error = useSelector(state => state.strategies.error);
      
    const dispatch = useDispatch();

    const productsModal = useState({
        isDisplay : false,
    });


    useEffect(()=>{
        if(status === 'idle'){
           dispatch(fetchStrategies())
        }
    }, [status]);

    let content;
    if(status === 'failed'){
        content = <tr>{error}</tr>

    }else if(status === 'succeeded'){

        content = strategies.map(strategy => 
            <tr key={strategy._id}>
                <td data-label="Strategy.ID">{strategy._id}</td>
                <td data-label="Strategy.title">{strategy.title}</td>
                <td data-label="Strategy.during">{strategy.startingDate.substring(0 ,10) + " => " + strategy.endingDate.substr(0, 10)}</td>
                <td datsa-label="Price">{strategy.totalPrice}$</td>
                <td data-label="Cost">{strategy.totalCost}$</td>
            </tr>    
        );
    }else if(status === 'loading'){
        content = <tr>loading...</tr>
    }
    

    return (
        <div className="page">
            
            <table className="responsive-table">
                <thead>
                    <th>Strategy.ID</th>
                    <th>Strategy.Title</th>
                    <th>during</th>
                    <th>totalPrice</th>
                    <th>totalCost</th>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </div>
    )


}