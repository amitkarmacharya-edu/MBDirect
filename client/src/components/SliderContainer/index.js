import React from 'react';
import VideoIcon from "../VideoIcon";
import AudioIcon from "../AudioIcon";
 
function SliderContainer(props) {
    return <div className='slider-container-title p-1'>
        <span>{props.videoModel.title}</span>
        <span className="d-inline-block ml-auto">
            <VideoIcon businessId={props.videoModel.id}/>
            <AudioIcon />
        </span>
        </div>;
}

export default SliderContainer;