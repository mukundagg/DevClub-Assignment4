console.log("Loaded script.js");

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
var parsedData = fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result))
    .catch(error => console.log('error', error));

var parse30DaysIndia = null, allCountriesData = [], indiaCases = null, last30DaysArr = [], countryFullNm = "India";

function getParsed30Data(x) {
    x = String(x);
    var editedTxt = x.toLowerCase().replaceAll(" ", "-").replace(",", "");
    parse30DaysIndia = fetch("https://api.covid19api.com/live/country/" + editedTxt + "/status/confirmed", requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => console.log('error', error));
}

function getNewCountryVal() {
    countryFullNm = document.getElementById("countriesList").value;
    getParsed30Data(countryFullNm);

    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    last30DaysArr = [];

    getCountryValues();
}

const getCountryValues = async () => {
    const val = await parsedData;
    getParsed30Data(countryFullNm);
    const vls = await parse30DaysIndia;

    allCountriesData = val.Countries;
    const getData = () => {
        for (var i = 0; i < allCountriesData.length; i++) {
            if (allCountriesData[i]['Country'] == countryFullNm) {
                indiaCases = allCountriesData[i];
                continue;
            }
            var opt = document.createElement("option");
            opt.value = allCountriesData[i].Country;
            opt.innerText = opt.value;
            $('#countriesList').append(opt);
        }
    }
    getData();

    var gDsip = document.getElementsByClassName("gdisp");
    gDsip[0].textContent = " " + parseInt(val.Global.TotalConfirmed).toLocaleString();
    gDsip[1].textContent = " " + parseInt(indiaCases.TotalConfirmed).toLocaleString();
    document.getElementById("ttlCnt").innerHTML = "Total Confirmed <br /> Cases in " + String(countryFullNm);

    for (var i = vls.length - 1; i > vls.length - 31; i--) {
        last30DaysArr.push(vls[i].Active);
    }
    dt = last30DaysArr;

    // Only after fetching draw the chart
    const data = {
        labels: labels,
        datasets: [{
            label: 'Reported active COVID Cases - ' + countryFullNm,
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 205, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(201, 203, 207, 0.7)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            data: last30DaysArr,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    };
    const myChart = new Chart($('#myChart'), config);
    $(".loading").fadeOut("slow", "linear");
}

