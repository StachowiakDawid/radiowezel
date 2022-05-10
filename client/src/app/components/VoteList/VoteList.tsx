import React, { FC } from 'react';
//import { useAppSelector } from '../../hooks';
import VoteListItem, { VoteListItemProps } from '../VoteListItem/VoteListItem';
import { ListGroup } from 'react-bootstrap';

interface VoteListProps {
    list: Array<VoteListItemProps>
}

const VoteList: FC<VoteListProps> = (props) => {
    return <div className="col-sm-12">
        <ListGroup as="ul">
            {props.list.map((item: VoteListItemProps, index: number) => (
                <VoteListItem {...item} key={item.videoId} index={index}  />
            ))}
        </ListGroup>
    </div>
};

export default VoteList;