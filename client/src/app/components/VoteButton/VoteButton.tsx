import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { Button } from 'react-bootstrap';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { setVoteList } from '../../redux/voteListSlice';

interface VoteButtonProps {
    action: string,
    counter: number,
    voted?: boolean,
    id: string
}

const VoteButton: FC<VoteButtonProps> = (props) => {
    const dispatch = useAppDispatch();
    const [addVote] = useMutation(gql`mutation addVote($userId: String!, $type: String!, $videoId: String!) {
        addVote(userId: $userId, type: $type, videoId: $videoId)
      }`);
    const [resignVote] = useMutation(gql`mutation resignVote($userId: String!, $videoId: String!) {
        resignVote(userId: $userId, videoId: $videoId)
      }`);
    const [getVoteList] = useLazyQuery(gql`query songs($userId: String!) {
        songs(userId: $userId) {
                title, upvotes, downvotes, userAction, videoId
        }
      }`, { variables: { userId: sessionStorage.getItem("userId") } });

    const handleClick = () => {
        if (props.voted === false) {
            addVote({ variables: { videoId: props.id, userId: sessionStorage.getItem("userId"), type: props.action } }).then(async () => {
                const data = await getVoteList();
                dispatch(setVoteList([...data.data.songs]));
            });
        } else {
            resignVote({ variables: { videoId: props.id, userId: sessionStorage.getItem("userId") } }).then(async () => {
                const data = await getVoteList();
                dispatch(setVoteList([...data.data.songs]));
            });
        }
    }

    return <Button variant={`${props.voted ? '' : 'outline-'}${props.action === 'upvote' ? 'success' : 'danger'}`} onClick={handleClick} style={{ maxWidth: '42px' }}>
        <i className={`bi bi-arrow-${props.action === 'upvote' ? 'up' : 'down'}-square`}></i>
    </Button>
};

export default VoteButton;