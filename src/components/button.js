import React from 'react';

const Button = (title, className, key, callback) => {
    return (
        <button key={key} className={className} onClick={callback}>
            <i className="fas fa-calendar-alt"></i>
            {title}
        </button>
    );
}

export default Button;