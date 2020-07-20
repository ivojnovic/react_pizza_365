import React, { useState, useEffect} from 'react';


function Dropdown({data, index}) {
    return(
        <option>
            {data}
        </option>
    )
}
function VrstaDropdown() {
    const [vrsta, setVrsta] = useState(["ALL"]);
    const [podvrsta, setPodvrsta] = useState(["ALL"]);
    const [selectedVrsta, setSelectedVrsta] = useState(["ALL"]);
    const [selectedpodVrsta, setSelectedPodvrsta] = useState(["ALL"]);

    const [proizvodi, setProizvodi] = useState([]);
    const [proizvodaci, setProizvodaci] = useState(["ALL"]);
    const [selectedProizvodaci, setSelectedProizvodaci] = useState(["ALL"]);

    function getProizvod () {
        async function fetchData() {
            if(selectedVrsta[0] == "ALL" && selectedProizvodaci == "ALL" ){
                //Svi proizvodi svih vrsti svih proizvodaca
                console.log("SVE")
                const response = await fetch("http://localhost:1337/proizvod?populate=false");
                const data = await response.json();
                const data1 = data.map((data) => data);
                console.log(data1);
                setProizvodi(data1);
                
            }
            if(selectedVrsta[0] == "ALL" && selectedpodVrsta[0] == "ALL" && selectedProizvodaci != "ALL"){
                //svi proizvodi nekog proizvodaca
                console.log("Odabran proizvodac")
                const response = await fetch(`http://localhost:1337/proizvod-po-proizvodacu/${selectedProizvodaci}`)
                const data = await response.json();
                const data1 = data.map((data) => data);
                console.log(data1);
                setProizvodi(data1);
            }
            if(selectedVrsta[0] != "ALL" && selectedpodVrsta[0] == "ALL" && selectedProizvodaci == "ALL"){
                //Dohvati sve proizvode svih podvrsta svih proizvodaca prema vrsti => sviproizvodi po vrsti
                console.log("odabrana vrsta")
                const response = await fetch(`http://localhost:1337/proizvod-po-vrsti/${selectedVrsta}`)
                const data = await response.json();
                const data1 = data.map((data) => data);
                console.log(data1);
                setProizvodi(data1);
            }
            if (selectedVrsta[0] != "ALL" && selectedVrsta[0]== "ALL" && selectedProizvodaci != "ALL"){
                //po vrsti i proizvodacu
                console.log("Odabrana vrsta i proizvodac")
                const response = await fetch(`http://localhost:1337/proizvod-po-vrsti-i-proizvodacu/${selectedVrsta}/${selectedProizvodaci}`)
                const data = await response.json();
                const data1 = data.map((data) => data);
                console.log(data1);
                setProizvodi(data1);
            }
            if(selectedpodVrsta[0] != "ALL" && selectedProizvodaci == "ALL"){
                console.log("odabrana podvrsta")
                const response = await fetch(`http://localhost:1337/proizvod-po-podvrsti/${selectedpodVrsta}`)
                const data = await response.json();
                const data1 = data.map((data) => data);
                console.log(data1);
                setProizvodi(data1);
            }
            if (selectedVrsta[0] != "ALL" && selectedpodVrsta[0] != "ALL" && selectedProizvodaci != "ALL"){
                //dohvati proizvode po podvrsti i po proizvodacu
                console.log("Odabrana podvrsta i proizvodac")
                const response = await fetch(`http://localhost:1337/proizvod-po-podvrsti-i-proizvodacu/${selectedpodVrsta}/${selectedProizvodaci}`)
                const data = await response.json();
                const data1 = data.map((data) => data);
                console.log(data1);
                setProizvodi(data1);
            }


            
        }
        fetchData();
        console.log(selectedVrsta[0] != "ALL"); 
        console.log(selectedpodVrsta[0] != "ALL"); 
        console.log(selectedProizvodaci != "ALL");
        
    }


    

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:1337/proizvodac?populate=false");
            const data = await response.json();
            const data1 = data.map((data) => data.ime);
            setProizvodaci(proizvodaci.concat(data1));
        }
        fetchData();
    }, [])

    useEffect(() => {
            async function fetchData() {
            const response = await fetch('http://localhost:1337/vrsta?populate=false');
            const data = await response.json();
            const data1 = data.map((data) => data.name);
            setVrsta(vrsta.concat(data1))
            /*setSelectedVrsta(["All"])*/}
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            console.log(selectedVrsta)
            if(selectedVrsta[0]==="ALL"){setPodvrsta(["ALL"])}
            else {
                    const response = await fetch(`http://localhost:1337/vrsta?name=${selectedVrsta}`)
                    const data = await response.json()
                    const [data1] = data.map((data) => data.podvrsta)
                    const data2 = data1.map((data1) => data1.name)
                    setPodvrsta(podvrsta.concat(data2));}}
        fetchData();
    }, [selectedVrsta])

    return (
        <div className="VrstaDropdown">
            <h1>Odabir vrste</h1>
            <hr></hr>
            <form            
                onSubmit={(e) => {
                e.preventDefault();
                getProizvod();
                console.log(proizvodi)
            }}>

            <select className="vrsta form-control col-md-4" onChange={e => setSelectedVrsta([e.currentTarget.value])}>
                {vrsta.map((vrsta, index) =>(
                    <Dropdown key={index} index={index} data={vrsta} />
                ))}
            </select>
            <br></br>
            <select className="podvrsta form-control col-md-4" onChange={e => setSelectedPodvrsta([e.currentTarget.value])}>
                {}
                {podvrsta.map((podvrsta, index) =>(
                    <Dropdown key={index} index={index} data={podvrsta} />
                ))}
            </select>
            <h1>Odabir proizvodaca</h1><hr></hr>
            <select className="proizvodaci form-control col-md-4" onChange={e => setSelectedProizvodaci(e.currentTarget.value)}>
                {proizvodaci.map((proizvodaci, index) =>(
                    <Dropdown key={index} index={index} data={proizvodaci} />
                ))}
            </select>
            <br></br>
            <button className="button btn .btn-default">Find</button>
            <Rezultat proizvodi={proizvodi}></Rezultat>
            </form>
        </div>
    );
}

export default VrstaDropdown;
