// Define URL for data
var crimedata = '/crimedata'

d3.json(crimedata).then((atldata) => {
    row = atldata
    aggAssault1 = [];
    autoTheft1 = [];
    burglary1 = [];
    homicide1 = [];
    larcenyFromVehicle1 = [];
    larcenyNonVehicle1 = [];
    robbery1 = [];
    row.forEach(holder => {
        if(holder.crime_type =="AGG ASSAULT"){
            aggAssault1.push(holder.crime_type);        
        } else if (holder.crime_type == "AUTO THEFT"){
            autoTheft1.push(holder.crime_type);
        } else if (holder.crime_type == "BURGLARY"){
            burglary1.push(holder.crime_type);
        } else if (holder.crime_type == "HOMICIDE"){
            homicide1.push(holder.crime_type);
        } else if (holder.crime_type == "LARCENY-FROM VEHICLE"){
            larcenyFromVehicle1.push(holder.crime_type);
        } else if (holder.crime_type == "LARCENY-NON VEHICLE"){
            larcenyNonVehicle1.push(holder.crime_type);
        } else if (holder.crime_type == "ROBBERY"){
            robbery1.push(holder.crime_type)
        }
    });

    var outbardict = {
        "Agg. Assult": aggAssault1.length, 
        "Auto Theft": autoTheft1.length,
        "Burglary": burglary1.length,
        "Homicide": homicide1.length,
        "Larceny (V)": larcenyFromVehicle1.length, 
        "Larceny (NV)": larcenyNonVehicle1.length,
        "Robbery":robbery1.length
    }
    console.log(outbardict);

    // Horizontal bar chart based on "name" selection
    var bar_trace = {
        x: Object.keys(outbardict),
        y: Object.keys(outbardict).map(function (key) { return outbardict[key]; }),
        type: 'bar', 
        marker: {
            color: 'rgb(180, 98, 255)'
        }
    }

    var bar_data = [bar_trace];

    var bar_layout = {
        title: {
            text: "Most Common Crime Types in Atlanta", 
            font: {
                family: "Arial",
                size:15
            }
        }
    }
    Plotly.newPlot('bar', bar_data, bar_layout);
}); 

// Fetch the JSON data and console log it
d3.json(crimedata).then((atldata) => {
    console.log(atldata)

    neighborhoods = []
    for (var i = 0; i < atldata.length;i++) {
        if(!neighborhoods.includes(atldata[i].neighborhood)) {
            neighborhoods.push(atldata[i].neighborhood)
        }
    }
    console.log(neighborhoods) 
    d3.select('#selDataset').selectAll('option').data(neighborhoods).enter().append('option').text((neighborhoods) => {
        return neighborhoods;
    });
}); 


// Create a function to create the plots when the user selects a neighborhood
function optionSelected(value) {
    d3.json(crimedata).then((atldata) => {
        aggAssault = [];
        autoTheft = [];
        burglary = [];
        homicide = [];
        larcenyFromVehicle = [];
        larcenyNonVehicle = [];
        robbery = [];
        atldata.forEach(individual => {
            if(individual.neighborhood == value && individual.crime_type =="AGG ASSAULT"){
                aggAssault.push(individual.crime_type);        
            } else if (individual.neighborhood == value && individual.crime_type == "AUTO THEFT"){
                autoTheft.push(individual.crime_type);
            } else if (individual.neighborhood == value && individual.crime_type == "BURGLARY"){
                burglary.push(individual.crime_type);
            } else if (individual.neighborhood == value && individual.crime_type == "HOMICIDE"){
                homicide.push(individual.crime_type);
            } else if (individual.neighborhood == value && individual.crime_type == "LARCENY-FROM VEHICLE"){
                larcenyFromVehicle.push(individual.crime_type);
            } else if (individual.neighborhood == value && individual.crime_type == "LARCENY-NON VEHICLE"){
                larcenyNonVehicle.push(individual.crime_type);
            } else if (individual.neighborhood == value && individual.crime_type == "ROBBERY"){
                robbery.push(individual.crime_type)
            }
        });

        var piedict = {
            "Agg. Assult": aggAssault.length, 
            "Auto Theft": autoTheft.length,
            "Burglary": burglary.length,
            "Homicide": homicide.length,
            "Larceny (V)": larcenyFromVehicle.length, 
            "Larceny (NV)": larcenyNonVehicle.length,
            "Robbery":robbery.length
        }
        console.log(piedict);

        Monday = [];
        Tuesday = [];
        Wednesday = [];
        Thursday = [];
        Friday = [];
        Saturday = [];
        Sunday = [];
        atldata.forEach(selection =>{
            if(selection.neighborhood == value && selection.occur_day == "Monday"){
                Monday.push(selection.occur_day);
            } else if (selection.neighborhood == value && selection.occur_day == "Tuesday"){
                Tuesday.push(selection.occur_day);
            } else if (selection.neighborhood == value && selection.occur_day == "Wednesday"){
                Wednesday.push(selection.occur_day);
            } else if (selection.neighborhood == value && selection.occur_day == "Thursday"){
                Thursday.push(selection.occur_day);
            } else if (selection.neighborhood == value && selection.occur_day == "Friday"){
                Friday.push(selection.occur_day);
            } else if (selection.neighborhood == value && selection.occur_day == "Saturday"){
                Saturday.push(selection.occur_day);
            } else if (selection.neighborhood == value && selection.occur_day == "Sunday"){
                Sunday.push(selection.occur_day);
            }
        });

        var bardict ={
            "Monday": Monday.length,
            "Tuesday": Tuesday.length, 
            "Wednesday": Wednesday.length, 
            "Thursday": Thursday.length, 
            "Friday": Friday.length, 
            "Saturday": Saturday.length,  
            "Sunday": Sunday.length
        }

        console.log(bardict);

        // Line Chart
        var line_trace ={
            x: Object.keys(bardict),
            y: Object.keys(bardict).map(function (key) { return bardict[key]; }),
            mode: 'lines+markers',
            line: {
                width: 3, 
                dash: "dot", 
                color: 'rgb(157, 98, 255)'
            }
        };

        var line_data = [line_trace]
        var line_layout = {
            title: {
                text: 'Weekly Crime Trend', 
                font: {
                    family: "Arial",
                    size:18
                }
            },
            height: 500, 
            width: 550,
        };

        Plotly.newPlot('line', line_data, line_layout);

        // Pie Chart
        var pie_trace ={
            labels: Object.keys(piedict),
            values: Object.keys(piedict).map(function (key) { return piedict[key]; }),
            type: 'pie', 
            textinfo: "label+percent", 
            textposition: "outside", 
            automargin: true
        }

        var pie_data = [pie_trace]

        var pie_layout = {
            title: {
                text: 'Crime Type Distribution', 
                font: {
                    family: "Arial",
                    size:18
                }
            },
            height: 500, 
            width: 550, 
            showlegend: false,
        };

        Plotly.newPlot('pie', pie_data, pie_layout)
        });
    }



    //     //  Setup Pie Chart Block
    //     const piedata =  {
    //     labels: Object.keys(piedict),
    //     datasets: [{
    //         data: Object.keys(piedict).map(function (key) { return piedict[key]; }),
    //         backgroundColor: [
    //             'rgba(255,0,0, 1)',
    //             'rgba(0,230,64, 1)',
    //             'rgba(249, 105, 14, 1)',
    //             'rgba(255,255,0, 1)',
    //             'rgba(15,10,222, 1)',
    //             'rgba(153, 102, 255, 1)',
    //             'rgba(0, 0, 0, 1)'
    //         ],
    //         borderColor: [
    //             'rgba(255,0,0, 1)',
    //             'rgba(0,230,64, 1)',
    //             'rgba(249, 105, 14, 1)',
    //             'rgba(255,255,0, 1)',
    //             'rgba(15,10,222, 1)',
    //             'rgba(153, 102, 255, 1)',
    //             'rgba(0, 0, 0, 1)'
    //         ],
    //         borderWidth: 1
    //     }]
    // }
    // // Config Block
    // const config = {
    //     type: 'pie',
    //     data: piedata, 
    //     options: {
    //         plugins: {
    //             title: {
    //                 display: true,
    //                 text: 'Crime Type Distribution for Selection'
    //             }
    //         }
    //     } 
    // };
    // // Render Block
    // const myChart = new Chart(
    //     document.getElementById('pieChart'),
    //     config
    // );
    // Chart.register(myChart)

        // function renderChart (){
        //     myChart.destroy();
        //     myChart = new Chart(
        //         document.getElementById('pieChart'),
        //         config
        //     )
        // }
        // renderChart(piedata);
        
        // Bar Chart
        // var bar_trace = {
            // x: Object.keys(bardict),
            // y: Object.keys(bardict).map(function (key) { return bardict[key]; }),
        //     type: "bar"
        // };
        
        // var bar_data = [bar_trace];

        // var bar_layout = {
        //     title: "Crime by Day of Week for Selection",
        //     height: 360, 
        //     width: 360
        // };

        // Plotly.newPlot("bar", bar_data, bar_layout);

        // Line Chart
        // var line_trace ={
        //     x: Object.keys(bardict),
        //     y: Object.keys(bardict).map(function (key) { return bardict[key]; }),
        //     mode: 'lines+markers'
        // }

        // var line_data = [line_trace]
        // var line_layout = {
        //     title: 'Weekly Crime Trend for Selection'
        // };

        // Plotly.newPlot('line', line_data, line_layout)


        // // Setup Bar Chart Block
        // const bardata =  {
        //     labels: Object.keys(bardict),
        //     datasets: [{
        //         data: Object.keys(bardict).map(function (key) { return bardict[key]; }),
        //         backgroundColor: [
        //             'rgba(255,26,104, 1)',
        //             'rgba(54,162,235, 1)',
        //             'rgba(255,206,86, 1)',
        //             'rgba(0,0,0, 1)',
        //             'rgba(153, 102, 255, 1)',
        //             'rgba(255, 159, 64, 1)',
        //             'rgbda(0,0,255, 1)'
        //         ],
        //         borderColor: [
        //             'rgba(0,0,0, 1)',
        //             'rgba(0,0,0, 1)',
        //             'rgba(0,0,0 1)',
        //             'rgba(0,0,0, 1)',
        //             'rgba(0,0,0, 1)',
        //             'rgba(0, 0, 0, 1)'
        //         ],
        //         borderWidth: 1
        //     }]
        // }
        // // Config Block
        // const config2 = {
        //     type: 'bar',
        //     data: bardata, 
        //     options: {
        //         plugins: {
        //             title: {
        //                 display: true,
        //                 text: 'Crime by Day of Week for Selection'
        //             }
        //         }
        //     }  
        // };
        // // Render Block
        // const myChart2 = new Chart(
        //     document.getElementById('barChart'),
        // config2
        // );
        // Chart.register(myChart2)

        // function renderChart (){
        //     myChart2.destroy();
        //     myChart2 = new Chart(
        //         document.getElementById('barChart'),
        //         config2
        //     )
        // }
        // renderChart(bardata);
//     });
// }

