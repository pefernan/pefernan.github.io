function validateSalary() {
    const salaryInput = document.getElementById('candidate.salary');
    const salaryInputHelper = document.getElementById('candidate.salary_helper');

    salaryInput.classList.remove('is-invalid');
    salaryInputHelper.classList.remove('invalid-feedback');
    salaryInputHelper.textContent = '';
    

    const salary = salaryInput.value;

    if(salary > 1000000) {
        salaryInput.classList.add('is-invalid');
        salaryInputHelper.classList.add('invalid-feedback');
        salaryInputHelper.textContent = 'The salary is too high, employees cannot earn more than a 10000000$';
        return false;
    }
    return true;
}


function fetchCountries() {
    const countrySelect = document.getElementById('candidate.address.country');
    countrySelect.empty();

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