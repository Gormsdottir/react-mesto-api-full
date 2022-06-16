import React from "react";
import { Link } from "react-router-dom";

function AuthPage({name, onSubmit, title, children, button }) {
  return (
    <div className="authpage">
      <form className="authpage__form" name={name} onSubmit={onSubmit}>
        <h2 className="authpage__title">{title}</h2>
        {children}
        <button type="submit" className="button button_type_authpage">
          {button}
        </button>

        {name === "register" && (
          <Link className="authpage__link" to="/sign-up">
            Уже зарегистрированы? Войти
          </Link>
        )}
      </form>
    </div>
  );
}

export default AuthPage