import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from 'react';

function AddCardPopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    
    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    function handleAddName(e) {
        setName(e.target.value);
    }

    function handleAddLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }
    
    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            button="Создать"
            onSubmit={handleSubmit}
        >
            <div className="popup__area">
                <input
                    id="title"
                    autoComplete="off"
                    type="text"
                    required=""
                    name="title"
                    className="popup__input popup__input_type_title"
                    placeholder="Название"
                    value={name || ''}
                    minLength={2}
                    maxLength={30}
                    onChange={handleAddName}
                />
                <span id="title-error" className="error" />
            </div>
            <div className="popup__area">
                <input
                    id="image"
                    type="url"
                    autoComplete="off"
                    required=""
                    name="image"
                    className="popup__input popup__input_type_image"
                    placeholder="Ссылка на картинку"
                    value={link || ''}
                    onChange={handleAddLink}
                />
                <span id="image-error" className="error" />
            </div>
        </PopupWithForm>

    )
}

export default AddCardPopup