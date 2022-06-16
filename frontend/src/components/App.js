import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { api } from '../utils/api';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import successful from '../images/successful.svg';
import unsuccessful from '../images/unsuccessful.svg';


function App() {

  // хуки
  //открытие попапа редактирование профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //открытие попапа добавления карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //открытие попапа обновления аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //открытие попапа с картинкой
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  //текущий пользователь
  const [currentUser, setCurrentUser] = useState({});
  //карточки
  const [cards, setCards] = useState([]);
  // открытие модального окна при регистрации
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  // сообщение для модального окна успешной/неуспешной регистрации
  const [message, setMessage] = useState({ imgPath: "", text: "" });
  //
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");

  const history = useHistory();


  //получение инфо при загрузке и отрисовка карточек

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (setLoggedIn) {
      api.getAllData()
        .then((res) => {
          setCards(res[0]);
          setCurrentUser(res[1]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);


  //функции 
  //открытие попапа редактирование профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  //открытие попапа добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  //открытие попапа обновления аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  //открытие попапа с картинкой
  function handleCardClick(data) {
    setSelectedCard(data);
  }
  //закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
  }
  //обновление инфо в профиле пользователя
  function handleUpdateUser(userInfo) {
    api.setUserInfoApi(userInfo).then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
      .catch((err) => console.log(err));
  }
  //обновление аватара
  function handleUpdateAvatar(userInfo) {
    api.handleUserAvatar(userInfo).then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
      .catch((err) => console.log(err));
  }
  //добавление новой карточки
  function handleAddPlaceSubmit(newCard) {
    api.addUserCard(newCard).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => console.log(err));
    
  }
  //лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err));
  }
  //удаление карточки
  function handleCardDelete(removedCard) {
    api.delete(removedCard._id).then(() => {
      setCards((cards) => cards.filter((c) => {
        return c._id !== removedCard._id;
      }));
    })
      .catch((err) => console.log(err));
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then((result) => {
        setEmail(result.data.email);
        setMessage({
          imgPath: successful,
          text: "Вы успешно зарегистрировались!",
        });
      })
      .catch(() =>
        setMessage({
          imgPath: unsuccessful,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        })
      )
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then((token) => {
        auth.getContent(token)
          .then((res) => {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          })
          .catch((err) => {
            setLoggedIn(false);
            console.log(err);
          })
      })
      .catch((err) => console.log(err))
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            loggedIn={loggedIn}
            email={email}
            onSignOut={onSignOut}
          />

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Route path="/sign-in">
              <Register
                onSubmit={handleRegistration}
                isInfoTooltipOpen={isInfoTooltipOpen}
              />
            </Route>
            <Route path="/sign-up">
              <Login
                onSubmit={handleLogin} />
            </Route>
          </Switch>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddCardPopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            name="tooltip"
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            title={message.text}
            imgPath={message.imgPath}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  )
}

export default App;