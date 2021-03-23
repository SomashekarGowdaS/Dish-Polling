import React, { Fragment } from 'react'

const FormFields = (props) => {
    const { type, name, placeholder, register, error } = props;
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