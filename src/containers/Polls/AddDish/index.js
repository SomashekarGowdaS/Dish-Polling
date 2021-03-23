import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import FormFields from '../../../components/FormFields';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { startAddDishes } from '../../../actions/dishesActions';

const schema = yup.object().shape({
    dishOneTitle: yup.string().required('*Enter Title'),
    dishOneDescription: yup.string().required('*Enter Description'),
    dishTwoTitle: yup.string().required('*Enter Title'),
    dishTwoDescription: yup.string().required('*Enter Description')
});

const AddDish = (props) => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const loggedUser = useSelector((state) => {
        return state.users.loggedUser;
    });
    const dishes = useSelector((state) => {
        return state.dishes;
    });
    const [selectedUserDishes, setSelectedUserDishes] = useState([]);
    const [enableCameraforDishOne, setEnableCameraforDishOne] = useState(false);
    const [enableCameraforDishTwo, setEnableCameraforDishTwo] = useState(false);
    const [imgSrcDishOne, setImgSrcDishOne] = useState('');
    const [imgSrcDishTwo, setImgSrcDishTwo] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const selectedUserDishes = dishes.filter(dish => {
            return dish.createdBy === loggedUser.userId;
        });
        setSelectedUserDishes(selectedUserDishes);
    }, []);

    const formFieldsForDishOne = [
        { type: 'text', name: 'dishOneTitle', placeholder: 'Dish One Title', register, error: errors.dishOneTitle ? errors.dishOneTitle : {} },
        { type: 'textarea', name: 'dishOneDescription', placeholder: 'Dish One Description', register, error: errors.dishOneDescription ? errors.dishOneDescription : {} }
    ];

    const formFieldsForDishTwo = [
        { type: 'text', name: 'dishTwoTitle', placeholder: 'Dish Two Title', register, error: errors.dishTwoTitle ? errors.dishTwoTitle : {} },
        { type: 'textarea', name: 'dishTwoDescription', placeholder: 'Dish Two Description', register, error: errors.dishTwoDescription ? errors.dishTwoDescription : {} }
    ];

    const handleTakePhotoforDishOne = (dataUri) => {
        setImgSrcDishOne(dataUri);
        setEnableCameraforDishOne(false);
    }

    const handleTakePhotoforDishTwo = (dataUri) => {
        setEnableCameraforDishTwo(false);
        setImgSrcDishTwo(dataUri);
    }

    const onSubmit = (data) => {
        const formDataOne = {
            dishId: v4(),
            createdBy: loggedUser.userId,
            dishTitle: data.dishOneTitle,
            dishDescription: data.dishOneDescription,
            totalPoints: 0,
            votedBy: []
        }
        const formDataTwo = {
            dishId: v4(),
            createdBy: loggedUser.userId,
            dishTitle: data.dishTwoTitle,
            dishDescription: data.dishTwoDescription,
            totalPoints: 0,
            votedBy: []
        }
        dispatch(startAddDishes(formDataOne, formDataTwo));
        alert('Dish Added');
        setSelectedUserDishes([...selectedUserDishes, formDataOne, formDataTwo]);
    }

    return (
        <div>
            { selectedUserDishes.length >= 2 ? (
                <p> Maximum number of dishes added </p>
            ) : (
                <div>
                    <h3> Add Dish </h3>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        {enableCameraforDishOne ? (
                            <Camera
                                onTakePhoto={(dataUri) => { handleTakePhotoforDishOne(dataUri) }}
                                onCameraStop={() => { console.log('stop') }}
                            />
                        ) : (
                            <div>
                                <img src={imgSrcDishOne} width="100" height="100" />
                                <button onClick={() => {
                                    setEnableCameraforDishOne(true);
                                }} >Take Photo</button>
                            </div>
                        )}
                        {formFieldsForDishOne.map(field => (
                            <div key={field.name} >
                                <FormFields {...field} />
                            </div>
                        ))}
                        {enableCameraforDishTwo ? (
                            <Camera
                                onTakePhoto={(dataUri) => { handleTakePhotoforDishTwo(dataUri); }}
                            />
                        ) : (
                            <div>
                                <img src={imgSrcDishTwo} width="100" height="100" />
                                <button onClick={() => {
                                    setEnableCameraforDishTwo(true);
                                }} >Take Photo</button>
                            </div>
                        )}
                        {formFieldsForDishTwo.map(field => (
                            <div key={field.name} >
                                <FormFields {...field} />
                            </div>
                        ))}
                        <input type="submit" value="Submit Dishes" />
                    </form>
                </div>
            )}
        </div>
    )
}

export default AddDish