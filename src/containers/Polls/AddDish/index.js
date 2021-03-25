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
import { startAddDish } from '../../../actions/dishesActions';

const schema = yup.object().shape({
    dishTitle: yup.string().required('*Enter Title'),
    dishDescription: yup.string().required('*Enter Description')
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
    const { register, handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const loggedUser = useSelector((state) => {
        return state.users.loggedUser;
    });
    const dishes = useSelector((state) => {
        return state.dishes;
    });
    const [selectedUserDishes, setSelectedUserDishes] = useState([]);
    const [dishImage, setDishImage] = useState('');
    const [enableCamera, setEnableCamera] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const selectedUserDishes = dishes.filter(dish => {
            return dish.createdBy === loggedUser.userId;
        });
        setSelectedUserDishes(selectedUserDishes);
    }, [dishes, loggedUser.userId]);

    const formFieldsForDishOne = [
        { type: 'text', name: 'dishTitle', placeholder: 'Dish One Title', control, register, error: errors.dishTitle ? errors.dishTitle : {} },
        { type: 'textarea', name: 'dishDescription', placeholder: 'Dish One Description', register, error: errors.dishDescription ? errors.dishDescription : {} }
    ];

    const handleTakePhoto = (dataUri) => {
        setDishImage(dataUri);
        setEnableCamera(false);
    }

    const onSubmit = (data, e) => {
        const formData = {
            dishId: v4(),
            dishImage: dishImage,
            createdBy: loggedUser.userId,
            dishTitle: data.dishTitle,
            dishDescription: data.dishDescription,
            totalPoints: 0,
            votedBy: []
        }
        dispatch(startAddDish(formData));
        alert('Dish Added');
        setSelectedUserDishes([...selectedUserDishes, formData]);
        e.target.reset();
        setDishImage('');
        reset({
            dishTitle: ""
        });
    }

    return (
        <div className={classes.root} >
            { selectedUserDishes.length >= 2 ? (
                <p> Maximum number of dishes added </p>
            ) : (
                <div >
                    <h1> Add Dish </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.outerEle} >
                        {enableCamera ? (
                            <Camera
                                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri) }}
                            />
                        ) : (
                            <div >
                                { dishImage && <img alt="dish1" src={dishImage} width="100" height="100" />}
                                <Button variant="contained" onClick={() => {
                                    setEnableCamera(true);
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
                        <Button variant="contained" color="primary" type="submit">
                            Submit Dish {selectedUserDishes.length + 1}
                        </Button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AddDish