
const getOptions = (dishesState) => {
    const options = dishesState.map(dish => {
        return {
            dishTitle: dish.dishTitle,
            dishId: dish.dishId
        }
    });
    return options;
}

export {
    getOptions
}