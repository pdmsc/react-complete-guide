import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const propsIngredients = props.ingredients;

    let burgerIngredients = Object.keys(propsIngredients).map((ingKey) => {
        return [...new Array(propsIngredients[ingKey])].map((_, i) => {
            return <BurgerIngredient type={ingKey} key={ingKey+i}></BurgerIngredient>
        });
    }).reduce((finalArray, arrayPerKey) => {
        // Reducing to flatten the array... easier to calculate the amount
        return finalArray.concat(arrayPerKey);
    }, []);

    if (burgerIngredients.length === 0) {
        burgerIngredients = <p>Please start adding ingredients!</p>
    }
 
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'></BurgerIngredient>

            {burgerIngredients}

            <BurgerIngredient type='bread-bottom'></BurgerIngredient>
        </div>
    );
};

export default burger;