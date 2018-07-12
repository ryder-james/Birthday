import React from 'react';

const LargeText = (title, key) => {
    return (
        <div key={key} className="large-text">
            {title}
        </div>
    );
}

export default LargeText;