import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.currentPrice.toFixed(2)}</strong></p>

        {controls.map((control) => (
            <BuildControl 
                label = {control.label} 
                key = {control.type} 
                addIngredient = {() => props.addIngredient(control.type)}
                removeIngredient = {() => props.removeIngredient(control.type)}
                disabled = {props.disabledStatus[control.type]}>
            </BuildControl>
        ))}
    </div>
);

export default buildControls;