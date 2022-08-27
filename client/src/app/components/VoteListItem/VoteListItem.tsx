import React, { FC, useState } from 'react';
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
    const [displayIframe, setDisplayIframe] = useState(false);
    const [iframeSrc, setIframeSrc] = useState("");

    const handleClick = () => {
        setIframeSrc(!displayIframe ? "https://www.youtube.com/embed/" + props.videoId : "");
        setDisplayIframe(!displayIframe);
    }

    return <ListGroup.Item as="li" key={props.videoId}>
        <div className="d-md-flex justify-content-between align-items-center">
            <div className="ms-2 me-auto">{props.index! + 1}. {props.title}</div>
            <div className="m-2 m-md-0">
                <Button variant="primary" onClick={handleClick}><i className={"bi " + (displayIframe ? "bi-stop-fill" : "bi-play-fill")}></i></Button>
                <ButtonGroup className="ms-2">
                    <VoteButton counter={props.upvotes} action={'upvote'} voted={props.userAction === "upvote"} id={props.videoId} />
                    <Button variant="outline-secondary" style={{ minWidth: '43.2667px' }} disabled>{props.upvotes - props.downvotes}</Button>
                    <VoteButton counter={props.downvotes} action={'downvote'} voted={props.userAction === "downvote"} id={props.videoId} />
                </ButtonGroup>
            </div>
        </div>
        <div className="text-center">
            <iframe className={!displayIframe ? "d-none" : ""} src={iframeSrc} title={"YouTube video player" + props.index} frameBorder="0"></iframe>
        </div>
    </ListGroup.Item>
};

export default VoteListItem;