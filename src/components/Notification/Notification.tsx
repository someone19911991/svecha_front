import React, {FC} from 'react';
import "./notification.css"
import PortalComponent from "../PortalComponent/PortalComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";

interface INotification{
    message: string
    type: string
    onClose?: () => void
}

const Notification: FC<INotification> = ({message, type, onClose}) => {
    const backgroundColor = type === 'success' ? 'var(--success-color)' : type === 'error' ? 'pink' : type === 'warning' ? 'yellow' : ''
    return (
        <PortalComponent>
            <div style={{backgroundColor}} className="notification">
                {onClose && <div className="close_notification_btn_container">
                    <FontAwesomeIcon className="close_notification_btn" onClick={onClose} icon={faWindowClose}/>
                </div>}
                <p className="message">{message}</p>
            </div>
        </PortalComponent>
    );
};

export default Notification;