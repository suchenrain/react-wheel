import React from 'react';
import IComment from '../components/comment.interface';
import { CommentInput } from '../components/CommentInput';
import { addComment } from '../reducers/commentsReducer';
import { connect } from 'react-redux';

type Props = {
  comments: Array<any>;
  onSubmit: (comment) => void;
};

const initialState = {
  username: ''
};
const defaultProps = {
  comments: []
};

type State = typeof initialState;

class CommentInputContainer extends React.Component<Props, State> {
  static defaultProps = defaultProps;
  state = initialState;

  componentWillMount() {
    this._loadUsername();
  }

  private _loadUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username });
    }
  }

  private _saveUsername(username: string) {
    localStorage.setItem('username', username);
  }

  handleSubmitComment = (comment: IComment) => {
    // 评论数据的验证
    if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');
    // 新增评论保存到 LocalStorage 中
    const { comments } = this.props;
    const newComments = [...comments, comment];
    localStorage.setItem('comments', JSON.stringify(newComments));
    // this.props.onSubmit 是 connect 传进来的
    // 会 dispatch 一个 action 去新增评论
    if (this.props.onSubmit) {
      this.props.onSubmit(comment);
    }
  };

  render() {
    return (
      <CommentInput
        username={this.state.username}
        onUserNameInputBlur={this._saveUsername}
        onSubmit={this.handleSubmitComment}
      />
    );
  }
}

const mapStateToProps = state => {
  return { comments: state.comments };
};
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (comment: IComment) => {
      dispatch(addComment(comment));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer);
