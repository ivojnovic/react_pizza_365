import React from "react";

class Proizvodac extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {};
    this.id = props.id;
}

  componentDidMount() {
    const [user, setUser] = this.context;
    const token = (user && user.accessToken) || "";
    fetch(`http://localhost:1337/proizvodac/${this.id}`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((resp) => {
        if (!resp.ok && resp.status == 401) {
          setUser(null);
        }
        return resp.json();
      })
      .then((resp) => {
        this.setState({
          ime: resp.ime,
          tip: resp.tip,
          adresa: resp.adresa,
          drzava: resp.drzava,
          telefon: resp.drzava,
        });
      }, console.error);
  }

  render() {

    const { ime, tip, adresa, drzava, telefon } = this.state;
    return (
      <div className="proizvodac">
        <h1>{ime}</h1>
        <h1>{tip}</h1>
        <h1>{adresa}</h1>
        <h1>{drzava}</h1>
        <h1>{telefon}</h1>
      </div>
    );
  }
}

export default Details;
