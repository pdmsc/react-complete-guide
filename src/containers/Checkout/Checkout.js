import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state= {
        ingredients: null,
        totalPrice: 0,
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);

        const ingredientsParams = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'totalPrice') {
                price = param[1];
                
                this.setState({
                    totalPrice: price
                }); 
            } else {
                //super important to parse to int the value, using the + symbol
                ingredientsParams[param[0]]= +param[1];
            }
        }
        
        this.setState({
            ingredients: ingredientsParams
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>

                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} {...props}/>)}>
                </Route>

            </div>

        );
    }
}

export default Checkout;