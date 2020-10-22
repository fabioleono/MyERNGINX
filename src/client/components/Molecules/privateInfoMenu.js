import React from 'react' 
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const PrivateInfoMenu = ({ consumer }) => {
  return (
    <>
      <li>
        <NavLink to={`/infopublica/${consumer}`}>Info Publica</NavLink>
      </li>
    
    </>
  );
}
const mapStateToProps = (state) => ({
  consumer: state.publicReducer.consumer,
});

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(PrivateInfoMenu); 
