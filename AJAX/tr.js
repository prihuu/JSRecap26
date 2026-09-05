const API_URL = "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

let restaurants = [];

async function fetchRestaurants() {

    const restaurantList = document.getElementById("restaurant-list");
    const errorMessage = document.getElementById("error-message");

    try {

        restaurantList.innerHTML = "<p>Loading restaurants...</p>";
        errorMessage.textContent = "";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not retrieve restaurants.");
        }

        const data = await response.json();

        restaurants = data.restaurants;

        displayRestaurants(restaurants);

        createCityFilter(restaurants);
        createProviderFilter(restaurants);

        findNearestRestaurant(restaurants);

    } catch (error) {

        console.error(error);

        restaurantList.innerHTML = "";

        errorMessage.textContent =
            "Sorry, restaurants could not be loaded. " +
            "Please check your Metropolia network or VPN connection.";

    }
}

function displayRestaurants(data) {

    const restaurantList =
        document.getElementById("restaurant-list");

    restaurantList.innerHTML = "";

    if (data.length === 0) {

        restaurantList.innerHTML =
            "<p>No restaurants found.</p>";

        return;
    }

    data.sort((a, b) =>
        a.name.localeCompare(b.name)
    );


    data.forEach(function (restaurant) {

        const article =
            document.createElement("article");

        article.classList.add("restaurant-card");


        article.innerHTML = `

            <div class="restaurant-top">

                <h3>${restaurant.name}</h3>

                <span class="favourite">
                    ☆
                </span>

            </div>

            <p>📍 ${restaurant.city}</p>

            <p>${restaurant.address}</p>

            <p>
                ${restaurant.postalCode}
            </p>

            <p class="provider">
                Provider: ${restaurant.company}
            </p>

            <hr>

            <p>
                <strong>
                    Click to see today's menu
                </strong>
            </p>

            <button class="view-restaurant">
                View restaurant
            </button>
        `;


        // Click restaurant
        article.addEventListener("click", function () {

            openRestaurantModal(restaurant);

        });


        restaurantList.appendChild(article);

    });
}

function createCityFilter(data) {

    const cityFilter =
        document.getElementById("city-filter");

    const cities = [];

    data.forEach(function (restaurant) {

        if (!cities.includes(restaurant.city)) {
            cities.push(restaurant.city);
        }

    });


    cities.sort();

    cityFilter.innerHTML =
        '<option value="">All cities</option>';


    cities.forEach(function (city) {

        const option =
            document.createElement("option");

        option.value = city;
        option.textContent = city;

        cityFilter.appendChild(option);

    });
}

function createProviderFilter(data) {

    const providerFilter =
        document.getElementById("provider-filter");

    const providers = [];

    data.forEach(function (restaurant) {

        if (
            restaurant.company &&
            !providers.includes(restaurant.company)
        ) {

            providers.push(restaurant.company);

        }

    });


    providers.sort();


    providerFilter.innerHTML =
        '<option value="">All providers</option>';


    providers.forEach(function (provider) {

        const option =
            document.createElement("option");

        option.value = provider;
        option.textContent = provider;

        providerFilter.appendChild(option);

    });
}

document
    .getElementById("search-button")
    .addEventListener("click", filterRestaurants);


document
    .getElementById("search-input")
    .addEventListener("input", filterRestaurants);


document
    .getElementById("city-filter")
    .addEventListener("change", filterRestaurants);


document
    .getElementById("provider-filter")
    .addEventListener("change", filterRestaurants);


function filterRestaurants() {

    const search =
        document
            .getElementById("search-input")
            .value
            .toLowerCase();

    const city =
        document.getElementById("city-filter").value;

    const provider =
        document.getElementById("provider-filter").value;


    const filtered =
        restaurants.filter(function (restaurant) {

            const matchesSearch =
                restaurant.name
                    .toLowerCase()
                    .includes(search);

            const matchesCity =
                city === "" ||
                restaurant.city === city;

            const matchesProvider =
                provider === "" ||
                restaurant.company === provider;


            return (
                matchesSearch &&
                matchesCity &&
                matchesProvider
            );

        });


    displayRestaurants(filtered);
}

async function openRestaurantModal(restaurant) {

    const modal =
        document.getElementById("restaurant-modal");

    const modalContent =
        document.getElementById("modal-content");

    modal.style.display = "flex";


    modalContent.innerHTML = `

        <h2>${restaurant.name}</h2>

        <p>
            Loading today's menu...
        </p>

    `;


    try {
        const menuURL =
            `${API_URL}/daily/${restaurant._id}/en`;


        const response =
            await fetch(menuURL);


        if (!response.ok) {

            throw new Error(
                "Could not retrieve today's menu."
            );

        }


        const menu =
            await response.json();


        displayRestaurantModal(
            restaurant,
            menu
        );


    } catch (error) {

        console.error(error);


        modalContent.innerHTML = `

            <h2>${restaurant.name}</h2>

            <div class="restaurant-details">

                <p>
                    <strong>Address:</strong>
                    ${restaurant.address}
                </p>

                <p>
                    <strong>Postal code:</strong>
                    ${restaurant.postalCode}
                </p>

                <p>
                    <strong>City:</strong>
                    ${restaurant.city}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${restaurant.phone}
                </p>

                <p>
                    <strong>Provider:</strong>
                    ${restaurant.company}
                </p>

            </div>

            <div class="error-message">

                Today's menu could not be loaded.

            </div>

        `;

    }
}

function displayRestaurantModal(
    restaurant,
    menu
) {

    const modalContent =
        document.getElementById("modal-content");


    let coursesHTML = "";


    if (
        menu.courses &&
        menu.courses.length > 0
    ) {

        menu.courses.forEach(function (course) {

            coursesHTML += `

                <div class="menu-course">

                    <div class="course-header">

                        <strong>
                            ${course.name}
                        </strong>

                        <span>
                            ${course.price}
                        </span>

                    </div>

                    <p>
                        Diets:
                        ${course.diets || "Not specified"}
                    </p>

                </div>

            `;

        });

    } else {
        coursesHTML = `
            <p>
                No menu available for today.
            </p>
        `;

    }


    modalContent.innerHTML = `

        <h2>${restaurant.name}</h2>


        <div class="restaurant-details">

            <p>
                <strong>Address:</strong>
                ${restaurant.address}
            </p>

            <p>
                <strong>Postal code:</strong>
                ${restaurant.postalCode}
            </p>

            <p>
                <strong>City:</strong>
                ${restaurant.city}
            </p>

            <p>
                <strong>Phone:</strong>
                ${restaurant.phone}
            </p>

            <p>
                <strong>Provider:</strong>
                ${restaurant.company}
            </p>

        </div>


        <hr>


        <h3>
            Today's Menu
        </h3>


        <div class="today-menu">

            ${coursesHTML}

        </div>

    `;
}

document
    .getElementById("close-modal")
    .addEventListener("click", function () {

        document.getElementById(
            "restaurant-modal"
        ).style.display = "none";

    });


document
    .getElementById("restaurant-modal")
    .addEventListener("click", function (event) {

        if (
            event.target ===
            document.getElementById("restaurant-modal")
        ) {

            document.getElementById(
                "restaurant-modal"
            ).style.display = "none";

        }

    });
function findNearestRestaurant(data) {

    const nearestElement =
        document.getElementById(
            "nearest-restaurant"
        );


    if (data.length === 0) {

        nearestElement.textContent =
            "No restaurants found";

        return;

    }
    const nearest = data[0];


    nearestElement.textContent =
        nearest.name;

}

fetchRestaurants();
