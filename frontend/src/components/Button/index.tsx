import { memo } from "react";

/**
 * Componente de Botão (`BrButton`), utilizado para permitir que os usuários executem
 * ações, acessem funcionalidades ou naveguem pela interface.
 *
 * Suporta customizações avançadas como carregamento visual, estilizações primárias e secundárias,
 * formatos (como circular) e diferentes tamanhos.
 *
 * @param className - Classes de estilização CSS adicionais do componente.
 * @param action - Ação disparada quando o botão for acionado.
 * @param children - O conteúdo interno do componente (texto, nós React).
 * @param disabled - Se `true`, desativa o botão, impedindo interações.
 *
 * @returns Um elemento JSX representando o botão interativo.
 *
 * @example
 * ```tsx
 * <BrButton action={() => console.log("Clicado!")} children={"Enviar"} />
 * ```
 *
 * @author Pedro Ricardo
 * @since 25/06/2026
 * @updated 25/06/2026
 * @version 1.0.0
 */

interface BrButtonProps {
    className: string;
    action?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

export default memo(function BrButton(props: BrButtonProps) {
    const { className, action, children, disabled } = props;
    return (
        <>
            <button disabled={disabled} className={`br-button ${className}`} onClick={action}>
                {children}
            </button>
        </>
    )
})