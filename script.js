document.addEventListener("DOMContentLoaded", function () {
    const leftContainer = document.getElementById("left-container");
    const rightContainer = document.getElementById("right-container");
    const addedItems = new Set();

    function rowInCart(rowData) {
        const itemId = rowData.dataset.id;

        if (addedItems.has(itemId)) {
            const rowInCart = rightContainer.querySelector(`[data-id="${itemId}"]`);
            rowInCart.remove();
            addedItems.delete(itemId);
            const leftButton = rowData.querySelector(".heart-button");
            leftButton.style.color = "red";
        } else {
           
            const row = rowData.cloneNode(true);
            const addButton = row.querySelector(".heart-button");

           
            addButton.parentNode.innerHTML = "";

            
            rightContainer.querySelector("tbody").appendChild(row);

            
            row.classList.add("added");

            
            addedItems.add(itemId);

           
            const leftButton = rowData.querySelector(".heart-button");
            leftButton.style.color = "grey";
        }
    }

    
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const tbody = leftContainer.querySelector("tbody");

            
            data.forEach(values => {
                const row = document.createElement("tr");
                row.dataset.id = values.id;
                row.innerHTML = `
                <td>${values.title}</td>
                <td>${values.description}</td>
                <td>${values.price}</td>
                <td><img src="${values.image}"/></td>
               <td><i class="fa-solid fa-heart heart-button" style="color: #f70202;"></i></td>
                `;

                
                const heartButton = row.querySelector(".heart-button");
                heartButton.addEventListener("click", () => {
                    
                    rowInCart(row); 
                });

                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});