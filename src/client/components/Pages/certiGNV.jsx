// import React from 'react' 
// const CertiGNV = () => {
//   return (
//     <div>
//       <h1>Pagina Contents de CertiGNV</h1>
//       <aside>
//         <div>Lateral</div>
//         <ul>
//           <li>a</li>
//           <li>b</li>
//           <li>c</li>
//         </ul>
//       </aside>
//       <main>Renderizacion de contenido dinamico</main>
//     </div>
//   )
// }
// export default CertiGNV

import React, { Component } from 'react' 
class CertiGNV extends Component {
  constructor(props) { 
    super (props) 
    this.state={
      name: []
    }
  }

getUser() {
  const url = `${process.env.REACT_APP_API_URL}/Users`;
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
export default CertiGNV
