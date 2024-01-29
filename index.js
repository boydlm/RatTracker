let map, heatmap, pointArray;

function initMap() {

    getPoints()

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 42.3601, lng: -71.0589 },
        mapTypeId: "terrain",
    });

    map.addListener("click", addPoint);
}

function addPoint(e) {
    const latitude = e.latLng.toJSON()['lat']
    const longitude = e.latLng.toJSON()['lng']

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
            // Create a new point with the lat and long from click event
            const point = new google.maps.LatLng(data.latitude, data.longitude)
            // Add the new point to the heatmap
            pointArray.push(point)
        })
        .catch((error) => {
            console.log(error)
        });
}

function getPoints() {
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
            for (let i in data) {
                let newPoint = new google.maps.LatLng(data[i]["latitude"], data[i]["longitude"])
                dataPoints.push(newPoint)
            }

            pointArray = new google.maps.MVCArray(dataPoints);
            heatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray,
                map: map
            });
            heatmap.set("radius", 60)
            heatmap.set("opacity", 0.9)
        })
        .catch((error) => {
            console.log(error)
        });

    return dataPoints
}
window.initMap = initMap;
