import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { showAddItemModal } from '../../redux/addItemModalSlice';
import { gql, useLazyQuery } from '@apollo/client'
import { setVoteList } from '../../redux/voteListSlice';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const [getVoteList] = useLazyQuery(gql`query songs($userId: String!) {
    songs(userId: $userId) {
			title, upvotes, downvotes, userAction, videoId
    }
  }`, { variables: { userId: sessionStorage.getItem("userId") } });

  const handleClick = async () => {
    const data = await getVoteList();
    dispatch(setVoteList([...data.data.songs]));
  }
  return <>
    <div className="col-sm-12 d-flex justify-content-between align-items-center mb-2 mt-2">
      <span className="me-auto">Now playing: lorem ipsum dolor sit amet</span>
      <span className="ms-auto me-auto">Until the end: 2:00 </span>
      <button type="button" className="btn btn-primary me-2" onClick={handleClick}><i className="bi bi-arrow-clockwise"></i></button>
      <button type="button" className="btn btn-primary" onClick={() => dispatch(showAddItemModal())}><i className="bi bi-plus-square"></i></button>
    </div>
  </>
};

export default Header;


