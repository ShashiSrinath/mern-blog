import React,{useState}  from 'react';

const UseFormInput = () => {
    const [value,setValue] = useState('');

    const onChangeHandler = (e) => {
        setValue(e.target.value);
    };

    return [value , onChangeHandler];
};

export default UseFormInput;