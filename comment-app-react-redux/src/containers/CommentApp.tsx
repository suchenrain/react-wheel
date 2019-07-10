import CommentInput from './CommentInput';
import CommentList from './CommentList';
import React from 'react';

export default class CommentApp extends React.Component<any, any> {
  render() {
    return (
      <div className="wrapper">
        <CommentInput />
        <CommentList />
      </div>
    );
  }
}
