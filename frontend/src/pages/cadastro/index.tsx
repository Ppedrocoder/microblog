import { useState } from "react"
import { Link } from "react-router";
import Logo from "../../assets/images/logo-nilo-vertical-white.png" 

export default function Cadastro() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
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

                <div className="w-full h-full">
                    <div className="container w-full h-full flex flex-col items-center justify-center">
                        <form className="br-modal w-100 h-150">
                            <h1 className="mx-auto pt-8 !font-bold !text-4xl">Cadastro</h1>
                            <div className="br-input p-4 !pt-2 !pb-2">
                                <label htmlFor="text">Usuário</label>
                                <input type="text" id="usuario" placeholder="Digite seu usuário..."/>
                            </div>
                            <div className="br-input p-4 !pt-2 !pb-2">
                                <label htmlFor="text">Nome</label>
                                <input type="text" id="nome" placeholder="Digite seu nome..."/>
                            </div>
                            <div className="p-4 !pt-2 !pb-2">
                                <div className="br-input input-button">
                                    <label htmlFor="input-password">Senha</label>
                                    <input id="input-password" type={mostrarSenha ? "text" : "password"} placeholder="Digite sua senha..."/>
                                    <button onClick={mudarVisibilidadeSenha} className="br-button" type="button" aria-label={mostrarSenha ? "Ocultar senha" : "Exibir senha"} role="switch" aria-checked={mostrarSenha}><i className={mostrarSenha ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 !pt-2">
                                <div className="br-input input-button">
                                    <label htmlFor="input-password">Confirmar senha</label>
                                    <input id="input-password" type={mostrarSenha ? "text" : "password"} placeholder="Digite sua senha novamente..."/>
                                    <button onClick={mudarVisibilidadeSenha} className="br-button" type="button" aria-label={mostrarSenha ? "Ocultar senha" : "Exibir senha"} role="switch" aria-checked={mostrarSenha}><i className={mostrarSenha ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <button className="mx-auto mb-4 br-button primary !w-40">Cadastrar</button>
                            <div className="mx-auto flex flex-col gap-0.5 text-center">
                                <p className="!font-bold !m-0 !text-sm" style={{"color":"#1351B4"}}>Já tem conta?</p>
                                <Link to="/login" className="self-center text-sm" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    faça login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
