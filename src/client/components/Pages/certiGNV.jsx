import React, { useEffect } from 'react' 
import { getProfile } from '../../Redux/actionCreators'
import store from '../../Redux/store'
import { connect } from "react-redux";


const CertiGNV = ({ match, profile, user }) => {
  //const user = match.params.user
  console.log('usuario Login', user)

useEffect(() => {
  const userProfile=match.params.user
  store.dispatch(getProfile(userProfile))
},[match])  

  return (
    <div>
      <h1>Pagina Contents de CertiGNV</h1>
      <aside>
        <div>Lateral</div>
        <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
        </ul>
      </aside>
      <main>Renderizacion de contenido dinamico</main>
  <div>primero { user + ' despues ' + JSON.stringify(profile)}</div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  profile: state.profileReducer.profile,
  user: state.profileReducer.user
});
export default connect(mapStateToProps, {})(CertiGNV)

// import React, { Component } from 'react' 
// class CertiGNV extends Component {
//   constructor(props) { 
//     super (props) 
//     this.state={
//       name: []
//     }
//   }

// getUser() {
//   const url = `${process.env.REACT_APP_API_URL}/CertiGNV`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((json) => {
//       console.log(json);
//     })
//     .catch((e) => console.log(e));
// }  
// componentDidMount() {
//   this.getUser()
  
// }
// render(){
//   return(
//     <div>
//       aca se renderiza
//     </div>
//   )
// }
// }
// export default CertiGNV
