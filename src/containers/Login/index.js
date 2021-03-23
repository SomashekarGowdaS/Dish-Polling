import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { startLogin } from '../../actions/loginActions';
import FormFields from '../../components/FormFields';

const schema = yup.object().shape({
    userName: yup.string().required('*Enter Username'),
    password: yup.string().required('*Enter Password')
});

const Login = (props) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const formFields = [
        { type: 'text', name: 'userName', placeholder: 'User Name', register, error: errors.userName ? errors.userName : {} },
        { type: 'password', name: 'password', placeholder: 'Password', register, error: errors.password ? errors.password : {} }
    ];

    const onSubmit = (data) => {
        const formData = {
            ...data
        }
        dispatch(startLogin(formData, props.history.push));
    }

    return (
        <div>
            <h1> Login </h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                {formFields.map(field => (
                    <FormFields key={field.name} {...field} />
                ))}
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login