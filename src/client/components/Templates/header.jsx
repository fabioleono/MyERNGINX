import React from 'react' 

import Banner from '../Organisms/banner'
import NavMenu from '../Organisms/navMenu'
const Header = () => {
  return (
    <>
      <div>
        <NavMenu />
      </div>
      <div>
        <Banner />
      </div>
    </>
  );
}
export default Header
