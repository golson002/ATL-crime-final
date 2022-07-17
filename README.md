
# Atlanta, GA Crime Analysis
	
This project visualizes crime in Atlanta, GA in 2021. Crime rates and type have a direct correlation to property value and the amount of resources available to the community. According to the neighborhoodscout site (link below), the average for violent crimes in Atlanta is much higher than other cities in Georgia and outside of Georgia with similar population sizes. The Atlanta police department provides yearly reports for crime including  type, location, time of day and other measurements.

## Data Source
Our dataset is from crimes reported by the Atlanta Police Department in 2021. You can find the link to the dataset and their website below. (Extract step of ETL).

## Delivering Data

* A Jupyter notebook was used to run Python script in order to clean the dataset (transform step of ETL). Columns were renamed, the index was reset, and null values were dropped using the script found in the “crime_notebook.ipynb.” Seven different columns were deleted based on the data needed to visualize the crime rate.
    * Deleting Columns Example:
    del crime_data['ibr_code']

    * *Renaming Columns Example: 
    cleaned_crime.rename(columns={'UC2_Literal':'crime_type'})

* After cleaning the data the data frame was exported and sent to a PostgresSQL database in PGAdmin. (Load step of ETL)
    * Create engine to connect to database in PGadmin
    engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/atl_crime_db')

    * Create the database if it does not already exist
    if not database_exists(engine.url):
        create_database(engine.url)

    * Send the cleaned_crime_df to the atl_crime_db databse in PGadmin
    cleaned_crime_df.to_sql('atl_crime2021', con=engine, if_exists = 'append', index = False)

## Creating Connection to PostgresSQL database
* Our next task was to create a connection to the SQL database in PGAdmin via a Python Flask. The Flask talks to PGAdmin to pull the dataframe and returns a json of the data that we then use to populate our Javascript and Plot.ly/Leaflet charts and maps on our index.html. 

## Visualizing Data
A dashboard with four different charts/maps was created using HTML, CSS, and  JavaScript libraries (Plot.ly and Leaflet) to enable any user interested in Atlanta crime to visualize the past year's data.
The dashbard has three main features/objectives:
* Allow any user who immediately opens the dashboard to visualize the most common crime types in Atlanta for the year via a bar chart.  
* Allows any user to select their neighborhood and visualize tbe most common crime types in their neighborhood with a pie chart and the most common day of the week for crimes using a line plot. The line plot can be used as an example/proxy for what to expect from a crime frequency persepctive on each day of the week in their neighborhood.  
* Allows any user to visualize crime on a map of Atlanta- they have the autonomy to view crimes grouped by police zones or to view crime types denoted by different colors on the map. 

## Conclusions/Key Takeaways
* The most common type of crime in Atlanta is Larceny (to be expected!). This frequency appears consistent in the larger Atlanta dataset as well as for neighborhoods when the data is filtered to selected a desired neighborhood. 
* Zone 5 covers the least amount of area on map, but has the same amount of crime as larger zones. This i s also to be expected as Zone 5 covers the metro-Atlanta area. 
* Atlanta should develop a similar dashboard for its citizens to utilize like many other large cities. There are many apps out there now that provide real-time crime updates in your neighborhood, but a dashboard similar to the one we created would be interesting/beneficial on the Atlanta PD website so curious parties do not have to view information via the reported csv. 

## Analysis Limitations
* Due to the amount of distinct neighborhoods in our dataset, it was difficult to analyze which neighborhood in Atlanta is the safest despite this being the question that sparked our curiosity for this analysis. 
    * Adding population for neighborhoods would improve the ability to rate safety based on crime/1,000 people.
* We had to do a lot of cleaning of the dataset to account for missing values and of course many crimes go unreported, so our dataset may not be comprehensive.

## Considerations for Further Analysis: 
* Include multiple years to help view the trend over time.
* Use/find  datasets with more detailed information about crime in different neighborhoods.
    * Our dataset was grouped by police zone which was very broad.
    * More info about the type of offenders (age, gender, race, etc.)
* Dashboard Improvements
    * Add a search bar to the drop down menu (our dataset had 228 neighborhoods- that's a lot for a drop down!  ).
    * Alphabetize drop down menu.
    * Real time updates from the database.
    * Utilize Chart.js to include more interactivity for user.
    * Include search by crime type filter for neighborhoods or full map
    * Have the map also filter based on the selection from the drop down. 

## References 
* https://www.neighborhoodscout.com/ga/atlanta/crime#description
* https://www.atlantapd.org/i-want-to/crime-data-downloads