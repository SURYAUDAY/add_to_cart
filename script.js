document.addEventListener("DOMContentLoaded", function () {
    const leftContainer = document.getElementById("left-container");
    const rightContainer = document.getElementById("right-container");

    // Function to add a row to the right container
    function addRowToCart(rowData) {
        const row = rowData.cloneNode(true);
        const addButton = row.querySelector(".heart-button");
        const actionCell = row.querySelector("td:last-child");

        // Remove the heart button from the cloned row
        addButton.parentNode.innerHTML = "";
        
        row.removeChild(actionCell);

        // Add the row to the right container
        rightContainer.querySelector("tbody").appendChild(row);

        // Mark the row as added to the cart
        row.classList.add("added");
    }

    // Fetch data from your API (replace 'your_api_endpoint_here' with your actual API endpoint)
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const tbody = leftContainer.querySelector("tbody");

            // Populate the left container table with data from the API
            data.forEach(values => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${values.title}</td>
                <td>${values.description}</td>
                <td>${values.price}</td>
                <td><img src="${values.image}"/></td>
                <td><button class="heart-button">❤️</button></td>
                `;

                // Add click event listener to the heart button
                const heartButton = row.querySelector(".heart-button");
                heartButton.addEventListener("click", () => {
                    addRowToCart(row); // Add row to the cart when clicked
                });

                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});