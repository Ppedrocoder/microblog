import { memo } from "react";

/**
 * Componente de Postagem (`BrPostagem`), utilizado para exibir informações de uma postagem na página.
 *
 * Suporta a exibição de imagem, título, autor, descrição e data da postagem.
 *
 * @param autor - O autor da postagem.
 * @param titulo - O título da postagem.
 * @param imagem - A URL da imagem da postagem.
 * @param descricao - A descrição da postagem.
 * @param dia - A data da postagem.
 * 
 * @returns Um elemento JSX representando a postagem de determinado usuário.
 *
 * @example
 * ```tsx
 * <BrPostagem 
 * 		autor="Pedro Ricardo" 
 * 		titulo="Minha Postagem" 
 * 		imagem="/path/to/image.jpg" 
 * 		descricao="Descrição da postagem" 
 * 		dia="25/06/2026" 
 * />
 * ```
 *
 * @author Pedro Ricardo
 * @since 25/06/2026
 * @updated 25/06/2026
 * @version 1.0.0
 */

type PostagemProps = {
	autor: string;
	titulo: string;
	imagem: string;
	descricao: string;
	dia: string;
};
export default memo(function BrPostagem(props: PostagemProps) {
	return (
		<>
			<div className="p-4 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
				<img
					className="w-114 h-65 border border-transparent rounded-t-2xl"
					src={props.imagem}
					alt={props.titulo}
				/>
				<div className="br-modal medium w-114 justify-center items-center">
					<div className="w-full h-full flex flex-col justify-start gap-2 p-4">
						<div className="w-full flex flex-row gap-12">
							<div className="w-full grid grid-cols-2 gap-12">
								<div className="w-full h-15">
									<h1 className="leading-tight !text-xl !font-bold w-50 mb-0">
										{props.titulo}
									</h1>
									<h2 className="text-semi-bold !text-sm w-50 h-5 mt-0">
										{props.autor} - {props.dia}
									</h2>
								</div>
							</div>
						</div>
						<p className="w-full overflow-hidden !text-sm">
							{props.descricao}
						</p>
						<span className="br-divider w-full"></span>
					</div>
				</div>
			</div>
		</>
	);
})
