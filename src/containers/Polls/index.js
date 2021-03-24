import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { startCreatePoll, startEndPoll } from '../../actions/pollActions';
import AddDish from './AddDish';
import VoteDishes from './VoteDishes';
import Tabs from '../Tabs'

const PollsContainer = (props) => {
    const [activeId, setActiveId] = React.useState(0)
    const poll = useSelector((state) => {
        return state.poll;
    });
    const loggedUser = useSelector((state) => {
        return state.users.loggedUser;
    });
    const dispatch = useDispatch();

    const handleCreatePoll = () => {
        dispatch(startCreatePoll(loggedUser.userId));
    }

    const handleEndPoll = () => {
        dispatch(startEndPoll());
    }

    const handleChangeTab = (value) => {
        setActiveId(value)
    }
    return (
        <div>
            <Tabs handleChangeTab={handleChangeTab} />
            {activeId === 0 ?
                poll.pollCreated ? (
                    <div>
                        <p> Poll Created </p>
                        { poll.createdBy === loggedUser.userId && <Button variant="contained" color="secondary" onClick={handleEndPoll} >
                            End Poll
                        </Button>}
                        <AddDish />
                    </div>
                ) : (
                    <div>
                        <Button variant="contained" color="secondary" onClick={handleCreatePoll} >
                            Create Poll
                        </Button>
                        <p> Create poll to add dishes </p>
                    </div>
                )
                :
                (
                    <VoteDishes />
                )
            }
        </div>
    )
}

export default PollsContainer
