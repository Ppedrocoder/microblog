import { useState } from "react"
import Logo from "../../assets/images/logo-nilo-vertical-white.png" 
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {api} from "../../services/ApiService";
import { useAuth } from "../../hooks/useAuth";

const CadastroSchema = yup.object().shape({
    usuario: yup.string().required("O campo de usuário é obrigatório"),
    nome: yup.string().required("O campo de nome é obrigatório"),
    senha: yup.string().required("O campo de senha é obrigatório"),
    confirmarSenha: yup.string().oneOf([yup.ref('senha')], 'As senhas devem corresponder').required('Confirmação de senha é obrigatória')
})

type CadastroData = yup.InferType<typeof CadastroSchema>;

export default function Cadastro() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [messageCadastro, setMessageCadastro] = useState("");
    const { register, handleSubmit, formState: {errors} } = useForm( {resolver: yupResolver(CadastroSchema)} );
    const navigate = useNavigate();
    const { isLogged, loading } = useAuth();
    if(isLogged && !loading) {
        return <Navigate to="/" />;
    }

    async function onSubmit(data: CadastroData) {
        setCarregando(true);
        try{
            await api.post("/cadastrar/", { username: data.usuario, nome: data.nome, senha: data.senha });
            navigate("/login");
        }
        catch (error: any) {
            const status = error?.response?.status;
            const responseData = error?.response?.data;

            if (status === 400) {
                if (responseData?.username) {
                    setMessageCadastro("Usuário já existe.");
                } else {
                    setMessageCadastro("Dados inválidos. Verifique os campos.");
                }
            } else {
                setMessageCadastro("Erro ao conectar.");
            }
            console.error("Erro ao fazer cadastro:", error);
        }
        finally {
            setCarregando(false);
        }
        
    }
    function handleMessage() {
        setMessageCadastro("");
    }

    function handleMouseEnter() {
        setIsHovered(true);
    }

    function handleMouseLeave() {
        setIsHovered(false);
    }

    const linkStyle = {
        color: "#1351B4",
        textDecoration: isHovered ? "underline" : "none",
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
                    <div className={`absolute right-0 br-message danger transition-opacity duration-300 ${messageCadastro ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <div className="icon">
                            <i className="fa fa-times-circle fa-lg" aria-hidden="true"></i>
                        </div>
                        <div className="content" aria-label="Erro no cadastro" role="alert">
                            <span className="message-title">{messageCadastro}</span>
                            <span className="message-body"> Por favor, tente novamente.</span>
                        </div>
                        <div className="close">
                            <button onClick={handleMessage} className="br-button circle small" type="button" aria-label="Fechar a mensagem alerta">
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        </div>
                        
                    </div>
                <div className="w-full h-full">
                    <div className="container w-full h-full flex flex-col items-center justify-center">
                        <form onSubmit={handleSubmit(onSubmit)} className="br-modal w-120 h-180">
                            <h1 className="mx-auto pt-4 !font-bold !text-4xl">Cadastro</h1>
                            <div className="br-input p-4 !pt-2 !pb-2">
                                <label htmlFor="text">Usuário</label>
                                <input type="text" {...register("usuario")} id="usuario" placeholder="Digite seu usuário..."/>
                                <p className="!text-red-500 !text-sm mt-1 min-h-[20px]">
                                    {errors.usuario?.message ?? ""}
                                </p>
                            </div>
                            <div className="br-input p-4 !pt-2 !pb-2">
                                <label htmlFor="text">Nome</label>
                                <input type="text" id="nome" {...register("nome")} placeholder="Digite seu nome..."/>
                                <p className="!text-red-500 !text-sm mt-1 min-h-[20px]">
                                    {errors.nome?.message ?? ""}
                                </p>
                            </div>
                            <div className="p-4 !pt-2 !pb-2">
                                <div className="br-input input-button">
                                    <label htmlFor="input-password">Senha</label>
                                    <input id="input-password" {...register("senha")} type={mostrarSenha ? "text" : "password"} placeholder="Digite sua senha..."/>
                                    <button onClick={mudarVisibilidadeSenha} className="br-button" type="button" aria-label={mostrarSenha ? "Ocultar senha" : "Exibir senha"} role="switch" aria-checked={mostrarSenha}><i className={mostrarSenha ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i>
                                    </button>
                                    <p className="!text-red-500 !text-sm mt-1 min-h-[20px]">
                                        {errors.senha?.message ?? ""}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 !pt-2 !pb-2">
                                <div className="br-input input-button">
                                    <label htmlFor="input-password">Confirmar senha</label>
                                    <input id="input-password" {...register("confirmarSenha")} type={mostrarSenha ? "text" : "password"} placeholder="Digite sua senha novamente..."/>
                                    <button onClick={mudarVisibilidadeSenha} className="br-button" type="button" aria-label={mostrarSenha ? "Ocultar senha" : "Exibir senha"} role="switch" aria-checked={mostrarSenha}><i className={mostrarSenha ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i>
                                    </button>
                                    <p className="!text-red-500 !text-sm mt-1 min-h-[20px]">
                                        {errors.confirmarSenha?.message ?? ""}
                                    </p>
                                </div>
                            </div>
                            <button disabled={carregando} className="mx-auto mb-4 br-button primary !w-40">Cadastrar</button>
                            <div className="mx-auto flex flex-col gap-0.5 text-center">
                                <p className="!font-bold !m-0 !text-sm" style={{"color":"#1351B4"}}>Já tem conta?</p>
                                <Link to="/login" className="self-center text-sm mb-1" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    faça login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
