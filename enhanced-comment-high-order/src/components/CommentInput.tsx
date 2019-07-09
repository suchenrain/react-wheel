import React, { Component } from 'react';
import IComment from './comment.interface';
import wrapWithLoadData from './wrapWithLoadData';

interface IProps {
  onSubmit: (comment: IComment) => void;
  data: any;
  saveData: (username) => void;
}

interface IState {
  username: string;
  content: string;
}

class CommentInputClass extends Component<IProps, IState> {
  textarea: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      username: props.data,
      content: ''
    };
  }
  /*
  |--------------------------------------
  |  life cycle
  |--------------------------------------
  */

  componentDidMount() {
    if (this.state.username && this.state.username.length > 0) {
      this.textarea.focus();
    }
  }

  /*
    |--------------------------------------
    |  private utils
    |--------------------------------------
    */

  /*
  |--------------------------------------
  |  event handle
  |--------------------------------------
  */

  handleUserNameChange = e => {
    this.setState({
      username: e.target.value
    });
  };
  handleUserNameBlur = e => {
    this.props.saveData(e.target.value);
  };

  handleContentChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  handleSubmit = () => {
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      this.props.onSubmit({ username, content, createdTime: +new Date() });
    }
    this.setState({
      content: ''
    });
  };
  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */
  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={this.handleUserNameChange}
              onBlur={this.handleUserNameBlur}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea
              ref={textarea => (this.textarea = textarea)}
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

let CommentInput = wrapWithLoadData(CommentInputClass, 'username');
export default CommentInput;
