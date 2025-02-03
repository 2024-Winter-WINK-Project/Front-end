import React, {useRef, useState} from "react";
import * as styled from "./ModalStyles";
import TwoButtons from "../Button/TwoButtons";

const ModalTemplate = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;
    return (
        <styled.modalOverlay onClick={onClose}>
            <styled.modalContents onClick={(e) => e.stopPropagation()}>
                {children}
            </styled.modalContents>
        </styled.modalOverlay>
    );
};

export default ModalTemplate;
