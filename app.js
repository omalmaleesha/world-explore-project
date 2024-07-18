function togglePanel(index) {
    // Toggle display of the details panel for the clicked card
    var panel = document.getElementById(`details-panel-${index}`);
    panel.classList.toggle('show');
}

function closePanel(index) {
    // Close the details panel for the clicked card
    var panel = document.getElementById(`details-panel-${index}`);
    panel.classList.remove('show');
}




document.addEventListener('DOMContentLoaded',() => {
    clickedButton();
    getRandomCountryInfo(10);
});
const fallbackImages = [
    'https://source.unsplash.com/random/300x200?nature',
    'https://source.unsplash.com/random/300x200?city',
    'https://source.unsplash.com/random/300x200?landscape',
    'https://source.unsplash.com/random/300x200?sea',
    'https://source.unsplash.com/random/300x200?mountain'
];

async function clickedButton(){

  const navigationHomeButton = document.getElementById("search_btn");
  if (navigationHomeButton) {
    navigationHomeButton.addEventListener("click", function () {
      window.location.href = "/searchPage.html";
    });
  }

}
async function getRandomCountryInfo(count){
    try{
        //get all countries from REST API
        const countriesResponse = await fetch('https://restcountries.com/v3.1/all');
        const countriesData = await countriesResponse.json();

        const selectedCountries = [];
        while(selectedCountries.length<count){
            const randmIndex = Math.floor(Math.random() * countriesData.length);
            const country = countriesData[randmIndex];
            if(!selectedCountries.some(c => c.name.common === country.name.common)){
                selectedCountries.push(country);
            }
     
        }

        selectedCountries.forEach((country, index) =>{
            const countryDetail = `
                ${country.name.common} is located in ${country.region} with a population of ${country.population}.
            `;
            document.getElementById(`country-name-${index}`).textContent = country.name.common;
            document.getElementById(`country-detail-${index}`).textContent = countryDetail;

            fetch(`https://api.unsplash.com/search/photos?query=${country.name.common}&client_id=SrSjOXnKhHfYFUVxaF8oKU2TxeFRJ3_h5udVzaS07mE`)
                .then(response => response.json())
                .then(unsplashData => {
                    const imageUrl = unsplashData.results[0]?.urls.regular || fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                    const imgElement = document.getElementById(`country-img-${index}`);
                    imgElement.src = imageUrl;
                    imgElement.alt = `Image of ${country.name.common}`;

                    // Add error event listener to handle image loading errors
                    imgElement.onerror = () => {
                        imgElement.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                        imgElement.alt = 'Fallback image';
                    };
                    
                })
                .catch(error => {
                    console.error('Error fetching country image:', error);
                    const imgElement = document.getElementById(`country-img-${index}`);
                    imgElement.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                    imgElement.alt = 'Fallback image';
                 
                });

        });
        
       

    }catch(erro){

        console.error('Error fetching country info:', erro);
        for(let i = 0; i, count ; i++){
            document.getElementById('country-name').textContent = 'Error';
            document.getElementById('country-detail').textContent = 'Could not fetch country details. Please try again.';
            const imgElement = document.getElementById(`country-img-${i}`);
            imgElement.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
            imgElement.alt = 'Fallback image';
        
        }
        
    }
}