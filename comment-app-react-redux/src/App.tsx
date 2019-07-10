import React from 'react';
import './App.css';
import CommentApp from './containers/CommentApp';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import commentsReducer from './reducers/commentsReducer';

const store = createStore(commentsReducer);
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CommentApp />
    </Provider>
  );
};

export default App;
