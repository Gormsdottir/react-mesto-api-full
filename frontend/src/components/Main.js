import {useContext} from 'react';
import Card from '../components/Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import Footer from './Footer.js';


function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike,onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar">
                    <div
                        className="profile__image"
                        alt="аватар профиля"
                        style={{ backgroundImage: `url(${currentUser.avatar})` }}
                    />
                    <button
                        type="button"
                        className="button_type_edit-avatar button"
                        onClick={onEditAvatar}
                    />
                </div>
                <h1 className="profile__name">{currentUser.name}</h1>
                <p className="profile__occupation">{currentUser.about}</p>
                <button
                    type="button"
                    className="button_type_edit-profile button"
                    aria-label="Изменить"
                    onClick={onEditProfile}
                />
                <button
                    type="button"
                    className="button_type_add-card button"
                    aria-label="Добавить"
                    onClick={onAddPlace}
                />
            </section>
            <section className="cards">
                <ul className="cards__grid">
                    {cards.map((card) => {

                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        )
                    })}
                </ul>
            </section>
			<Footer/>
        </main>
    )
};

export default Main