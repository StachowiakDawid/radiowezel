import React, { FC, useRef } from 'react';
import VoteButton from '../VoteButton/VoteButton';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap';

export interface VoteListItemProps {
    title: string,
    upvotes: number,
    downvotes: number,
    userAction: string,
    videoId: string,
    index?: number
}

const VoteListItem: FC<VoteListItemProps> = (props) => {
    const playButtonRef = useRef<HTMLButtonElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleClick = () => {
        if (iframeRef.current?.classList.contains("d-none")) {
            iframeRef.current!.src = "https://www.youtube.com/embed/" + props.videoId;
            iframeRef.current?.classList.remove("d-none");
            playButtonRef.current?.firstElementChild?.classList.remove("bi-play-fill");
            playButtonRef.current?.firstElementChild?.classList.add("bi-stop-fill");
        } else {
            iframeRef.current!.src = "";
            iframeRef.current?.classList.add("d-none");
            playButtonRef.current?.firstElementChild?.classList.remove("bi-stop-fill");
            playButtonRef.current?.firstElementChild?.classList.add("bi-play-fill");
        }
    }

    return <ListGroup.Item as="li" key={props.videoId}>
        <div className="d-md-flex justify-content-between align-items-center">
            <div className="ms-2 me-auto">{props.index! + 1}. {props.title}</div>
            <div className="m-2 m-md-0">
                <Button variant="primary" onClick={handleClick} ref={playButtonRef}><i className='bi bi-play-fill'></i></Button>
                <ButtonGroup className="ms-2">
                    <VoteButton counter={props.upvotes} action={'upvote'} voted={props.userAction === "upvote"} id={props.videoId} />
                    <Button variant="outline-secondary" style={{ minWidth: '43.2667px' }} disabled>{props.upvotes - props.downvotes}</Button>
                    <VoteButton counter={props.downvotes} action={'downvote'} voted={props.userAction === "downvote"} id={props.videoId} />
                </ButtonGroup>
            </div>
        </div>
        <div className="text-center">
            <iframe ref={iframeRef} className="d-none" src="https://www.youtube.com/embed/JEjV-DywL_8" title={"YouTube video player" + props.index} frameBorder="0"></iframe>
        </div>
    </ListGroup.Item>
};

export default VoteListItem;