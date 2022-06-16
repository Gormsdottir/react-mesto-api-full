import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleAboutChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-info"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            button="Сохранить"
            onSubmit={handleSubmit}
        >

            <div className="popup__area">
                <input
                    id="name"
                    autoComplete="off"
                    className="popup__input popup__input_type_name"
                    type="text"
                    required=""
                    name="name"
                    value={name || ''}
                    placeholder="Имя"
                    minLength={2}
                    maxLength={40}
                    onChange={handleNameChange}
                />
                <span id="name-error" className="error" />
            </div>
            <div className="popup__area">
                <input
                    id="about"
                    type="text"
                    autoComplete="off"
                    required=""
                    name="about"
                    className="popup__input popup__input_type_occupation"
                    placeholder="О себе"
                    value={description || ''}
                    minLength={2}
                    maxLength={200}
                    onChange={handleAboutChange}
                />
                <span id="about-error" className="error" />
            </div>

        </PopupWithForm>

    )
}

export default EditProfilePopup