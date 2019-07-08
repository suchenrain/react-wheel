import React from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

export class CommentApp extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  handleSubmitContent = comment => {
    if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');
    /*
    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments
    });*/

    this.setState(preState => {
      return { comments: [...preState.comments, comment] };
    });
  };
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitContent} />
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}
