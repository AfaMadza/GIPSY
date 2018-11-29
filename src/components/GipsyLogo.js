import React from 'react';
import GipsyLogo from '../assets/images/GipsyLogo.png';

const gipsylogo = (props) => (
    <div  style={{
        backgroundColor: 'none',
        marginLeft: 'auto',
        boxSizing: 'border-box',
        marginRight: -12,
        borderRadius: '50%'}}>
        <img src={GipsyLogo} style={{height: '50px',
    marginLeft: -12,
    marginRight: 16,
    }} alt="GIPSY" />
    </div>
);


export default gipsylogo;