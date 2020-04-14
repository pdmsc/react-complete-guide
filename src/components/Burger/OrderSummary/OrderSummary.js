import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map((ingredientKey) => {
            return (
                <li key={ingredientKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
                </li>
            );
        });
    
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicius burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button buttonType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;