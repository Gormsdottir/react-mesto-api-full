import logo from '../images/logo.svg';
import { Link, Route } from 'react-router-dom';


function Header({email, onSignOut}) {
    

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Место" />
      <Route path="/signup">
        <Link className="header__link" to='/signin'>Регистрация</Link>
      </Route>
      <Route path="/signin">
        <Link className="header__link" to='/signup'>Войти</Link>
      </Route>
      <Route exact path="/">
        <div className='header__info'>
          <p className="header__email"> {email} </p>
          <Link className="header__link" to='/signin' onClick={onSignOut}> Выйти </Link>
        </div>
      </Route>
    </header>
  );
};

export default Header;
