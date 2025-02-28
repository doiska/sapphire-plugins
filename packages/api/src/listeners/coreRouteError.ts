import { Listener } from '@sapphire/framework';
import { HttpCodes } from '../lib/structures/http/HttpCodes';
import { ServerEvents, type MiddlewareErrorContext } from '../lib/structures/http/Server';

export class PluginListener extends Listener {
	public constructor(context: Listener.Context) {
		super(context, { emitter: 'server', event: ServerEvents.RouteError });
	}

	public run(error: Error, { response }: MiddlewareErrorContext) {
		// Log the error to console:
		this.container.logger.fatal(error);

		// Send a response to the client if none was sent:
		if (!response.writableEnded) response.status(HttpCodes.InternalServerError).json({ error: error.message ?? error });
	}
}
