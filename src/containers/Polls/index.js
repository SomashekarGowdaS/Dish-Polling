import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/loginActions';
import { startCreatePoll, startEndPoll } from '../../actions/pollActions';
import AddDish from './AddDish';


const PollsContainer = (props) => {
    const poll = useSelector((state) => {
        return state.poll;
    });
    const loggedUser = useSelector((state) => {
        return state.users.loggedUser;
    });
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout(props.history.push));
    }

    const handleCreatePoll = () => {
        dispatch(startCreatePoll(loggedUser.userId));
    }

    const handleEndPoll = () => {
        dispatch(startEndPoll());
    }

    return (
        <div>
            <ul>
                <li onClick={handleLogout} > <Link to='#' > Logout </Link> </li>
            </ul>
            { poll.pollCreated ? (
                <div>
                    <p> Poll Created </p>
                    { poll.createdBy === loggedUser.userId && <button onClick={handleEndPoll} > End Poll </button>}
                    <AddDish />
                </div>
            ) : (
                <div>
                    <button onClick={handleCreatePoll} > Create Poll </button>
                    <p> Create poll to add dishes </p>
                </div>
            )}
        </div>
    )
}

export default PollsContainer
