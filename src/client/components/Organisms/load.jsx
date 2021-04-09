import React from 'react' 

const Load = () => {
  return (
    <div id="loader">
      {/* montar en Hook , con gif no carga inmediato se pierde el estado false*/}
      <svg>
        <circle cx="70" cy="70" r="30"></circle>
      </svg>
    </div>
  );
}
export default Load
