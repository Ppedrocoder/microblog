import { Link, Navigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../hooks/useAuth";
import Postagem from "../../components/Postagem";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {api} from "../../services/ApiService";
import type { PostagemInterface } from "../../interfaces/PostagemInterface";
import Footer from "../../components/Footer";


const schema = yup.object().shape({
    titulo: yup.string().required("O título é obrigatório"),
    descricao: yup.string().required("A descrição é obrigatória"),
    imagem: yup.mixed().required("A imagem é obrigatória").test("fileSize", "O arquivo é muito grande", (value) => {
        if (!value) return false;
        const file = value as FileList;
        const fileSize = file[0].size;
        return fileSize <= 2000000 ? true : false;
    })
})

type FormData = yup.InferType<typeof schema>;

export default function Feed() {
    const { logout, isLogged, loading, user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [postagens, setPostagens] = useState<PostagemInterface[]>([]);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({resolver: yupResolver(schema)});
    useEffect(() => {
        const getPostagens = async () => {
            try {
                const response = await api.get("/publicacao/");
                setPostagens(response.data.results);
                console.log("Postagens recebidas:", response.data.results);
            } catch (error) {
                console.error("Erro ao buscar postagens:", error);
            }
        };

        getPostagens();
    }, []);
    function formatarDataHora(dataISO: string) {
        return new Date(dataISO).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
    });
}
    function handleLogout() {
        logout();
    }
    const imagem = watch("imagem");
    function handleModal(){
        setShowModal(!showModal);
        reset();
    }
    function onSubmit(data: FormData) {
        try {
            api.post("/publicacao/", {  titulo: data.titulo, descricao: data.descricao, imagem: data.imagem[0] }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(response => {
                setPostagens(prev => [response.data, ...prev]);
                handleModal();
            });
        }
        catch (error){
            console.error("Erro ao publicar postagem:", error);
        }
    }
    if(!isLogged && !loading) {
        return <Navigate to="/login" />;
    }
    return (
        <>  
            <div className="w-full h-screen overflow-y-auto flex flex-col ">
                <NavBar nome={user?.username || "Usuário"} />
                
                <div className="relative w-full flex flex-1 flex-col items-center mt-25">
                    {showModal && (
                    <div className="fixed inset-0 w-full h-full flex justify-center items-top bg-transparent backdrop-blur-md">
                        <div className="br-modal w-140 h-135 mt-50">
                            <form id="postagem-form" onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col">
                                <div className="w-full h-[15%] grid grid-cols-2 gap-12 p-4">
                                    <h1 className="!text-2xl !font-bold h-15 w-85">Publicar Postagem</h1>
                                    <div className="flex justify-end h-15 items-start">
                                        <button onClick={handleModal} type="button">
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div> 
                                <div className="w-full h-full p-4 flex flex-col">
                                    <div className="br-input">
                                        <label htmlFor="input-default">Título</label>
                                        <input {...register("titulo")} id="input-default" type="text" placeholder="Escreva um título..."/>
                                        <div className="h-8">
                                            <p className="!text-red-500 h-full">{errors.titulo?.message}</p>
                                        </div>
                                    </div>
                                    <div className="br-textarea h-30">
                                        <label htmlFor="textarea-id1">Descrição</label>
                                        <textarea {...register("descricao")} id="textarea-id1" className="resize-none" placeholder="Escreva uma descrição..."></textarea>
                                        <div className="h-8">
                                            <p className="!text-red-500">{errors.descricao?.message}</p>
                                        </div>
                                    </div>
                                    <div className="br-upload w-113 h-25">
                                        <label className="upload-label" htmlFor="multiple-files"><span>Envio de Imagem</span></label>
                                        <div className="upload-button relative !flex !justify-start items-center gap-2">
                                            <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                                            <input {...register("imagem")} className="upload-input w-full h-full" id="multiple-files" type="file" multiple={false} aria-hidden={false} aria-label="enviar arquivo"/>
                                            <label className="absolute upload-label w-full h-full pl-4 flex justify-start items-center" htmlFor="multiple-files"><span className="upload-label-text ml-2 mt-1 text-blue-50">{imagem ? imagem[0].name : "Envio de Imagem..."}</span></label>
                                            <div className="upload-list"></div>
                                        </div>
                                        <p className="text-base mt-1">Clique ou arraste a imagem para cima do componente Upload.</p>
                                        <div className="h-8">
                                            <p className="!text-red-500 h-full">{errors.imagem?.message}</p>
                                        </div>
                                    </div>
                                    <div className="w-full  h-[15%] flex justify-end items-center gap-4">
                                        <button onClick={handleModal} className="br-button secondary !mt-12 !w-25">Cancelar</button>
                                        <button className="br-button primary !mt-12 !w-25" type="submit">Publicar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    )}
                    <div className=" w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-items-center gap-4 p-4">
                        {postagens.map((postagem: PostagemInterface) => (
                            <Link to={`/postagem/${postagem.id}`}>
                            <Postagem 
                                key={postagem.id}
                                autor={postagem.autor.username}
                                imagem={postagem.imagem}
                                dia={formatarDataHora(postagem.publicado_em)}
                                titulo={postagem.titulo}
                                descricao={postagem.descricao}
                            />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="sticky bottom-0 flex justify-center">
                    <button type="button" disabled={showModal}  onClick={handleModal} className="sticky br-button circle primary !mb-4 flex justify-center items-center">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                </div>
                <Footer />
            </div>
            
        </>
    )
}