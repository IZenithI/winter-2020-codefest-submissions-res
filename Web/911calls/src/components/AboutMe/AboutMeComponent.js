import React from 'react';

const AboutMeStyles = {
    zIndex: 1,
    marginTop: 56,
    marginLeft: 54,
    marginRight: 54,
    borderStyle: "none none solid none",
}

const AboutMeComponent = (props) => {
    return <div style={AboutMeStyles}>
        <h1>{props.name}</h1>
        <h2>{props.content}</h2>
        <h3>{props.imageSrc}</h3>
    </div>
}

export default AboutMeComponent;