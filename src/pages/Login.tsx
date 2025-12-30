import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import {AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "/images/be-kind-logo.png";
import "../styles/Login.scss";


const loginSchema = z.object({
    username: z.string().email("Correo electrónico inválido"),
    password: z.string().min(1, "La contraseña es requerida")
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
    const {login, isLoading, error} = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);
            navigate('/dashboard');
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
        }
    }


return (
    <div className="login-layout">
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit(onSubmit)}>

                <img src={logo} alt="logo" />

                <h2 className="login-title">¡Empieza a conectar tu comunidad ante buenas acciones!</h2>

                <label htmlFor="username">Correo Electronico*</label>
                <div className="input-wrapper">
                <AiOutlineMail />
                <input type="email"
                placeholder="Ingresar Correo"
                {...register('username')} />

                {errors.username && <span>{errors.username.message}</span>}
                </div>

                <label htmlFor="password">Contraseña*</label>
                <div className="input-wrapper">
                <IoLockClosedOutline />
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Ingresar contraseña"
                    {...register('password')} 
                />
                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
                {errors.password && <span>{errors.password.message}</span>}
                </div>
                {/* Error del servidor */}
                {error && <ErrorMessage message={error} />}

                <a className="recover-password" href="#" onClick={() => navigate('/recover-password')}>Recuperar Contraseña</a>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader /> : 'Ingresar'}
                </button>

            </form>
        </div>
    </div>
)
}