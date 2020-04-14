import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosed = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggeHandler = () => {
        this.setState((oldState) => {
            return {showSideDrawer: !oldState.showSideDrawer};
        });
    }
    
    render() {
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggeHandler}/>

                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosed}/>
                
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

export default Layout;