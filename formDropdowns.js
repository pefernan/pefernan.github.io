function initSelect(select) {
    select.length = 0;
    select.value = "";
    const defaultOption = document.createElement('option');
    defaultOption.selected = true;
    defaultOption.textContent = "Choose option...";
    select.appendChild(defaultOption);
}

function fetchCountries() {
    const countrySelect = document.getElementById('candidate.address.country');
    initSelect(countrySelect)

    const stateSelect = document.getElementById('candidate.address.state');
    initSelect(stateSelect);

    const citySelect = document.getElementById('candidate.address.city');
    initSelect(citySelect);

    fetch("https://countriesnow.space/api/v0.1/countries/flag/unicode")
        .then(response => response.json())
        .then(response => {
            response.data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name;
                option.textContent = country.name;
                countrySelect.appendChild(option);
            });
        });
}

function fetchCountryStates() {
    const country = document.getElementById('candidate.address.country').value;

    const stateSelect = document.getElementById('candidate.address.state');
    initSelect(stateSelect);

    const citySelect = document.getElementById('candidate.address.city');
    initSelect(citySelect);

    if (country) {
        const data = {
            "country": country
        }
        fetch("https://countriesnow.space/api/v0.1/countries/states", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                response.data.states.forEach(state => {
                    const option = document.createElement('option');
                    option.value = state.name;
                    option.textContent = state.name;
                    stateSelect.appendChild(option);
                })
            });
    }
}

function fetchStateCities() {
    const country = document.getElementById('candidate.address.country').value;
    const state = document.getElementById('candidate.address.state').value;

    const citySelect = document.getElementById('candidate.address.city');
    initSelect(citySelect);

    if (country && state) {
        const data = {
            "country": country,
            "state": state
        }
        fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                response.data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                })
            });
    }
}

fetchCountries();