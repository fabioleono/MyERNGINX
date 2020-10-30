import React, { useEffect } from 'react' 
import { connect } from 'react-redux'
// import { getPublic } from '../../Redux/actionCreators'
// import { store } from "../../Redux/store";

const Info = ({ match, info, consumer }) => {

  useEffect(() => {
  //const consumerProfile=match.params.consumer
  // store.dispatch(getPublic(consumerProfile))
},[match]) 
  return (
    <div>
      <h1>Informacion de Descarga publica</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita amet quam fugit consectetur ad eum pariatur suscipit sunt cumque, temporibus ullam quae nulla magnam quis corrupti illum maxime quaerat. Id?</p>
      <p>Sapiente illo tenetur accusantium a corporis praesentium voluptatem quibusdam eos voluptatum quae, minima repellat maxime dolorum dignissimos. Modi ducimus dolor, sint dolorem culpa pariatur alias nulla aliquid repudiandae officia sit.</p>
  <p>{ consumer } datos {JSON.stringify(info)} </p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  info: state.publicReducer.info,
  consumer: state.publicReducer.consumer,
}); 
const mapDispatchToProps = state => ({})
  
export default connect(mapStateToProps,mapDispatchToProps)(Info); 
