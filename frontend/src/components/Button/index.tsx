import { memo } from "react";

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