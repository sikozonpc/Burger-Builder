import React from 'react';

import classes from "./Input.module.css";


const input = (props) => {
    let inputEleme = null;

    switch(props.elementType) {
        case ( "input" ):
            inputEleme = <input 
                className={classes.InputElement} {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}  />;
            break;
        case ( "textarea" ):
            inputEleme = <textarea 
                className={classes.InputElement} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}  />;
            break;
        case ( "select" ):
        inputEleme = <select 
            className={classes.InputElement} 
            onChange={props.changed} >
            { props.elementConfig.options.map( e => {
                return (<option key={e.value} value={e.value}>{e.displayValue}</option>)
            }) }
            </select>;
        break;
        default:
            inputEleme = <input
                className={classes.InputElement}
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
    }

    return (
        <div className={classes.Input} > 
            <label className={classes.Label} >{props.label}</label>
            { inputEleme }
        </div>
    );
};

export default input;