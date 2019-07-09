import React from 'react';
import IComment from './comment.interface';

interface IProps {
  comment: IComment;
}

export class Comment extends React.Component<IProps> {
  render() {
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{this.props.comment.username}</span>:
        </div>
        <p>{this.props.comment.content}</p>
      </div>
    );
  }
}
