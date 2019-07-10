/*
  |--------------------------------------
  |  action types
  |--------------------------------------
  */

// comment
export const INIT_COMMENTS = 'INIT_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

/*
  |--------------------------------------
  |  flux action
  |--------------------------------------
  */
export interface IAction {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: any;
}
