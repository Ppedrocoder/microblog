export default function formatarDataHora(dataISO: string) {
	return new Date(dataISO).toLocaleString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}
