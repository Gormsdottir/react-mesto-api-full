import { useState } from "react";
import AuthPage from "./AuthPage";

function Login({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(e) {
        const { value } = e.target
        e.target.name === 'Email' ? setEmail(value) : setPassword(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(password, email)
    }

    return (
        <div className='authpage authpage_tupe_login'>
            <AuthPage
                name='login'
                onSubmit={handleSubmit}
                title='Вход'
                button='Войти'
            >
                <input
                    name="Email"
                    type="email"
                    className="authpage__input"
                    id="email"
                    placeholder="Email"
                    value={email || ''}
                    onChange={handleChange}
                />

                <input
                    name="Password"
                    type="password"
                    className="authpage__input"
                    id="password"
                    placeholder="Пароль"
                    value={password || ''}
                    onChange={handleChange}
                />

            </AuthPage>
        </div>
    )
}

export default Login