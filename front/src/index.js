const express=require('express')
const path = require('path');
const cookieParser = require('cookie-parser')
const axios = require('axios');

const app = express();
const PORT = 3001;
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.get("/kanban", async function(req, res){
  const access_token = req.cookies.access_token;
  console.log(access_token);
  const response = await axios.get('http://localhost:3000/auth/profile', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  const profile = response.data;
  console.log(profile);
  res.render("kanban");
})

app.get("/login", function(req, res){
  res.render("login");
})

app.get("/signup", function(req, res){
  res.render("signup");
});

app.post("/signup", async function(req, res){
  const user=req.body;

  const response = await axios.post("http://localhost:3000/users/signup", user);
  return res.redirect("/login")
});

app.post('/login', async function(req, res) {
  const user = req.body;
  console.log(user)
  const response = await axios.post("http://localhost:3000/auth/login", {name:user.name, password:user.password});
  console.log(response.data)
  const {access_token} = response.data.token;
  console.log(access_token)
  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 dia em milisegundos
  });
  return res.redirect('/kanban');
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});