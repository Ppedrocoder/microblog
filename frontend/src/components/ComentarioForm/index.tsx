import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComentarioService from "../../services/models/ComentarioService";
import type { ComentarioInterface } from "../../interfaces/ComentarioInterface";
import { memo } from "react";
import BrButton from "../../components/Button";

/**
 * Componente de Formulário de Comentário (`ComentarioForm`), utilizado para criar comentários em 
 * uma postagem específica.
 *
 * Suporta criação de comentários com validação de campos, integração com o backend e 
 * atualização da lista de comentários.
 *
 * @param postagemId - O ID da postagem à qual o comentário pertence.
 * @param setComentarios - Função para atualizar a lista de comentários.
 *
 * @returns Um elemento JSX representando o fomulário para registrar um comentário.
 *
 * @example
 * ```tsx
 * <BrComentarioForm postagemId="123" setComentarios={setComentarios} />
 * ```
 *
 * @author Pedro Ricardo
 * @since 25/06/2026
 * @updated 25/06/2026
 * @version 1.0.0
 */

interface ComentarioFormProps {
	postagemId: string;
	setComentarios: React.Dispatch<React.SetStateAction<ComentarioInterface[]>>;
}

const schema = yup.object().shape({
	mensagem: yup.string().required("O comentário é obrigatório"),
});

type FormDataComentario = yup.InferType<typeof schema>;

export default memo(function BrComentarioForm(props: ComentarioFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });
	function onSubmit(data: FormDataComentario) {
		const enviarComentario = async () => {
			try {
				const response = await ComentarioService.criarComentario({
					...data,
					publicacao: Number(props.postagemId),
				});
				reset();
				props.setComentarios((prevComentarios) => [
					{
						id: response.data.id,
						autor: response.data.autor,
						publicacao: response.data.publicacao,
						mensagem: response.data.mensagem,
						publicado_em: response.data.publicado_em,
					},
					...prevComentarios,
				]);
				console.log("Comentário enviado com sucesso");
			} catch (error) {
				console.error("Erro ao enviar comentário:", error);
			}
		};
		enviarComentario();
	}
	return (
		<>
			<div className="w-250 flex justify-center items-center z-0">
				<div className="br-modal w-120 h-55 flex flex-col justify-center items-center border border-transparent rounded-3xl">
					<form
						className="w-full h-full flex flex-col justify-center items-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="br-textarea w-100 mt-4">
							<label htmlFor="textarea-id1">Comentário</label>
							<textarea
								className="w-full resize-none"
								{...register("mensagem")}
								id="textarea-id1"
								placeholder="Escreva seu comentário aqui..."
							></textarea>
							<div className="h-8">
								{errors.mensagem && (
									<p className="!text-red-500">
										{errors.mensagem.message}
									</p>
								)}
							</div>
						</div>
						<BrButton
							className="primary !w-25 mb-4"
							action={handleSubmit(onSubmit)}
							children="Enviar"
						/>
					</form>
				</div>
			</div>
		</>
	);
});
