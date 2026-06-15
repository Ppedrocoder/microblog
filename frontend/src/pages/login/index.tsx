import { useState } from "react"
import Logo from "../../assets/images/logo-nilo-vertical-white.png" 
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {api} from "../../services/ApiService";
import {jwtDecode} from "jwt-decode";
import type UserInterface from "../../interfaces/UserInterface";

const LoginSchema = yup.object().shape({
    usuario: yup.string().required("O campo de usuário é obrigatório"),
    senha: yup.string().required("O campo de senha é obrigatório")
})
type LoginData = yup.InferType<typeof LoginSchema>;

export default function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [messageLogin, setMessageLogin] = useState("");
    const [carregando, setCarregando] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm( {resolver: yupResolver(LoginSchema)} );
    const navigate = useNavigate();
    const { login, isLogged } = useAuth();
    if(isLogged) {
        return <Navigate to="/" />;
    }
    async function onSubmit(data: LoginData) {
        try{
            setCarregando(true);
            const {data: tokens} = await api.post("/login/", { username: data.usuario, password: data.senha });
            const decoded = jwtDecode<UserInterface>(tokens.access);
            login(decoded, tokens.access, tokens.refresh);
            setCarregando(false);
            navigate("/");
        }
        catch (error: any) {
            console.error("Erro ao fazer login:", error);
            const status = error?.response?.status;
            if (status === 401) {
                setMessageLogin("Usuário ou senha inválidos.");
            } else {
                setMessageLogin("Erro ao conectar.");
            }
            setCarregando(false);
        }
    }
    
    function handleMessage() {
        setMessageLogin("");
    }

    function handleMouseEnter() {
        setHovered(true);
    }

    function handleMouseLeave() {
        setHovered(false);
    }

    const linkStyle = {
        color: "#1351B4",
        textDecoration: hovered ? "underline" : "none",
        cursor: "pointer",
    };

    function mudarVisibilidadeSenha(){
        setMostrarSenha(!mostrarSenha);
    }
    return (
        <>
            <div className="flex flex-row items-center justify-center w-full h-screen">
                <div className="relative w-full h-full overflow-hidden" style={{backgroundColor:"#1351B4"}}>
                    <div 
                        className="absolute top-0 left-0 w-48 h-48 [clip-path:polygon(0%_100%,_0%_0%,_100%_0%)]" 
                        style={{backgroundColor:"#E52207"}}
                    ></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <img src={Logo} alt="Microblog" className="w-104 h-74"/>
                    </div>
                    <div 
                        className="absolute bottom-0 right-0 w-48 h-48 [clip-path:polygon(100%_0%,_100%_100%,_0%_100%)]" 
                        style={{backgroundColor:"#FFCD07"}}
                    ></div>
                </div>
                
                <div className="relative w-full h-full">
                    <div className={`absolute right-0 br-message danger transition-opacity duration-300 ${messageLogin ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <div className="icon">
                            <i className="fa fa-times-circle fa-lg" aria-hidden="true"></i>
                        </div>
                        <div className="content" aria-label="Usuário inválido" role="alert">
                            <span className="message-title">{messageLogin}</span>
                            <span className="message-body"> Por favor, tente novamente.</span>
                        </div>
                        <div className="close">
                            <button onClick={handleMessage} className="br-button circle small" type="button" aria-label="Fechar a mensagem alerta">
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div className="container w-full h-full flex flex-col items-center justify-center">
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e)}} className="br-modal w-120 h-115">
                            <h1 className="mx-auto pt-8 !font-bold !text-4xl">Login</h1>
                            <div className="br-input p-4 !pt-2">
                                <label htmlFor="text">Usuário</label>
                                <input type="text" {...register("usuario")} id="usuario" placeholder="Digite seu usuário..."/>
                                <p className="!text-red-500 !text-sm mt-1 min-h-[20px]">
                                    {errors.usuario?.message ?? ""}
                                </p>
                            </div>
                            
                            <div className="pl-4 pr-4 pb-2">
                                <div className="br-input input-button">
                                    <label htmlFor="input-password">Senha</label>
                                    <input id="input-password" {...register("senha")} type={mostrarSenha ? "text" : "password"} placeholder="Digite sua senha..."/>
                                    <button onClick={mudarVisibilidadeSenha} className="br-button" type="button" aria-label={mostrarSenha ? "Ocultar senha" : "Exibir senha"} role="switch" aria-checked={mostrarSenha}><i className={mostrarSenha ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i>
                                    </button>
                                </div>
                                <p className="!text-red-500 !text-sm mt-1 min-h-[20px]">
                                    {errors.senha?.message ?? ""}
                                </p>
                            </div>
                            <button type="submit" disabled={carregando} className="mx-auto mb-4 br-button primary !w-40">Entrar</button>
                            <div className="mx-auto flex flex-col gap-0.5 text-center">
                                <p className="!font-bold !m-0 !text-sm" style={{"color":"#1351B4"}}>Não tem conta?</p>
                                <Link to="/cadastro" className=" self-center text-sm mb-1" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    cadastre-se
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}