import React from 'react';

function SliderTemplate(props) {
    return (
        <div className='slider-container-wrapper'>
            <SliderContainer videoModel={props.videoModel} model={props.model} />
        </div>
    );
}

export default SliderTemplate;