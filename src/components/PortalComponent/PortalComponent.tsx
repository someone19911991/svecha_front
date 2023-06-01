import React, { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import "./portalComponent.css"


const PortalComponent = ({ children }: PropsWithChildren) => {
    const portalElement = document.getElementById('portal')
    if (portalElement) {
        return createPortal(
            <div className="portal_component">{children}</div>,
            portalElement
        )
    } else {
        return <div></div>
    }
}

export default PortalComponent
