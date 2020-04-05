import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad: 1,
    cheese: 2,
    meat: 4,
    bacon: 2,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0, 
            meat: 0,
        },
        totalPrice: 5,
    };

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
    }

    removeIngredientHandler = (type) => {
        const oldIngredientQuantity = this.state.ingredients[type];

        if (oldIngredientQuantity === 0) {
            return;
        }
 
        const ingredientsModified = {
            ...this.state.ingredients,
        };
        ingredientsModified[type] = oldIngredientQuantity -1;

        const priceDecrease = INGREDIENT_PRICE[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - priceDecrease;

        this.setState({
            ingredients: ingredientsModified,
            totalPrice: newTotalPrice,
        });
    }

    render() {
        const disabledInfo = Object.keys(this.state.ingredients).reduce((disabled, ingredientKey) => {
            return {
                ...disabled, 
                [ingredientKey]: this.state.ingredients[ingredientKey] === 0 ? true : false,
            };
        }, {});

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledStatus={disabledInfo}>
                </BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder;