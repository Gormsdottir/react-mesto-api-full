import React from "react";

function ImagePopup({card, onClose}) {

    return (
        <div className={`popup popup_type_image ${card.link && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_image">
                <button
                    type="button"
                    className="button button_type_close-image button_type_close" 
                    onClick={onClose}
                />
                <img className="popup__place-photo"
                    src={`${card.link}`}
                    alt={`Фото ${card.name}`} />
                <h2 className="popup__description">{card.name}</h2>
            </div>
        </div>

    )
}

export default ImagePopup