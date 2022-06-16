import React from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = isOwn ?
            'button_type_delete button' :
            'button_type_delete_hidden';

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = isLiked
        ? 'button_type_like button_type_like_active button'
        : 'button_type_like button';


    function handleClick() {
        onCardClick({
            name: card.name,
            link: card.link
        });
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="card">
            <img
                className="card__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick}

            />
            <h3 className="card__title">{card.name}</h3>
            <div className="card__like">
                <button onClick={handleLikeClick} className={cardLikeButtonClassName} />
                <span className="card__like-count">{card.likes.length}</span>
            </div>
            <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} />
        </li>
    )
}

export default Card