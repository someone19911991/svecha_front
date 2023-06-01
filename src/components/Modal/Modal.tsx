import React, {PropsWithChildren} from 'react';
import {createPortal} from "react-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import "./modal.css"


interface IModalState{
    open: boolean
    onClose: () => void
}

const Modal = ({children, open, onClose}: PropsWithChildren<IModalState>) => {

    const portalElement = document.getElementById('portal')
    if(portalElement && open){
        return createPortal(
            <div onClick={onClose} className="modal">
                <div className="modal_container" onClick={(e) => e.stopPropagation()}>
                    <div className="modal_close_btn">
                        <FontAwesomeIcon onClick={onClose} icon={faWindowClose} />
                    </div>
                    {children}
                </div>
            </div>,
            portalElement
        )
    }else{
        return <></>
    }

};

export default Modal;