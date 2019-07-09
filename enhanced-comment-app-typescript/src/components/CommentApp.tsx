import React from 'react';
import IComment from './comment.interface';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';

interface IState {
  comments: Array<IComment>;
}
export class CommentApp extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  /*
  |--------------------------------------
  |  life cycle
  |--------------------------------------
  */

  componentWillMount() {
    this._loadComments();
  }

  /*
  |--------------------------------------
  |  private utils
  |--------------------------------------
  */

  private _loadComments() {
    let commentStr = localStorage.getItem('comments');
    if (commentStr) {
      let comments: Array<IComment> = JSON.parse(commentStr);
      this.setState({ comments });
    }
  }

  private _saveComments(comments: Array<IComment>) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  /*
    |--------------------------------------
    |  event handle
    |--------------------------------------
    */
  handleSubmitContent = (comment: IComment) => {
    if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');
    /*
    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments
    });*/
    let comments = [...this.state.comments, comment];
    this.setState(preState => {
      return { comments };
    });

    this._saveComments(comments);
  };

  handleDeleteComment = (index: number) => {
    const comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({ comments });
    this._saveComments(comments);
  };
  /*
    |--------------------------------------
    |  render
    |--------------------------------------
    */
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitContent} />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment}
        />
      </div>
    );
  }
}
