import AuthPage from "./AuthPage";
import { useState } from "react";

function Register({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;
    evt.target.name === "Email" ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(password, email);
  }

  return (
    <div className="authpage authpage_type_register">
      <AuthPage
        name="register"
        onSubmit={handleSubmit}
        title="Регистрация"
        button="Зарегистрироваться"
      >
        <input
          name="Email"
          type="email"
          className="authpage__input"
          id="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleChange}
        />

        <input
          name="Password"
          type="password"
          className="authpage__input"
          id="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleChange}
        />
      </AuthPage>
    </div>
  );
}

export default Register