function InfoTooltip({ isOpen, onClose, title, imgPath }) {

    function handleClickOverlay(e) {
        e.stopPropagation();
      }

  return (
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div 
      className="popup__container popup__container_type_tooltip" 
      onClick={handleClickOverlay}
      >
        <img 
        src={imgPath} 
        alt={imgPath} 
        className="popup__tooltip-img" />
        <h2 className="popup__title popup__title_type_tooltip">{title}</h2>
      <button
          type="button"
          className="button button_type_close"
          aria-label="Закрыть картинку"
          onClick={onClose}
        ></button>
    </div>
    </div>
  );
}

export default InfoTooltip