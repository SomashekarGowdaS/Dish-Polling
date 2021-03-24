import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

function ImgMediaCard({ dish, checkIfVoted, options, isCurrentUserVoted, handleChange, isResult }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={dish.dishImage}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {dish.dishTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {dish.dishDescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {isResult ? (
                    <Typography variant="body2" color="textSecondary" component="p">
                        {dish.totalPoints}
                    </Typography>
                ) :
                    (dish.assignedPoint || checkIfVoted(dish) ? <Typography variant="body2" color="textSecondary" component="p"> {checkIfVoted(dish) || dish.assignedPoint} </Typography> :
                        options.length > 0 && !isCurrentUserVoted && (
                            <select name="rank" onChange={(e) => {
                                handleChange(e.target.value, dish.dishId);
                            }}>
                                <option value="" hidden >Select</option>
                                {options.map(option => {
                                    return <option key={option.value} value={option.value} > {option.label} </option>
                                })}
                            </select>))
                }
            </CardActions>
        </Card>
    );
}

ImgMediaCard.defaultProps = {
    options: [],
    checkIfVoted: () => { },
}

ImgMediaCard.propTypes = {
    options: PropTypes.array,
    checkIfVoted: PropTypes.func
}

export default ImgMediaCard