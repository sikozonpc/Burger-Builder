import React from 'react';

import classes from "./Input.module.css";


const input = (props) => {
    let inputEleme = null;
    const inputClasses = [classes.InputElement]

    if( props.invalid && props.shouldValidate && props.touched ) {
        inputClasses.push( classes.Invalid );
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid { props.valueType }</p>;
    }

    switch(props.elementType) {
        case ( "input" ):
            inputEleme = <input 
                className={inputClasses.join(" ")}
                 {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}  />;
            break;
        case ( "textarea" ):
            inputEleme = <textarea 
                className={inputClasses.join(" ")} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}  />;
            break;
        case ( "select" ):
        inputEleme = <select 
            className={inputClasses.join(" ")} 
            onChange={props.changed} >
            { props.elementConfig.options.map( e => {
                return (<option key={e.value} value={e.value}>{e.displayValue}</option>)
            }) }
            </select>;
        break;
        default:
            inputEleme = <input
                className={inputClasses.join(" ")}
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
    }

    return (
        <div className={classes.Input} > 
            <label className={classes.Label} >{props.label}</label>
            { inputEleme }
            {validationError}
        </div>
    );
};

export default input;