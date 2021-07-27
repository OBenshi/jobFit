import React from 'react';
import background from '../img/background.jpg';
import AddText from '../components/AddText';

interface Props {
    
}

const AddDatingText: React.FC = () => {
       const backgroundStyles = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
};
    return (
        <div style={backgroundStyles}>
            <AddText/>
        </div>
    )
}

export default AddDatingText;
