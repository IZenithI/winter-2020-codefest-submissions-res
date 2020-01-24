import React from 'react';

const Marker = (props) => {
    const { color, name, id } = props;
    return(
        <div className="marker">
            style={{ backgroundColor: color, cursor: 'pointer'}}
            title={name}
        </div>
    );
};

export default Marker;