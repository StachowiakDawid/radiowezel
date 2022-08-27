import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import VoteList from '../../app/components/VoteList/VoteList';
import Header from '../../app/components/Header/Header';
import { setVoteList, getVoteList } from '../../app/redux/voteListSlice';
import AddItemFormModal from '../../app/components/AddItemModal/AddItemModal';
import { Container, Row } from 'react-bootstrap';
import { useQuery, gql, useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid';

interface MainPageProps { }

const MainPage: FC<MainPageProps> = () => {
  const voteList = useAppSelector(getVoteList);
  const dispatch = useAppDispatch();
  
  const data = useQuery(gql`query songs($userId: String!) {
    songs(userId: $userId) {
			title, upvotes, downvotes, userAction, videoId
    }
  }`, { variables: { userId: sessionStorage.getItem("userId") } }).data;

  const [addUser] = useMutation(gql`mutation addUser($id: String!) {
    addUser(id: $id) { id }
  }`);

  useEffect(() => {}, [voteList]);

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      sessionStorage.setItem("userId", uuidv4());
      addUser({ variables: { id: sessionStorage.getItem("userId") } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    data && dispatch(setVoteList([...data.songs]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>
    <Container>
      <Row>
        <Header />
      </Row>
      <VoteList list={voteList} />
      <AddItemFormModal />
    </Container>
  </>
};

export default MainPage;