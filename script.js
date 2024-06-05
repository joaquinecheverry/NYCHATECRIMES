fetch("data.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(originalDatapoints) {
    const originalData = originalDatapoints;
    let currentWorkingData = originalData;
    displayData(originalData);

    const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', function() {
    resetFilters();
});

function updateHateCrimesCount(count) {
    const countElement = document.getElementById('hateCrimesCount'); 
    if (countElement) {
        countElement.textContent = count;
    }
}

function resetFilters() {
    clearData();
    currentWorkingData = originalData;
    displayData(currentWorkingData);
}

    function displayData(datapoints) {
    console.log(datapoints)
      let category = document.getElementById('category');
      let bias = document.getElementById('bias');
      let description = document.getElementById('description');
      let area = document.getElementById('area');
      let month = document.getElementById('month');
      let displayedCategories = new Set();
      let displayedBias = new Set();
      let displayedDescription = new Set();
      let displayedCounty = new Set();
      let displayedMonth = new Set ();
      let monthElements = [];

      updateHateCrimesCount(datapoints.length); // Update hate crimes count
      filteringEventListeners();

      datapoints.sort((a, b) => {
        const monthA = parseInt(a.Month, 10);
        const monthB = parseInt(b.Month, 10);
        return monthA - monthB; 
      });


      for (let datapoint of datapoints) {
        if (!displayedCategories.has(datapoint.Cattegory)) {
          const itemElement = document.createElement("p");
          itemElement.classList.add('categories');
          itemElement.id = datapoint.Cattegory.replace(/\s+/g, '-').toLowerCase();
          itemElement.innerHTML = `
            ${datapoint.Cattegory}
          `;
          category.appendChild(itemElement);
          displayedCategories.add(datapoint.Cattegory);
        }
        if (!displayedBias.has(datapoint.Bias)) {
            const itemElement = document.createElement("p");
            itemElement.classList.add('biases');
            itemElement.id = datapoint.Bias.replace(/\s+/g, '-').toLowerCase();
            itemElement.innerHTML = `
              ${datapoint.Bias}
            `;
            bias.appendChild(itemElement);
            displayedBias.add(datapoint.Bias);
          }
        if (!displayedDescription.has(datapoint.Description)) {
            const itemElement = document.createElement("p");
            itemElement.classList.add('descriptions');
            itemElement.id = datapoint.Description.replace(/\s+/g, '-').toLowerCase();
            itemElement.innerHTML = `
              ${datapoint.Description}
            `;
            description.appendChild(itemElement);
            displayedDescription.add(datapoint.Description);
        } 
        if (!displayedCounty.has(datapoint.County)) {
            const itemElement = document.createElement("p");
            itemElement.classList.add('areas');
            itemElement.id = datapoint.County.replace(/\s+/g, '-').toLowerCase();
            itemElement.innerHTML = `
              ${datapoint.County}
            `;
            area.appendChild(itemElement);
            displayedCounty.add(datapoint.County);
        }
        if (!displayedMonth.has(datapoint.Month)) {
            function getMonthName(monthNumber) {
                const monthNames = [
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ];
                return monthNames[parseInt(monthNumber, 10) - 1];
              }
            const monthName = getMonthName(datapoint.Month);
            const itemElement = document.createElement("p");
            itemElement.classList.add('months');
            itemElement.id = monthName.replace(/\s+/g, '-').toLowerCase();
            itemElement.innerHTML = `
              ${monthName}
            `;
            month.appendChild(itemElement);
            displayedMonth.add(datapoint.Month);         
          }
    }

    filteringEventListeners();
    }

    function clearData () {
        let categories = document.querySelectorAll('.categories');
        let biases = document.querySelectorAll('.biases'); 
        let descriptions = document.querySelectorAll('.descriptions');
        let areas = document.querySelectorAll ('.areas');
        let months = document.querySelectorAll ('.months');

        categories.forEach((category) => {
            category.parentNode.removeChild(category);
        });
        biases.forEach((bias) => {
            bias.parentNode.removeChild(bias);
        });
        descriptions.forEach((description) => {
            description.parentNode.removeChild(description);
        });
        areas.forEach((area) => {
            area.parentNode.removeChild(area);
        });
        months.forEach((month) => {
            month.parentNode.removeChild(month);
        });
    }

    function filteringEventListeners () {
        console.log('eventListeners added')
        const sortByCategory = [ 
            ["religion/religious-practice", "Religion/Religious Practice"],
            ["race/color", "Race/Color"],
            ["gender", "Gender"],
            ["sexual-orientation", "Sexual Orientation"],
            ["ethnicity/national-origin/ancestry", "Ethnicity/National Origin/Ancestry"],
            ["age", "Age"],
        ];
    
        const sortByBias = [ 
            ["jewish", "Jewish"],
            ["asian", "Asian"],
            ["transgender", "Transgender"],
            ["female-homosexual", "Female Homosexual"],
            ["white", "White"],
            ["muslim", "Muslim"],
            ["black", "Black"],
            ["male-homosexual", "Male Homosexual"],
            ["gender-non-conforming", "Gender "],
            ["catholic", "Catholic"],
            ["religious-practice-in-general", "Religious Practice In General"],
            ["other-ethnicity", "Other Ethnicity"],
            ["female", "Female"],
            ["lgbtq-plus", "LGBTQ Plus"],
            ["arab", "Arab"],
            ["hispanic", "Hispanic"],
            ["multi-racial-groups", "Multi Racial Groups"],
            ["hindu", "Hindu"],
            ["elder", "Elder"],
        ];

        const sortByDescription = [ 
            ["miscellaneous-penal-law", "Miscellaneous Penal Law"],
            ["public-order-offense", "Public Order Offense"],
            ["petit-larceny", "Petit Larceny"],
            ["3rd-degree-assault", "3rd Degree Assault"],
            ["felony-assault", "Felony Assault"],
            ["robbery", "Robbery"],
            ["damaging-property", "Damaging Property"],
            ["burglary", "Burglary"],
            ["sex-crimes", "Sex Crimes"],
            ["2nd-degree-harrassment", "2nd Degree Harassment"],
            ["murder", "Murder"],
            ["grand-larceny", "Grand Larceny"],
        ];

        const sortByCounty = [ 
            ["brooklyn", "Brooklyn"],
            ["new-york", "New York"],
            ["queens", "Queens"],
            ["bronx", "Bronx"],
            ["staten-island", "Staten Island"],
        ];


        const sortByMonth = [ 
            ["january", "1"],
            ["february", "2"],
            ["march", "3"],
            ["april", "4"],
            ["may", "5"],
            ["june", "6"],
            ["july", "7"],
            ["august", "8"],
            ["september", "9"],
            ["october", "10"],
            ["november", "11"],
            ["december", "12"],
        ];

        sortByCategory.forEach((item) => {
            const currentId = item[0];
            const currentElement = document.getElementById(currentId);
            const filterCheck = item[1];
            if (currentElement) {
                currentElement.addEventListener('click', function () {
                    clearData();
                    const filterData = currentWorkingData.filter((datapoint) => datapoint.Cattegory == filterCheck );
                    currentWorkingData = filterData;
                    displayData(filterData);
                })
            }
        })


        sortByBias.forEach((item) => {
            const currentId = item[0];
            const currentElement = document.getElementById(currentId);
            const filterCheck = item[1];
            if (currentElement) {
                currentElement.addEventListener('click', function () {
                    clearData();
                    const filterData = currentWorkingData.filter((datapoint) => datapoint.Bias == filterCheck );
                    currentWorkingData = filterData;
                    displayData(filterData);
                })
            }
        })

        sortByDescription.forEach((item) => {
            const currentId = item[0];
            const currentElement = document.getElementById(currentId);
            const filterCheck = item[1];
            if (currentElement) {
                currentElement.addEventListener('click', function () {
                    clearData();
                    const filterData = currentWorkingData.filter((datapoint) => datapoint.Description == filterCheck );
                    currentWorkingData = filterData;
                    displayData(filterData);
                })
            }
        })

        sortByCounty.forEach((item) => {
            const currentId = item[0];
            const currentElement = document.getElementById(currentId);
            const filterCheck = item[1];
            if (currentElement) {
                currentElement.addEventListener('click', function () {
                    clearData();
                    const filterData = currentWorkingData.filter((datapoint) => datapoint.County == filterCheck );
                    currentWorkingData = filterData;
                    displayData(filterData);
                })
            }
        })

        sortByMonth.forEach((item) => {
            const currentId = item[0];
            const currentElement = document.getElementById(currentId);
            const filterCheck = item[1];
            if (currentElement) {
                currentElement.addEventListener('click', function () {
                    clearData();
                    const filterData = currentWorkingData.filter((datapoint) => datapoint.Month == filterCheck );
                    currentWorkingData = filterData;
                    displayData(filterData);
                })
            }
        })
    }
  });

  


  