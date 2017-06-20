import React from 'react';

const User = ({show, info}) => {
    return show ? (
      <div className='user'>
        <h1>{info.name}</h1>
        <div>likes {info.likes}</div>
        <div>not so much {info.dislikes}</div>
      </div>
    ) : null;
};

export default User;