// import React from 'react' 
// const Users = () => {
//   return (
//     <div>
//       <h2>PAGINA DE USUARIOS</h2>
//     </div>
//   )
// }
// export default Users

import React, { Component } from 'react' 
class Users extends Component {
  constructor(props) { 
    super (props) 
    this.state={
      name: []
    }
  }

getUser() {
  const url=`${process.env.REACT_APP_API_URL}/Users`
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((e) => console.log(e));
}  
componentDidMount() {
  this.getUser()
  
}
render(){
  return(
    <div>
      aca se renderiza
    </div>
  )
}
}
export default Users
