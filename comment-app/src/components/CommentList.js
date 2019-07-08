import React from 'react';
import Comment from './Comment';
class CommentList extends React.Component {
  static defaultProps = {
    comments: []
  };

  render() {
    return (
      <div>
        {this.props.comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </div>
    );
  }
}

export default CommentList;
