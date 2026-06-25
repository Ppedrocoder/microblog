import { memo } from "react";
import type { ComentarioInterface } from "../../interfaces/ComentarioInterface";
import formatarDataHora from "../../utils/formatarData";

/**
 * Componente de Lista de Comentários (`ListaComentarios`), utilizado para exibir uma lista de comentários
 * associados a uma postagem específica.
 *
 * Suporta a exibição de informações do autor, data e hora da publicação e o conteúdo do comentário.
 *
 * @param comentarios - Array de objetos representando os comentários a serem exibidos.
 *
 * @returns Um elemento JSX representando a lista de comentários.
 *
 * @example
 * ```tsx
 * <ListaComentarios comentarios={comentarios} />
 * ```
 *
 * @author Pedro Ricardo
 * @since 25/06/2026
 * @updated 25/06/2026
 * @version 1.0.0
 */

interface ComentarioProps {
	comentarios: ComentarioInterface[];
}

export default memo(function ListaComentarios(props: ComentarioProps) {
	const { comentarios } = props;
	return (
		<>
			<div>
				<h3>Comentários</h3>
				{comentarios.map((comentario: ComentarioInterface) => (
					<div
						key={comentario.id}
						className="w-250"
					>
						<div>
							<h4 className="font-bold !text-lg mb-0">
								{comentario.autor.username}
							</h4>
							<span className="text-sm text-gray-500">
								{formatarDataHora(comentario.publicado_em)}
							</span>
						</div>
						<p>{comentario.mensagem}</p>
					</div>
				))}
			</div>
		</>
	);
})
