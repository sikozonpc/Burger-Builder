import React from "react";

import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

//
// Responsile for the layout and click mehtods for mobile and desktop version
//
class Layout extends React.Component{
    state = {
        showSidedrawer: false
    };

    sideDrawerClosedHandler = () => {
       this.setState({showSidedrawer: false}); 
    }
    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return { showSidedrawer: !prevState.showSidedrawer}
        }); 
     }

     
    render(){
        return(
            <>
                <Toolbar open={this.sideDrawerOpenHandler}/>
                <SideDrawer
                    open={this.state.showSidedrawer}
                    closed={this.sideDrawerClosedHandler}
                   />
                <main className={styles.Content}>
                    { this.props.children }
                </main>
            </>
        );
    } 
};

export default Layout;