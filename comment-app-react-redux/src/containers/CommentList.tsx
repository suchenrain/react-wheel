import React from 'react';
import { connect } from 'react-redux';
import { CommentList } from '../components/CommentList';
import { deleteComment, initComments } from '../reducers/commentsReducer';

interface IProps {
  comments: Array<any>;
  initComments: (comments) => void;
  onDeleteComment: (index: number) => void;
}

class CommentListContainer extends React.Component<IProps> {
  componentWillMount() {
    this._loadComments();
  }

  private _loadComments() {
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    this.props.initComments(comments);
  }

  handleDeleteComment = (index: number) => {
    const { comments } = this.props;
    // props 是不能变的
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];
    localStorage.setItem('comments', JSON.stringify(newComments));
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  };

  render() {
    return (
      <CommentList
        comments={this.props.comments}
        onDeleteComment={this.handleDeleteComment}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initComments: comments => {
      dispatch(initComments(comments));
    },
    deleteComments: commentIndex => {
      dispatch(deleteComment(commentIndex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer);
