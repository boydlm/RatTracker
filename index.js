let map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 42.3601, lng: -71.0589 },
        mapTypeId: "satellite",
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map,
    });
    map.addListener("click", addPoint);
}

function addPoint(e) {
    console.log(e);  
    const latitude = e.latLng.toJSON()['lat']
    const longitude = e.latLng.toJSON()['lng']

    console.log(latitude);
    console.log(longitude);

    //Insert lat/long into DynamoDB by calling API gateway
    fetch('https://3vmehyy0y6.execute-api.us-east-1.amazonaws.com/prod', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,GET,OPTIONS'
    },
    body: JSON.stringify({
        "latitude": latitude,
        "longitude": longitude
        })
    })
   .then(response => response.json())
   .then(response => console.log(JSON.stringify(response)))


    const point = new google.maps.LatLng(latitude, longitude)
    heatmap.data.push(point)

  }

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    const gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
    ];

    heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

// Heatmap data: 500 Points
function getPoints() {

    const maxLat = 42.4573084452935
    const minLat = 42.265772649664264
    const minLong = -71.14029959929394
    const maxLong = -70.9788192028027

    let randomDataPoints =[]

    //loop 500 times and create new random datapoint in that range

    for (let i=0; i < 500; i++) {
        let lat = Math.random() * (maxLat - minLat)+ minLat
        let long = Math.random() * (maxLong - minLong)+ minLong 
        let randomPoint = new google.maps.LatLng(lat, long)
        randomDataPoints.push(randomPoint)
    }

    return randomDataPoints 

    //fetch real data points from DynamoDB and insert them into an array like below
}

window.initMap = initMap;
