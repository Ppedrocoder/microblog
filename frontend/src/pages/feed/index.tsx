import { Navigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../hooks/useAuth";
import Postagem from "../../components/Postagem";
import intercampi from "../../assets/images/intercampi.jpg";
import { useState } from "react";

export default function Feed() {
    const { logout, isLogged, loading, user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    function handleLogout() {
        logout();
    }
    function handleModal(){
        setShowModal(!showModal);
    }
    if(!isLogged && !loading) {
        return <Navigate to="/login" />;
    }
    return (
        <>  
            <div className="w-full h-screen overflow-y-auto flex flex-col ">
                <NavBar action={handleLogout} nome={user?.username || "Usuário"} />
                
                <div className="relative w-full flex flex-1 flex-col items-center">
                    {showModal && (
                    <div className="fixed inset-0 w-full h-full flex justify-center items-top bg-transparent backdrop-blur-md">
                        <div className="br-modal w-120 h-120 mt-50">
                            <div className="w-full h-full grid grid-cols-2 gap-12 p-4">
                                <h1 className="!text-2xl !font-bold h-15 w-85">Publicar Postagem</h1>
                                <div className="flex justify-end h-15 items-start">
                                    <button onClick={handleModal} type="button">
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div> 
                        </div>
                    </div>
                    )}
                    <div className=" w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-items-center gap-4 p-4">
                        <Postagem autor="Usuário" imagem={intercampi} dia="01/01/2023" titulo="Intercampi" descricao="Evento de intercâmpus" />
                        <Postagem autor="Usuário" imagem={intercampi} dia="01/01/2023" titulo="Intercampi" descricao="Evento de intercâmpus" />
                        <Postagem autor="Usuário" imagem={intercampi} dia="01/01/2023" titulo="Intercampi" descricao="Evento de intercâmpus" />
                        <Postagem autor="Usuário" imagem={intercampi} dia="01/01/2023" titulo="Intercampi" descricao="Evento de intercâmpus" />
                    </div>
                </div>
                <div className="sticky bottom-0 flex justify-center">
                    <button type="button" disabled={showModal}  onClick={handleModal} className="sticky br-button circle primary !mb-4 flex justify-center items-center">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </>
    )
}