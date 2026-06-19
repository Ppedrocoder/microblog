import { Link, Navigate } from "react-router-dom";
import BrNavBar from "../../components/NavBar";
import { useAuth } from "../../hooks/useAuth";
import BrPostagem from "../../components/Postagem";
import { useEffect, useState } from "react";
import { api } from "../../services/common/ApiService";
import type { PostagemInterface } from "../../interfaces/PostagemInterface";
import BrFooter from "../../components/Footer";
import BrPostagemForm from "../../components/PostagemForm";

export default function Feed() {
	const { isLogged, loading, user } = useAuth();
	const [showModal, setShowModal] = useState(false);
	const [postagens, setPostagens] = useState<PostagemInterface[]>([]);
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
	function handleModal() {
		setShowModal(!showModal);
	}
	if (!isLogged && !loading) {
		return <Navigate to="/login" />;
	}
	return (
		<>
			<div className="w-full h-screen overflow-y-auto flex flex-col ">
				<BrNavBar nome={user?.username || "Usuário"} />

				<div className="relative w-full flex flex-1 flex-col items-center mt-25">
                    
                    {/* Modal de Criação de Postagem */}
                    
					{showModal && (
						<BrPostagemForm
							setShowModal={setShowModal}
							showModal={showModal}
							setPostagens={setPostagens}
						/>
					)}

					<div className=" w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-items-center gap-4 p-4">
						{postagens.map((postagem: PostagemInterface) => (
							<Link to={`/postagem/${postagem.id}`}>
								<BrPostagem
									key={postagem.id}
									autor={postagem.autor.username}
									imagem={postagem.imagem}
									dia={formatarDataHora(
										postagem.publicado_em,
									)}
									titulo={postagem.titulo}
									descricao={postagem.descricao}
								/>
							</Link>
						))}
					</div>
				</div>
				<div className="sticky bottom-0 flex justify-end mr-4">
					<button
						type="button"
						disabled={showModal}
						onClick={handleModal}
						className="sticky br-button circle primary !mb-4 flex justify-center items-center"
					>
						<i
							className="fa fa-pencil"
							aria-hidden="true"
						></i>
					</button>
				</div>
				<BrFooter />
			</div>
		</>
	);
}
