// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


function getWeather() {
    username = ''
    password = ''


    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    fetch('https://login.meteomatics.com/api/v1/token', {
        method: 'GET', headers: headers
    }).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        var token = data.access_token;
        fetch('https://api.meteomatics.com/2023-06-12T11:15:00.000+02:00/t_2m:C/44.841225,-0.5800364/json?access_token=' + token)
            .then(res => res.json())
            .then(data => {
                var temp = data.data[0].coordinates[0].dates[0].value;

                var t = document.getElementById('temperature');
                if (t) {
                    t.textContent = "Il fait actuellement: " + temp + "°";
                }
                else {
                    var t = document.createElement('h2');
                    t.id = 'temperature';
                    t.classList.add('centered');
                    t.textContent = "Il fait actuellement: " + temp + "°";
                    document.body.appendChild(t);
                }
            })
    }).catch(function (err) {
        console.log('something went wrong', err);
    });


}