import React from 'react';

const Login = ({click, show}) => {
    return show ? (
      <div>
        <form>
          <input className='search' type="text" size="55"/>
          <input type="submit" value="Login"
                 onClick={(event) => click(event, event.target.parentNode.children[0].value)}/>
        </form>
      </div>
    ) : null;
};

export default Login;
