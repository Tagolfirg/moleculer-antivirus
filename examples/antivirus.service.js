"use strict";

const {ServiceBroker} = require("moleculer");
const AntiVirusService = require("./..");

// Create broker
let broker = new ServiceBroker({
	logger: console,
	transporter: 'nats://nats:4222'
});

// Load services
broker.createService({
	mixins: AntiVirusService,
	settings: {
		clamdHost: "clamav"
	}
});

process.once('SIGUSR2', function () {
	broker.stop().then(() => {
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Start server
broker.start().then(() => broker.repl());
