import {createApp} from './index';

const PORT: number = 3000;

const listenApp = async () => {
    let app;

    app = await createApp();

    return app.listen(PORT, () => {
        console.log(`Server is running in host: http://localhost:${PORT}`);
    })
}

listenApp();