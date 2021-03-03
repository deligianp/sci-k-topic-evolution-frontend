import React from "react";
import './ModalOverlay.css';

const ModalOverlay = props => {
    return (
        props.active
            ? <div className={'spinner-overlay'}>
                <div className={'spinner-overlay-content'}>
                    {props.children}
                </div>
            </div>
            : <></>
    );
}

export default ModalOverlay;