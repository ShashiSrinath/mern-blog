import React from 'react';
import {Button} from 'react-profghost-components';

const ButtonPrimary = (props) => {

    const colors = {
        color: '#ffffff',
        background: '#7661cc',
        boxShadow: '#101010'
    };

    return (
        <Button colors={colors} className={props.className} onClick={props.onClick}>
            {props.children}
        </Button>
    );
};

export default ButtonPrimary;