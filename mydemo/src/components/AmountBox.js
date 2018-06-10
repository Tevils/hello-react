import React from 'react';

const AmountBox=({text,amount})=>{
    return (
        <div className="col">
            <div className="card">
                <div className="card-header">
                {text}
                </div>
                <div className="card-body">
                {amount}
                </div>
            </div>
        </div>
    );
}

export default AmountBox;

