import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 1.0,
    cheese: 2.5,
    meat: 4.25,
    bacon: 1.99,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5.00,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
    };
    
    componentDidMount() {
        axios.get('ingredients.json').then((response) => {
            this.setState({
                ingredients: response.data
            });
        })
        .catch((error) =>{
            this.setState({
                error: true,
            });
        });
    }

    updatePurchaseableState = (ingredients) => {
        //passing the ingredients instead of using the state, to avoid using an old state
        const ingredientsAmount = Object.keys(ingredients).reduce((amount, ingredient) => {
            return amount + ingredients[ingredient];
        }, 0);

        this.setState({ purchaseable: ingredientsAmount > 0 });
    }

    addIngredientHandler = (type) => {
        const oldIngredientQuantity = this.state.ingredients[type];
        const ingredientsModified = {
            ...this.state.ingredients,
        };
        ingredientsModified[type] = oldIngredientQuantity + 1;

        const priceIncrease = INGREDIENT_PRICE[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + priceIncrease;

        this.setState({
            ingredients: ingredientsModified,
            totalPrice: newTotalPrice,
        });

        this.updatePurchaseableState(ingredientsModified);
    }

    removeIngredientHandler = (type) => {
        const oldIngredientQuantity = this.state.ingredients[type];

        if (oldIngredientQuantity === 0) {
            return;
        }

        const ingredientsModified = {
            ...this.state.ingredients,
        };
        ingredientsModified[type] = oldIngredientQuantity - 1;

        const priceDecrease = INGREDIENT_PRICE[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - priceDecrease;

        this.setState({
            ingredients: ingredientsModified,
            totalPrice: newTotalPrice,
        });

        this.updatePurchaseableState(ingredientsModified);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        //add total price to query params
        queryParams.push(encodeURIComponent('totalPrice') + '=' + encodeURIComponent(this.state.totalPrice));

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        let burger = this.state.error ? 
                <p>Ingredients can't be loaded! Try again later!</p> :
                <Spinner></Spinner>;

        let orderSummary = null;

        if (this.state.ingredients) {
            const disabledInfo = Object.keys(this.state.ingredients).reduce((disabled, ingredientKey) => {
                return {
                    ...disabled,
                    [ingredientKey]: this.state.ingredients[ingredientKey] === 0 ? true : false,
                };
            }, {});    

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}></Burger>
    
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        order={this.purchaseHandler}
                        disabledStatus={disabledInfo}
                        currentPrice={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}>
                    </BuildControls>
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.state.ingredients} cancelPurchase={this.purchaseCancelHandler} continuePurchase={this.purchaseContinueHandler} price={this.state.totalPrice}></OrderSummary>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>;
        }
      

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);