import React from 'react';
import { Container } from '@material-ui/core';
import MyToDoList from "../MyToDoList/MyToDoList";

import './MainView.scss';

const MainView = () => {
  return (
    <Container maxWidth="md">
    <header>
      <h1> Welcome on your website !</h1>
      <p>You can prepare your own list of tasks :)</p>
    </header>
    <MyToDoList />
    <footer>&copy; 2020 Liwia</footer>
    </Container>
  );
}

export default MainView;
