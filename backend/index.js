import app from "./app.js";

app.listen(process.env.PORT || 8000, () => {
    console.log(`SERVER IS LISTENING AT PORT : ${process.env.PORT}`);
})
