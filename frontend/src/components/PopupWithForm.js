function PopupWithForm({ name, isOpen, onClose, title, children, button, onSubmit }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="button_type_close-edit-popup button_type_close button"
                    onClick={onClose}
                />
                <h2 className="popup__title">{title}</h2>
                <form noValidate="" className="form popup__edit-form" name={name} onSubmit={onSubmit}>

                    {children}
                    <button
                        type="submit"
                        className="button popup__submit popup__submit_edit"
                    >
                        {button}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm