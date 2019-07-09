import React from 'react';
import { Comment } from './Comment';
import IComment from './comment.interface';

interface IProps {
  comments: Array<IComment>;
  onDeleteComment: (id: number) => void;
}

export class CommentList extends React.Component<IProps> {
  static defaultProps: IProps = {
    comments: [],
    onDeleteComment: () => {}
  };

  /*
  |--------------------------------------
  |  event handle
  |--------------------------------------
  */

  handleDeleteComment = (index: number) => {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  };

  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */
  render() {
    return (
      <div>
        {this.props.comments.map((comment, index) => (
          <Comment
            comment={comment}
            key={index}
            index={index}
            onDeleteComment={this.handleDeleteComment}
          />
        ))}
      </div>
    );
  }
}
