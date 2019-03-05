import React from "react";

import classes from "./Modal.module.css";

import Backdrop from "../Backdrop/Backdrop";


const modal = (props) => {
    console.log("Updated @Modal!");
    return(
        <>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0",
                    backgroundColor: "rgb(236, 177, 89)",
                    border: "1px solid #966909"
                }}
                >
                {props.children}
            </div>
        </>
    );
};

/*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
function shouldUpadte(prevProps, nextProps){
    return (prevProps.show === nextProps.show || (prevProps.children !== nextProps.children));
}


// Only renders if props change, same as shouldComponentUpdate in class based comps.
export default modal