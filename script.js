
    async function getWeather(lat, lon, countryName) {
  const apiKey = "9cd267011a4082e76279beb9f37075c0";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    const temp = data.main.temp;
    const description = data.weather[0].description;
    console.log(`Weather in ${countryName}: ${temp}°C, ${description}`);
    alert(`Weather in ${countryName}: ${temp}°C, ${description}`);
  } catch (error) {
    console.log("Error fetching weather data:", error);
    alert("Error fetching weather data");
  }
}

async function getData() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

console.log(countries);
    countries.forEach (country =>{

    const card = document.createElement('div');
        card.classList.add('col-sm-6', 'col-md-4', 'col-lg-4','col-xl-4' ,'my-3');

        
        const cardBody = document.createElement('div');
        cardBody.classList.add('card', 'text-center', 'h-100');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header', 'py-3');
        cardHeader.innerText = country.name.common;

        const cardImage = document.createElement('img');
        cardImage.classList.add('card-img-top', 'mx-auto', 'mt-4');
        cardImage.src = country.flags.png;
        cardImage.style = 'max-height: 150px;';

        const cardBodyContent = document.createElement('div');
        cardBodyContent.classList.add('card-body');

        const cardText=document.createElement('div')
       cardText.classList.add('card-text')

        const region = document.createElement('p');
        region.innerText = `Region : ${country.region ?? 'N/A'}`;

        const capital = document.createElement('p');
        capital.innerText = `Capital : ${country.capital ?? 'N/A'}`;

        const Nativename = document.createElement('p');
        const N=Object.values(country.name.nativeName ?? 'N/A')               
        Nativename.innerText = `Native Name : ${N[0].official}`;     

        const population = document.createElement('p');
        population.innerText = `Population : ${country.population ?? 'N/A'}`;

             // create weather button
const weatherBtn = document.createElement("button");
weatherBtn.textContent = "click for weather";
weatherBtn.classList.add("btn", "btn-primary", "mt-2");
weatherBtn.setAttribute("type", "button");
weatherBtn.setAttribute("data-lat", country.latlng[0]);
weatherBtn.setAttribute("data-lon", country.latlng[1]);

// add event listener to weather button
weatherBtn.addEventListener("click", () => {
  const lat = weatherBtn.getAttribute("data-lat");
  const lon = weatherBtn.getAttribute("data-lon");
  getWeather(lat, lon, country.name.common);
});

cardText.appendChild(capital);
cardText.appendChild(region);
cardText.appendChild(Nativename);
cardText.appendChild(population);
cardBodyContent.appendChild(cardText)
cardBodyContent.appendChild(weatherBtn); 

cardBody.appendChild(cardHeader);
cardBody.appendChild(cardImage);
cardBody.appendChild(cardBodyContent);
        
        card.appendChild(cardBody);
        document.getElementById('cardRow').appendChild(card);
    });
}
    getData();
