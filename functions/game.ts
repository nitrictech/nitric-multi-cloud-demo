import { api } from "@nitric/sdk";
import { generateRoom } from "../rules";
import { nameCloud } from '../middleware/cloud';
import * as fs from "fs";

const mainApi = api('main', {
    middleware: nameCloud('???'),
});

// get a random room
mainApi.get("/room", async (ctx) => {
    const { enter } = ctx.req.query as unknown as Record<string, string>;

    ctx.res.json(generateRoom(enter));

    return ctx;
});

// return the game page
mainApi.get("/", async (ctx) => {
    // read the script content for injection
    const scriptFile = await fs.promises.readFile(`game/game.js`);
    const script = scriptFile.toString('utf-8');

    ctx.res.headers['Content-Type'] = ['text/html'];

    ctx.res.body = `
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Legend of Pulumi</title>
            <style>
                /* just to get rid of the white border and scrolling */
                body {
                margin: 0;
                overflow: hidden;
                }
            </style>
        </head>
        <body>
            <script src="https://kaboomjs.com/lib/0.5.0/kaboom.js"></script>
            <script>
                ${script}
            </script>
        </body>
    </html>
    `

    return ctx;
});

// return the sprites
mainApi.get("/sprites/:name", async (ctx) => {
    const { name } = ctx.req.params;

    const image = await fs.promises.readFile(`game/sprites/${name}`);

    ctx.res.body = image;
    ctx.res.headers['Content-Type'] = ['image/png'];

    return ctx;
});