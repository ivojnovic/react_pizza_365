import axios from "axios";

class Auth {

  login(email, password) {
    return axios.post("http://localhost:1337/JWTlogin/", {email,password,}
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      );
  }
}

export default Auth();
