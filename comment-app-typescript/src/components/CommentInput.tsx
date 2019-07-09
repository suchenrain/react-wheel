import React, { Component } from 'react';
import IComment from './comment.interface';

interface IProps {
  onSubmit: (comment: IComment) => void;
}

interface IState {
  username: string;
  content: string;
}

export class CommentInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: '',
      content: ''
    };
  }

  handleUserNameChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleContentChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  handleSubmit = () => {
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      this.props.onSubmit({ username, content });
    }
    this.setState({
      content: ''
    });
  };

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={this.handleUserNameChange}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea
              value={this.state.content}
              onChange={this.handleContentChange}
            />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit}>发布</button>
        </div>
      </div>
    );
  }
}
