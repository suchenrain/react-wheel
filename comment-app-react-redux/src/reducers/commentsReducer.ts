import {
  IAction,
  INIT_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT
} from './action-types';

interface IState {
  comments: Array<any>;
}
/*
  |--------------------------------------
  |  reducers
  |--------------------------------------
  */
export default (state: IState = { comments: [] }, action: IAction) => {
  switch (action.type) {
    case INIT_COMMENTS:
      return { comments: action.payload.comments };
    case ADD_COMMENT:
      return {
        comments: [...state.comments, action.payload.comment]
      };
    case DELETE_COMMENT:
      return {
        comments: [
          ...state.comments.slice(0, action.payload.commentIndex),
          ...state.comments.slice(action.payload.commentIndex + 1)
        ]
      };
    default:
      return state;
  }
};

/*
  |--------------------------------------
  |  action creators
  |--------------------------------------
  */
export const initComments = (comments): IAction => {
  return { type: INIT_COMMENTS, payload: { comments } };
};

export const addComment = (comment): IAction => {
  return { type: ADD_COMMENT, payload: { comment } };
};

export const deleteComment = (commentIndex: number): IAction => {
  return { type: DELETE_COMMENT, payload: { commentIndex } };
};
