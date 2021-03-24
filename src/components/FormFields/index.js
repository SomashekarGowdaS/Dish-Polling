import React, { Fragment } from 'react'
import { Controller } from "react-hook-form";
import { Input } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    errorMessage: {
        color: 'red'
    },
});

const FormFields = (props) => {
    const classes = useStyles();
    const { type, name, placeholder, register, error, label, options, control } = props;
    const getField = () => {
        switch (type) {
            case 'textarea': return (
                <Fragment>
                    <textarea name={name} placeholder={placeholder} ref={register} ></textarea>
                    {error && (
                        <p className={classes.errorMessage} >{error.message}</p>
                    )}
                </Fragment>
            )
            case 'select': return (
                <Fragment>
                    <label> {label} </label>
                    <select name={name} ref={register} >
                        <option value="" hidden >Select</option>
                        {options.map(option => {
                            return <option key={option.dishId} value={option.dishId} > {option.dishTitle} </option>
                        })}
                    </select> <br />
                    {error && (
                        <p className={classes.errorMessage} >{error.message}</p>
                    )}
                </Fragment>
            )
            default: return (
                <Fragment>
                    <Controller
                        as={Input}
                        type={type}
                        name={name}
                        control={control}
                        defaultValue=""
                        placeholder={placeholder}
                    />
                    {error && (
                        <p className={classes.errorMessage} >{error.message}</p>
                    )}
                </Fragment>
            )
        }
    }
    return (
        getField()
    )
}

export default FormFields