import React, { FC, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { isAddItemModalOpened, hideAddItemModal } from '../../redux/addItemModalSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { setVoteList } from '../../redux/voteListSlice';

interface AddItemModalProps { }
const getYoutubeVideoId = (url: string): string => {
    return /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm.exec(url)?.[3] ?? '';
}

const AddItemModal: FC<AddItemModalProps> = (props) => {
    const [input, setInput] = useState('');
    const show = useAppSelector(isAddItemModalOpened);
    const [formMessage, setFormMessage] = useState('');
    const dispatch = useAppDispatch();
    const handleClose = () => {
        setFormMessage("");
        dispatch(hideAddItemModal())
    };
    const [addSong] = useMutation(gql`mutation addSong($id: String!) {
        addSong(id: $id)
      }`);
    const [getVoteList] = useLazyQuery(gql`query songs($userId: String!) {
        songs(userId: $userId) {
                title, upvotes, downvotes, userAction, videoId
        }
      }`, { variables: { userId: sessionStorage.getItem("userId") } });

    const handleClick = () => {
        addSong({ variables: { id: getYoutubeVideoId(input) } }).then(async (response) => {
            const data = await getVoteList();
            dispatch(setVoteList([...data.data.songs]));
            response.data.addSong === 'Added' ? handleClose() : setFormMessage(response.data.addSong);
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormMessage('');
        setInput(e.target.value);
    }

    return <>
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add your song:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Text className="text-muted">
                        <Form.Control type="text" placeholder="Write URL:" onChange={handleInputChange} />
                    </Form.Text>
                </Form.Group>
                {formMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleClick} disabled={getYoutubeVideoId(input) === ''}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    </>
};

export default AddItemModal;
