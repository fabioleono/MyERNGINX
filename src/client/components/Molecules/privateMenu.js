import React from 'react' 
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const PrivateMenu = ( { family } ) => {
// console.log('props private menu', props);
// console.log('location ', location);
// console.log('match ', match);

// console.log('PRIVATE MENU  ', family);


  return (
    <>
      <li>
        <NavLink to={`/${family}`}>Certificadores</NavLink>
      </li>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  family: state.userReducer.family,
});

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateMenu); 
