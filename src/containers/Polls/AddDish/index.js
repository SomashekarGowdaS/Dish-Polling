import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Camera from 'react-html5-camera-photo';
import { makeStyles } from '@material-ui/core/styles';
import 'react-html5-camera-photo/build/css/index.css';
import Button from '@material-ui/core/Button';
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

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    innerEle: {
        display: 'inline-block',
        margin: '10px'
    },
    outerEle: {
        display: 'block'
    }
});

const AddDish = (props) => {
    const classes = useStyles();
    const { register, handleSubmit, errors, control } = useForm({
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
    }, [dishes, loggedUser.userId]);

    const formFieldsForDishOne = [
        { type: 'text', name: 'dishOneTitle', placeholder: 'Dish One Title', control, register, error: errors.dishOneTitle ? errors.dishOneTitle : {} },
        { type: 'textarea', name: 'dishOneDescription', placeholder: 'Dish One Description', register, error: errors.dishOneDescription ? errors.dishOneDescription : {} }
    ];

    const formFieldsForDishTwo = [
        { type: 'text', name: 'dishTwoTitle', placeholder: 'Dish Two Title', control, register, error: errors.dishTwoTitle ? errors.dishTwoTitle : {} },
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
            dishImage: imgSrcDishOne,
            createdBy: loggedUser.userId,
            dishTitle: data.dishOneTitle,
            dishDescription: data.dishOneDescription,
            totalPoints: 0,
            votedBy: []
        }
        const formDataTwo = {
            dishId: v4(),
            dishImage: imgSrcDishTwo,
            createdBy: loggedUser.userId,
            dishTitle: data.dishTwoTitle,
            dishDescription: data.dishTwoDescription,
            totalPoints: 0,
            votedBy: []
        }
        dispatch(startAddDishes(formDataOne, formDataTwo));
        alert('Dishes Added');
        setSelectedUserDishes([...selectedUserDishes, formDataOne, formDataTwo]);
    }

    return (
        <div className={classes.root} >
            { selectedUserDishes.length >= 2 ? (
                <p> Maximum number of dishes added </p>
            ) : (
                <div >
                    <h1> Add Dish </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.outerEle} >
                        <div className={classes.innerEle} >
                            {enableCameraforDishOne ? (
                                <Camera
                                    onTakePhoto={(dataUri) => { handleTakePhotoforDishOne(dataUri) }}
                                />
                            ) : (
                                <div >
                                    { imgSrcDishOne && <img alt="dish1" src={imgSrcDishOne} width="100" height="100" />}
                                    <Button variant="contained" onClick={() => {
                                        setEnableCameraforDishOne(true);
                                    }} >
                                        Take Photo
                                </Button>
                                </div>
                            )}
                            {formFieldsForDishOne.map(field => (
                                <div key={field.name} >
                                    <FormFields {...field} />
                                </div>
                            ))}
                        </div>
                        <div className={classes.innerEle} >
                            {enableCameraforDishTwo ? (
                                <Camera
                                    onTakePhoto={(dataUri) => { handleTakePhotoforDishTwo(dataUri); }}
                                />
                            ) : (
                                <div>
                                    { imgSrcDishTwo && <img alt="dish2" src={imgSrcDishTwo} width="100" height="100" />}
                                    <Button variant="contained" onClick={() => {
                                        setEnableCameraforDishTwo(true);
                                    }} >
                                        Take Photo
                                </Button>
                                </div>
                            )}
                            {formFieldsForDishTwo.map(field => (
                                <div key={field.name} >
                                    <FormFields {...field} />
                                </div>
                            ))}
                        </div>
                        <Button variant="contained" color="primary" type="submit">
                            Submit Dishes
                        </Button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AddDish