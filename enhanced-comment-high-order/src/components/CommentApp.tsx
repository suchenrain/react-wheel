import React from 'react';
import IComment from './comment.interface';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import wrapWithLoadData from './wrapWithLoadData';

interface IState {
  comments: Array<IComment>;
}
interface IProps {
  data: any;
  saveData: (comments) => void;
}

class CommentAppClass extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      comments: props.data
    };
  }
  /*
  |--------------------------------------
  |  life cycle
  |--------------------------------------
  */

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

    this.props.saveData(comments);
  };

  handleDeleteComment = (index: number) => {
    const comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({ comments });
    this.props.saveData(comments);
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

let CommentApp = wrapWithLoadData(CommentAppClass, 'comments');
export default CommentApp;
