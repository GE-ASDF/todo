const app = require("./app");
const config = require("../config/config");
const PublicRoutes = require("../routes/PublicRoutes");
const PrivateRoutes = require("../routes/PrivateRoutes");

app.use("/", ...PublicRoutes);
app.use("/admin", ...PrivateRoutes);

app.listen(config.PORT, ()=>{
    console.log("backend rodando")
})