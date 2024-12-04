import app from "./app";
import http from "http"
import { connectDB } from "./db";
import { PORT } from "./constant";

const server = http.createServer(app)
const port = PORT || 8000

connectDB()
    .then(() => {
        server.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        })
    }).catch((err) => {
        console.log(`Database connection failed: ${err}`);
    })

