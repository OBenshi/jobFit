import React from "react";
import background from '../img/background.jpg';
import DisplayTextComp from '../components/DisplayTextComp';

const DisplayText: React.FC = () => {
     const backgroundStyles = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat',
        //opacity: 0.8,
        width: '100vw',
        height: '100vh'
};
    return (
    <div style={backgroundStyles}>
    <DisplayTextComp/>
        </div> 
  )
}
export default DisplayText;