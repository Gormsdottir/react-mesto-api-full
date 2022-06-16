import PopupWithForm from "./PopupWithForm";
import { useRef, useState, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value="";
      },[isOpen])


    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            button="Сохранить"
            onSubmit={handleSubmit}
        >
            <div className="popup__area">
                <input
                    id="avatar"
                    type="url"
                    autoComplete="off"
                    required=""
                    name="avatar"
                    className="popup__input popup__input_type_avatar"
                    placeholder="Ссылка на картинку"
                    ref={avatarRef}
                />
                <span id="avatar-error" className="error" />
            </div>

        </PopupWithForm>

    )
}

export default EditAvatarPopup