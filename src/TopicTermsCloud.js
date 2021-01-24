import React from "react";
import {TagCloud} from 'react-tagcloud'

const TopicTermsCloud = (props) => {

    return (
        <TagCloud
            minSize={12}
            maxSize={35}
            tags={props.termDistributions}
            colorOptions={{hue:'#007bff'}}
        />
    );
};

export default TopicTermsCloud;