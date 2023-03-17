import React from 'react';
// import { Link } from 'react-router-dom';


interface Props {
  name: string;
  age: number;
}

const Navbar: React.FC<Props> = () => {
  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <h1>Logo</h1>
      </div>
      <div className="navbar-links">
        {/* <Link to='/'>Home</Link> */}
      </div>
    </div>
  );
};

export default Navbar;