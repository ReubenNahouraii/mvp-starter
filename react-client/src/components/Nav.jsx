import React from 'react';

const Nav = ({click, page, links}) => (
  <div>
    <ul onClick={(event)=> click(event)}>
      {links.showLogin && <li>login</li>}
      {links.showLogout && <li>logout</li>}
      <li>topics</li>
    </ul>
    <h1 id="page">{page}</h1>
  </div>
);

export default Nav;