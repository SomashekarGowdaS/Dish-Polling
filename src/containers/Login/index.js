import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { startLogin } from '../../actions/loginActions';
import FormFields from '../../components/FormFields';

const schema = yup.object().shape({
    userName: yup.string().required('*Enter Username'),
    password: yup.string().required('*Enter Password')
});

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
});

const Login = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(schema),
    });

    const formFields = [
        { type: 'text', name: 'userName', placeholder: 'User Name', control, register, error: errors.userName ? errors.userName : {} },
        { type: 'password', name: 'password', placeholder: 'Password', control, register, error: errors.password ? errors.password : {} }
    ];

    const onSubmit = (data) => {
        const formData = {
            ...data
        }
        dispatch(startLogin(formData, props.history.push));
    }

    return (
        <div className={classes.root} >
            <h1> Login </h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                {formFields.map(field => (
                    <FormFields key={field.name} {...field} />
                ))}
                <Button variant="contained" color="primary" type="submit">
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login