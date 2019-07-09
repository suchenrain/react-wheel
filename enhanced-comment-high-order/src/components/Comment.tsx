import React from 'react';
import IComment from './comment.interface';

interface IProps {
  comment: IComment;
  onDeleteComment: (id: number) => void;
  index: number;
}
interface IState {
  timeString: string;
}

class Comment extends React.Component<IProps, IState> {
  private _timer;
  constructor(props) {
    super(props);
    this.state = {
      timeString: ''
    };
  }

  /*
  |--------------------------------------
  |  life cycle
  |--------------------------------------
  */
  componentWillMount() {
    this._updateTimeString();
    this._timer = setInterval(this._updateTimeString.bind(this), 5000);
  }
  componentWillUnmount() {
    clearInterval(this._timer);
  }
  /*
  |--------------------------------------
  |  private utils
  |--------------------------------------
  */

  private _updateTimeString() {
    const comment = this.props.comment;
    if (!comment.createdTime) return;
    const duration = (+Date.now() - comment.createdTime) / 1000;
    this.setState({
      timeString:
        duration > 60
          ? `${Math.round(duration / 60)} 分钟前`
          : `${Math.round(Math.max(duration, 1))} 秒前`
    });
  }

  private _getProcessedContent = (content: string) => {
    return content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
  };
  /*
  |--------------------------------------
  |  event handle
  |--------------------------------------
  */

  handleDeleteComment = () => {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  };

  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */

  render() {
    return (
      <div className="comment">
        <div className="comment-username">
          <span>{this.props.comment.username}</span>:
        </div>
        {/* <p>{this.props.comment.content}</p> */}
        <p
          dangerouslySetInnerHTML={{
            __html: this._getProcessedContent(this.props.comment.content)
          }}
        />
        <span className="comment-createdtime">{this.state.timeString}</span>
        <span className="comment-delete" onClick={this.handleDeleteComment}>
          删除
        </span>
      </div>
    );
  }
}

export default Comment;
