import React from 'react'
import {observer} from "mobx-react-lite";
import OrderItemElement from './orderItemElement';

const OrderItemList = observer(({order}) => {
    return (
        <div 
            style={{
                height: 200, 
                overflow: 'auto'
            }}
        >
            {order.items.map(item =>
                <OrderItemElement key={item.id} item={item}/>
            )}
        </div>
    );
});

export default OrderItemList;