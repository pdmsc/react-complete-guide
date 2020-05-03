import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state= {
        loading: false,
        orders: []
    }

    componentDidMount() {
        axios.get('/orders.json').then((res) => {
            this.setState({
                loading: true
             });

            const receivedOrders = [];
            for (let orderKey in res.data) {
                receivedOrders.push({
                    ...res.data[orderKey],
                    id: orderKey,
                });
            }

            this.setState({
                loading:false,
                orders: receivedOrders,
            });

            
        }).catch((error) => {
            this.setState({
                loading: false
            });
        });
    }


    render() {
        let orders = <Spinner></Spinner>;

        if (!this.state.loading) {
            orders = this.state.orders.map((order) => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price}></Order>;
            });
        }

        return(
            <div>
                {orders}
            </div>
    );}
}

export default withErrorHandler(Orders, axios);