import { startServer } from "./startServer.js";

import { initMongoDB } from "./db/initMongoColection.js";

const bootstrap = async () => {
    await initMongoDB();
    startServer();
}

bootstrap();