let map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 42.3601, lng: -71.0589 },
        mapTypeId: "terrain",
    }
    );
    getPoints().then(points => {
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: points, 
            map: map,
        });
    });

    map.addListener("click", addPoint);

}

function addPoint(e) {
    console.log(e);
    const latitude = e.latLng.toJSON()['lat']
    const longitude = e.latLng.toJSON()['lng']

    console.log(latitude);
    console.log(longitude);

    fetch('https://3vmehyy0y6.execute-api.us-east-1.amazonaws.com/prod/rat-location', {
        method: 'POST',
        body: JSON.stringify({
            "latitude": latitude,
            "longitude": longitude
        })
    })
        .then(response => {
            if (response.status != 201) {
                throw new Error('unable to create new data point');
            }
            console.log("successfully added data point")
            return response.json()
        })
        .then(data => {
            console.log("new data point: ")
            console.log(data.latitude)
            console.log(data.longitude)
            // Create a new point with the lat and long from click event
            const point = new google.maps.LatLng(data.latitude, data.longitude)
            // Add the new point to the heatmap
            heatmap.data.push(point)
        })
        .catch((error) => {
            console.log(error)
        });
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

async function getPoints() {
    let dataPoints = []

    fetch('https://3vmehyy0y6.execute-api.us-east-1.amazonaws.com/prod/rat-locations', {
        method: 'GET'
    })
        .then(response => {
            if (response.status != 200) {
                throw new Error('unable to fetch data points');
            }
            console.log("successfully fetched data points")
            return response.json()
        })
        .then(data => {
            console.log("data: ")
            console.log(data)
            for (let i in data) {
                console.log("adding data point to map: ", data[i]["latitude"], data[i]["longitude"])
                let newPoint = new google.maps.LatLng(data[i]["latitude"], data[i]["longitude"])
                dataPoints.push(newPoint)
            }
        })
        .catch((error) => {
            console.log(error)
        });

    return dataPoints
}
window.initMap = initMap;
