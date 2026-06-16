import { Navigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../hooks/useAuth";
import Postagem from "../../components/Postagem";
import intercampi from "../../assets/images/intercampi.jpg";
import mec from "../../assets/images/mec-livros.jpeg";
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
                
                <div className="relative w-full flex flex-1 flex-col items-center mt-25">
                    {showModal && (
                    <div className="fixed inset-0 w-full h-full flex justify-center items-top bg-transparent backdrop-blur-md">
                        <div className="br-modal w-120 h-120 mt-50">
                            <form className="w-full h-full flex flex-col">
                                <div className="w-full h-[15%] grid grid-cols-2 gap-12 p-4">
                                    <h1 className="!text-2xl !font-bold h-15 w-85">Publicar Postagem</h1>
                                    <div className="flex justify-end h-15 items-start">
                                        <button onClick={handleModal} type="button">
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div> 
                                <div className="w-full h-full p-4 flex flex-col gap-4">
                                    <div className="br-input">
                                        <label htmlFor="input-default">Título</label>
                                        <input id="input-default" type="text" placeholder="Escreva um título..."/>
                                    </div>
                                    <div className="br-textarea">
                                        <label htmlFor="textarea-id1">Descrição</label>
                                        <textarea id="textarea-id1" className="resize-none" placeholder="Escreva uma descrição..."></textarea>
                                    </div>
                                    <div className="br-upload w-108 h-12">
                                        <label className="upload-label" htmlFor="multiple-files"><span>Envio de Imagem</span></label>
                                        <div className="upload-button relative !flex !justify-start items-center gap-2">
                                            <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                                            <input className="upload-input w-full h-full" id="multiple-files" type="file" multiple={true} aria-hidden={false} aria-label="enviar arquivo"/>
                                            <label className="absolute upload-label w-full h-full pl-4 flex justify-start items-center" htmlFor="multiple-files"><span className="upload-label-text ml-2 mt-1 text-blue-50">Envio de imagem...</span></label>
                                            <div className="upload-list"></div>
                                        </div>
                                        <p className="text-base mt-1">Clique ou arraste a imagem para cima do componente Upload.</p>
                                    </div>
                                    <div className="w-full mt-4 h-[15%] flex justify-end items-center gap-4">
                                        <button onCanPlay={handleModal} className="br-button secondary !mt-12 !w-25">Cancelar</button>
                                        <button className="br-button primary !mt-12 !w-25" type="submit">Publicar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    )}
                    <div className=" w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-items-center gap-4 p-4">
                        <Postagem autor="Usuário" imagem={intercampi} dia="01/01/2023" titulo="Intercampi" descricao="Evento de intercâmpus" />
                        <Postagem autor="Usuário" imagem={mec} dia="01/01/2023" titulo="MEC Livros" descricao="Lançamento de novos livros" />
                        <Postagem autor="Usuário" imagem={mec} dia="01/01/2023" titulo="MEC Livros" descricao="Lançamento de novos livros" />
                        <Postagem autor="Usuário" imagem={mec} dia="01/01/2023" titulo="MEC Livros" descricao="Lançamento de novos livros" />
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