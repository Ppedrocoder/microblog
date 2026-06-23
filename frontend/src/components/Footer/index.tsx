import { memo } from "react";

export default memo(function BrFooter() {
	return (
		<>
			<footer className="br-footer">
				<div className="container-lg"></div>
				<span className="br-divider my-3"></span>
				<div className="container-lg">
					<div className="info">
						<div className="text-down-01 text-medium pb-3">
							<strong>PNP Hub</strong>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
})
