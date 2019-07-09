import React from 'react';
import { Comment } from './Comment';
import IComment from './comment.interface';

interface IProps {
  comments: Array<IComment>;
}

export class CommentList extends React.Component<IProps> {
  static defaultProps: IProps = {
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
