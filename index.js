'use strict'

const searchURL = 'https://api.github.com';
const apiVersion = 'application/vnd.github.v3+json';

function getRepoData(username) {
    const url = searchURL + `/users/${username}/repos`;

    console.log(url);

    const options = {
        headers: new Headers({
            "Accept": apiVersion,
        })
    };

    $('#js-user-heading').text(`${username}\'s Repos:`);

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            $('#results-list').empty();
            $('#js-user-heading').text('Please Try again');
            throw new Error(response.statusText); 
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            console.log(error);
            $('#js-error-message').text(`Something went wrong: ${error.message}`);
        });
}

function displayResults(responseJson) {

    console.log(responseJson);

    $('#results-list').empty();
    
    for(let index = 0; index < responseJson.length; index++) {
        $('#results-list').append(
            `<li><h3><a href="${responseJson[index].html_url}" target="_blank">${responseJson[index].name}</a></h3>
            <p>${responseJson[index].description}</p>
            </li>`
    )};

    $('#results').removeClass('hidden');
};

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        const username = $('#search-user').val();
        getRepoData(username);
    });
}

$(watchForm);

// https://api.github.com/users/StevieReyJuan/repos