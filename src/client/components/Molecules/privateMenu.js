import React from 'react' 
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const PrivateMenu = ( { user }) => {
//console.log('props', props);
console.log('usuario menu', user);

  return (
    <>
      <li>
        <NavLink to={`/CertiGNV/${user}`}>Certificadores</NavLink>
      </li>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.profileReducer.user
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateMenu); 
