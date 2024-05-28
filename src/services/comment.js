/*
TODO: 
    - create exportable object Comment
    - create function to save comment in comments db (subcollection of posts).
*/

const COMMENT = {
  content: null,
  by: null,
  avatar: null,
  inPost: null,
  date: null,
};

export let comment = { ...COMMENT };

//TODO: suscriber to notify new comments


