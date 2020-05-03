import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes gooood!</h1>

            <div style={{widht:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>

            <Button buttonType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;