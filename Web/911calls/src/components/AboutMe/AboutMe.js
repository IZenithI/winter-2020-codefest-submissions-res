import React from 'react';
import AboutMeComponent from './AboutMeComponent';
import AboutMeData from './AboutMeData.json.js';

const AboutMe = () => {
    return AboutMeData.map((info) => <AboutMeComponent name={info.name} content={info.content} imageSrc={info.imageSrc} />)
}

export default AboutMe;