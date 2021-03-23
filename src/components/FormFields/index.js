import React, { Fragment } from 'react'

const FormFields = (props) => {
    const { type, name, placeholder, register, error, label, options } = props;
    const getField = () => {
        switch (type) {
            case 'textarea': return (
                <Fragment>
                    <textarea name={name} placeholder={placeholder} ref={register} ></textarea>
                    {error && (
                        <p>{error.message}</p>
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
                        <p>{error.message}</p>
                    )}
                </Fragment>
            )
            default: return (
                <Fragment>
                    <input type={type} name={name} placeholder={placeholder} ref={register} />
                    {error && (
                        <p>{error.message}</p>
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