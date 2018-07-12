import React from 'react';

const Button = (title, className, callback) => {
    return (
        <button className={className} onClick={callback}>
            <i className="fas fa-calendar-alt"></i>
            {title}
        </button>
    );
}

export default Button;