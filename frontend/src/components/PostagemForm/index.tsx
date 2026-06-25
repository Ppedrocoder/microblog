import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/common/ApiService";
import type { PostagemInterface } from "../../interfaces/PostagemInterface";

/**
 * Componente de Formulário de Postagem (`BrPostagemForm`), utilizado para permitir que os usuários criem novas postagens.
 *
 * Suporta a validação de campos e o envio de dados para o backend.
 *
 * @param setShowModal - Função para controlar a exibição do modal.
 * @param showModal - Estado que controla a exibição do modal.
 * @param setPostagens - Função para atualizar a lista de postagens.
 *
 * @returns Um elemento JSX representando o formulário de postagem.
 *
 * @example
 * ```tsx
 * <BrPostagemForm
 * 		setShowModal={setShowModal}
 * 		showModal={showModal}
 * 		setPostagens={setPostagens}
 * />
 * ```
 *
 * @author Pedro Ricardo
 * @since 25/06/2026
 * @updated 25/06/2026
 * @version 1.0.0
 */

interface PostagemFormProps {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	showModal: boolean;
	setPostagens: React.Dispatch<React.SetStateAction<PostagemInterface[]>>;
}

type FormData = yup.InferType<typeof schema>;

const schema = yup.object().shape({
	titulo: yup.string().required("O título é obrigatório"),
	descricao: yup.string().required("A descrição é obrigatória"),
	imagem: yup
		.mixed()
		.required("A imagem é obrigatória")
		.test("fileSize", "O arquivo é muito grande", (value) => {
			if (!value) return false;
			const file = value as FileList;
			const fileSize = file[0].size;
			return fileSize <= 2000000;
		}),
});
export default function BrPostagemForm(props: PostagemFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });
	function handleModal() {
		props.setShowModal(!props.showModal);
		reset();
	}
	const imagem = watch("imagem");
	function onSubmit(data: FormData) {
		try {
			api.post(
				"/publicacao/",
				{
					titulo: data.titulo,
					descricao: data.descricao,
					imagem: data.imagem[0],
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			).then((response) => {
				props.setPostagens((prev) => [response.data, ...prev]);
				handleModal();
			});
		} catch (error) {
			console.error("Erro ao publicar postagem:", error);
		}
	}
	return (
		<>
			<div className="fixed inset-0 w-full h-full flex justify-center items-top bg-transparent backdrop-blur-md">
				<div className="br-modal w-140 h-135 mt-50">
					<form
						id="postagem-form"
						onSubmit={handleSubmit(onSubmit)}
						className="w-full h-full flex flex-col"
					>
						<div className="w-full h-[15%] grid grid-cols-2 gap-12 p-4">
							<h1 className="!text-2xl !font-bold h-15 w-85">
								Publicar Postagem
							</h1>
							<div className="flex justify-end h-15 items-start">
								<button
									onClick={handleModal}
									type="button"
								>
									<i
										className="fa fa-times"
										aria-hidden="true"
									></i>
								</button>
							</div>
						</div>
						<div className="w-full h-full p-4 flex flex-col">
							<div className="br-input">
								<label htmlFor="input-default">Título</label>
								<input
									{...register("titulo")}
									id="input-default"
									type="text"
									placeholder="Escreva um título..."
								/>
								<div className="h-8">
									<p className="!text-red-500 h-full">
										{errors.titulo?.message}
									</p>
								</div>
							</div>
							<div className="br-textarea h-30">
								<label htmlFor="textarea-id1">Descrição</label>
								<textarea
									{...register("descricao")}
									id="textarea-id1"
									className="resize-none"
									placeholder="Escreva uma descrição..."
								></textarea>
								<div className="h-8">
									<p className="!text-red-500">
										{errors.descricao?.message}
									</p>
								</div>
							</div>
							<div className="br-upload w-113 h-25">
								<label
									className="upload-label"
									htmlFor="multiple-files"
								>
									<span>Envio de Imagem</span>
								</label>
								<div className="upload-button relative !flex !justify-start items-center gap-2">
									<i
										className="fa fa-cloud-upload"
										aria-hidden="true"
									></i>
									<input
										{...register("imagem")}
										className="upload-input w-full h-full"
										id="multiple-files"
										type="file"
										multiple={false}
										aria-hidden={false}
										aria-label="enviar arquivo"
									/>
									<label
										className="absolute upload-label w-full h-full pl-4 flex justify-start items-center"
										htmlFor="multiple-files"
									>
										<span className="upload-label-text ml-2 mt-1 text-blue-50">
											{imagem && imagem.length > 0
												? imagem[0].name
												: "Envio de Imagem..."}
										</span>
									</label>
									<div className="upload-list"></div>
								</div>
								<p className="text-base mt-1">
									Clique ou arraste a imagem para cima do
									componente Upload.
								</p>
								<div className="h-8">
									<p className="!text-red-500 h-full">
										{errors.imagem?.message}
									</p>
								</div>
							</div>
							<div className="w-full  h-[15%] flex justify-end items-center gap-4">
								<button
									onClick={handleModal}
									className="br-button secondary !mt-12 !w-25"
								>
									Cancelar
								</button>
								<button
									className="br-button primary !mt-12 !w-25"
									type="submit"
								>
									Publicar
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
