// Test-only provider for creating real Pi sessions without credentials or
// network access. Echoing user messages lets the test identify which session
// Pi resumed while keeping model execution entirely local.
import { fauxAssistantMessage, fauxProvider } from "@earendil-works/pi-ai";

export default function (pi) {
	const faux = fauxProvider();
	faux.setResponses([
		(context) =>
			fauxAssistantMessage(
				context.messages
					.flatMap((message) =>
						message.role === "user" && typeof message.content === "string" ? [message.content] : [],
					)
					.join("\n"),
			),
	]);
	pi.registerProvider(faux.provider);
}
