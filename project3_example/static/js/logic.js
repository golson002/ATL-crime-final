var url = '/crimedata';
earthquakeMarkers = [];

function chooseColorType(crime) {
    if (crime == "LARCENY-FROM VEHICLE") {
        return 'rgba(255,0,0, 1)'
    }
    else if (crime == "LARCENY-NON VEHICLE") {
        return 'rgba(0,230,64, 1)'
    }
    else if (crime == "AGG ASSAULT") {
        return 'rgba(255,255,0, 1)'
    }
    else if (crime == "ROBBERY") {
        return 'rgba(15,10,222, 1)'
    }
    else if (crime == "BURGLARY") {
        return 'rgba(249, 105, 14, 1)'
    }
    else if (crime == "AUTO THEFT") {
        return 'rgba(153, 102, 255, 1)'
    }
    else if (crime == "HOMICIDE") {
        return 'rgba(0, 0, 0, 1)'
    }
}

function chooseColorZone(crime) {
    if (crime == 1) {
        return "red"
    }
    else if (crime == 2) {
        return "orange"
    }
    else if (crime == 3) {
        return "green"
    }
    else if (crime == 4) {
        return "blue"
    }
    else if (crime == 5) {
        return "yellow"
    }
    else if (crime == 6) {
        return "purple"
    }
}

d3.json(url).then(function (response) {
    console.log(response);
    typeMarkers = [];
    zoneMarkers = [];
    for (var i = 0; i < 20315; i++) {

            typeMarkers.push(
                L.circle([response[i].lat, response[i].long],
                    {
                        stroke: false,
                        fillOpacity: 0.75,
                        color: chooseColorType(response[i].crime_type),
                        fillColor: chooseColorType(response[i].crime_type),
                        radius: 100
                    }).bindPopup(`<h3>Offense ID: ${response[i].offense_id}</h3><hr><p>${response[i].crime_type}</p><p>ZONE ${response[i].zone}</p><p>${response[i].neighborhood}</p><p>${response[i].location[i]}</p><p>${response[i].occur_time} ${response[i].occur_day} ${response[i].occur_date}</p>`)
            )
        
        zoneMarkers.push(
            L.circle([response[i].lat, response[i].long],
                {
                    //stroke: false,
                    fillOpacity: 0.75,
                    color: chooseColorZone(response[i].zone),
                    fillColor: chooseColorZone(response[i].zone),
                    //radius: 100
                }).bindPopup(`<h3>Offense ID: ${response[i].offense_id}</h3><hr><p>${response[i].crime_type}</p><p>ZONE ${response[i].zone}</p><p>${response[i].neighborhood}</p><p>${response[i].location[i]}</p><p>${response[i].occur_time} ${response[i].occur_day} ${response[i].occur_date}</p>`)
        )


    }
    console.log(typeMarkers)
    
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var typeLayer = L.layerGroup(typeMarkers);
    var zoneLayer = L.layerGroup(zoneMarkers);

    var baseMaps = {
        Street: street
    };

    var overlayMaps = {
        CrimeType: typeLayer,
        Zones: zoneLayer
    };

    var myMap = L.map("map", {
        center: [33.75, -84.4],
        zoom: 11.45,
        layers: [street, zoneLayer]
        // layers: [street]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    // L.control.layers(baseMaps).addTo(myMap);


});




