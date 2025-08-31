import React from 'react';

interface CommentProps {
  author: string;
  text: string;
}

const Comment: React.FC<CommentProps> = ({ author, text }) => {
  return (
    <div className="comment">
      <div className="comment-author">{author}:</div>
      <div className="comment-text">{text}</div>
    </div>
  );
};

export default Comment;