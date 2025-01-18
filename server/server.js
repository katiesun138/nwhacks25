const express = require("express")
const app = express();
const cors = require("cors")
const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))
app.use(express.json())

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"]});
})

app.post("/verify", (req, res) => {
    console.log("HELLO")
    console.log(req.body);
    res.send({ message: 'Received data', data: req.body });
}
)

app.listen(8080, ()=> {
    console.log("server started on port 8080");
})