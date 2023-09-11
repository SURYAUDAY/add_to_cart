document.addEventListener("DOMContentLoaded", function () {
    const leftContainer = document.getElementById("left-container");
    const rightContainer = document.getElementById("right-container");

    
    function addRowToCart(rowData) {
        const row = rowData.cloneNode(true);
        const addButton = row.querySelector(".heart-button");
        const actionCell = row.querySelector("td:last-child");

        
        addButton.parentNode.innerHTML = "";
        
        row.removeChild(actionCell);

        
        rightContainer.querySelector("tbody").appendChild(row);

        
        row.classList.add("added");
    }

    
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const tbody = leftContainer.querySelector("tbody");

            
            data.forEach(values => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${values.title}</td>
                <td>${values.description}</td>
                <td>${values.price}</td>
                <td><img src="${values.image}"/></td>
                <td><button class="heart-button">❤️</button></td>
                `;

                
                const heartButton = row.querySelector(".heart-button");
                heartButton.addEventListener("click", () => {
                    addRowToCart(row); 
                });

                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});