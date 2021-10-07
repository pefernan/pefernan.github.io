function validateSalary() {
    const salaryInput = document.getElementById('candidate.salary');
    const salaryInputHelper = document.getElementById('candidate.salary_helper');

    salaryInput.classList.remove('is-invalid');
    salaryInputHelper.classList.remove('invalid-feedback');
    salaryInputHelper.textContent = '';


    const salary = salaryInput.value;

    if (salary > 1000000) {
        salaryInput.classList.add('is-invalid');
        salaryInputHelper.classList.add('invalid-feedback');
        salaryInputHelper.textContent = 'The salary is too high, employees cannot earn more than a 10000000$';
        return false;
    }
    return true;
}

function initSelect(select, label) {
    select.length = 0;
    select.value = "";
    const defaultOption = document.createElement('option');
    defaultOption.selected = true;
    defaultOption.textContent = label;
    select.appendChild(defaultOption);
}


function fetchCountries() {
    const countrySelect = document.getElementById('candidate.address.country');
    initSelect(countrySelect, "-- Select the Country --")

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
    initSelect(stateSelect, "-- Select the State --");


    const citySelect = document.getElementById('candidate.address.city');
    initSelect(citySelect, "-- Select the City --");

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

function fetCities() {
    const country = document.getElementById('candidate.address.country').value;
    const state = document.getElementById('candidate.address.state').value;

    const citySelect = document.getElementById('candidate.address.city');
    initSelect(citySelect, "-- Select the City --");

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