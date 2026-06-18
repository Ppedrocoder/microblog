import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/ApiService";
import type { ComentarioInterface } from "../../interfaces/ComentarioInterface";
import type { PostagemInterface } from "../../interfaces/PostagemInterface";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    mensagem: yup.string().required("O comentário é obrigatório")
})

type FormData = yup.InferType<typeof schema>;

export default function Comentarios() {
    const [comentarios, setComentarios] = useState<ComentarioInterface[]>([]);
    const [postagem, setPostagem] = useState<PostagemInterface | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(schema)});
    const { id } = useParams();
    const { user } = useAuth();
    useEffect(() => {
        console.log("ID da postagem:", id);
        const pegarDados = async () => {
            try {
                const [postagem, comentarios] = await Promise.all([
                    api.get(`/publicacao/${id}/`),
                    api.get(`/publicacao/${id}/comentarios/`)
                ]);
                console.log("Postagem recebida:", postagem.data);
                console.log("Comentários recebidos:", comentarios.data);
                setPostagem(postagem.data);
                setComentarios(comentarios.data.results);
            }
            catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        pegarDados();
    }, [id]);
    function formatarDataHora(dataISO: string) {
        return new Date(dataISO).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
    });
    }
    function onSubmit(data: FormData){
        const enviarComentario = async () => {
            try {
                const response = await api.post("/comentario/", {
                    mensagem: data.mensagem,
                    publicacao: id,
                    autor: user?.id,
                    publicado_em: new Date().toISOString()
                })
                reset();
                setComentarios(prevComentarios => [ {
                    id: response.data.id,
                    autor: response.data.autor,
                    publicacao: response.data.publicacao,
                    mensagem: response.data.mensagem,
                    publicado_em: response.data.publicado_em
                }, ...prevComentarios]);
                console.log("Comentário enviado com sucesso");
            }
            catch (error) {
                console.error("Erro ao enviar comentário:", error);
            }
        }
        enviarComentario();
    }
    return (
        <>
            <NavBar nome={user?.username || "Usuário"} />
            <div className="w-full h-full p-4 flex flex-col gap-4 justify-center items-center mt-35">
                <div>
                    <div className="w-full h-full flex justify-center items-center ">
                        <img className="w-full h-full !w-250 rounded-3xl border border-transparent" src={postagem?.imagem} alt={postagem?.titulo} />
                    </div>
                    <div className="h-full flex flex-col justify-start items-start !w-250">
                        <h2 className="text-2xl font-bold">{postagem?.titulo}</h2>
                        <p>{postagem?.descricao}</p>
                    </div>
                    
                </div>
                <div className="br-divider w-250"></div>
                <div>   
                    <h3>Comentários</h3>
                    {comentarios.map((comentario: ComentarioInterface) => (
                        <div key={comentario.id} className ="w-250">
                            <div>
                                <h4 className="font-bold !text-lg mb-0">{comentario.autor.username}</h4>
                                <span className="text-sm text-gray-500">{formatarDataHora(comentario.publicado_em)}</span>
                            </div>
                            <p>{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
                <div className="w-250 flex justify-center items-center z-0">
                    <div className="br-modal w-120 h-55 flex flex-col justify-center items-center border border-transparent rounded-3xl">
                        <form className="w-full h-full flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                            <div className="br-textarea w-100 mt-4">
                                <label htmlFor="textarea-id1">Comentário</label>
                                <textarea className="w-full resize-none" {...register("mensagem")} id="textarea-id1" placeholder="Escreva seu comentário aqui..."></textarea>
                                <div className="h-8">
                                    {errors.mensagem && <p className="!text-red-500">{errors.mensagem.message}</p>}
                                </div>
                            </div>
                            <button className="br-button primary !w-25 mb-4" onClick={handleSubmit(onSubmit)}>Enviar</button>
                        </form>
                        
                    </div>
                    
                </div>
            </div>
            <Footer />
        </>
    )
}