import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => {
    const propDataAdd = { ['data-add-'+props.label] : props.label };
    const propDataRemove = { ['data-remove-'+props.label] : props.label };

    return (
        <div className={classes.BuildControl} >
            <div className={classes.Label}>{props.label}</div>
            
            <button
                {...propDataRemove}
                className={classes.Less}
                onClick={props.removeIngredient}
                disabled={props.disabled}>
                Less
            </button>

            <button
                {...propDataAdd}
                className={classes.More}
                onClick={props.addIngredient}>
                More
            </button>
        </div>
    );
}
export default buildControl;