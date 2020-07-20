import axios from "axios";

class Register {

  register(email, password) {
    return axios.post("http://localhost:1337/JWTregister/", {email,password,})
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default Register();
