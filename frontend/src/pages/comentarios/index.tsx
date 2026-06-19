import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import React, { useEffect, useState } from "react";
import type { ComentarioInterface } from "../../interfaces/ComentarioInterface";
import type { PostagemInterface } from "../../interfaces/PostagemInterface";
import BrNavBar from "../../components/NavBar";
import BrFooter from "../../components/Footer";
import BrComentarioForm from "../../components/ComentarioForm";
import ListaComentarios from "../../components/ListaComentarios";
import ComentarioService from "../../services/models/ComentarioService";
import PostagemService from "../../services/models/PostagemService";
import formatarDataHora from "../../utils/formatarData";

export default function Comentarios(): React.ReactNode {
    // -------------------------
    // Estados Locais
    // -------------------------
	const [comentarios, setComentarios] = useState<ComentarioInterface[]>([]);
	const [postagem, setPostagem] = useState<PostagemInterface | null>(null);

    // -------------------------
    // Dados de Query e Hook de Autenticação
    // -------------------------
	const { id } = useParams();
	const { user } = useAuth();

    // -------------------------
    // Efeito para Buscar Postagem e Comentários
    // -------------------------
	useEffect(() => {
		console.log("ID da postagem:", id);
		const pegarDados = async () => {
			try {
				const postagem = await PostagemService.getPostagemById(
					Number(id),
				);
				console.log("Postagem recebida:", postagem);
				const comentarios =
					await ComentarioService.getComentariosByPostagemId(
						Number(id),
					);
				console.log("Comentários recebidos:", comentarios);
				setPostagem(postagem);
				setComentarios(comentarios);
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
			}
		};
		pegarDados();
	}, [id]);

	return (
		<>
			{postagem && (
				<>
					<BrNavBar nome={user?.username || "Usuário"} />
					<div className="w-full h-full p-4 flex flex-col gap-4 justify-center items-center mt-35">
						<div>
							<div className="w-full h-full flex justify-center items-center ">
								<img
									className="w-full h-full !w-250 rounded-3xl border border-transparent"
									src={postagem?.imagem}
									alt={postagem?.titulo}
								/>
							</div>
							<div className="h-full flex flex-col justify-start items-start !w-250">
								<h2 className="text-2xl font-bold">
									{postagem?.titulo}
								</h2>
								<p className="text-sm text-semi-bold">
									{postagem?.autor.username} -{" "}
									{formatarDataHora(postagem?.publicado_em)}
								</p>
								<p>{postagem?.descricao}</p>
							</div>
						</div>
						<div className="br-divider w-250"></div>
						<ListaComentarios comentarios={comentarios} />
						<BrComentarioForm
							postagemId={id || ""}
							setComentarios={setComentarios}
						/>
					</div>
					<BrFooter />
				</>
			)}
		</>
	);
}
