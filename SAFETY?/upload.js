document.addEventListener("DOMContentLoaded", function() {
    const mainContainer = document.getElementById("button-container");
    let mainButtons = [];
    let subButtons = [];

    // Fetch the nodes data from server
    fetch('/get_nodes')
    .then(response => response.json())
    .then(nodes => {
        // Create main buttons
        nodes.forEach(node => {
            const button = document.createElement("button");
            button.textContent = node.Nome;
            button.classList.add("rectangular-button");

            // Check for special conditions to set background color
            Object.values(node).forEach(value => {
                if (value === 'Ativo') {
                    button.style.backgroundColor = 'blue';
                    button.style.color = 'white';
                } else if (value === 'Inativo') {
                    button.style.backgroundColor = 'red';
                } else if (value === 'Completo') {
                    button.style.backgroundColor = 'green';
                }
            });

            // If no special status, set a default background color
            if (!['blue', 'red', 'green'].includes(button.style.backgroundColor)) {
                button.style.backgroundColor = 'grey'; // Default color
            }

            button.dataset.node = JSON.stringify(node); // Store entire node data

            button.addEventListener("click", function() {
                hideMainButtons();
                showSubButtons(JSON.parse(this.dataset.node));
            });

            mainButtons.push(button);
            mainContainer.appendChild(button);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    function hideMainButtons() {
        mainButtons.forEach(btn => btn.style.display = 'none');
    }

    function showSubButtons(node) {
        // Clear previous sub-buttons
        hideSubButtons();

        // Convert node object to array of key-value pairs to preserve order
        const orderedEntries = Object.entries(node);

        orderedEntries.forEach(([prop, value]) => {
            if (prop !== 'Nome') {
                const subButton = document.createElement("button");
                subButton.textContent = `${prop}: ${value}`;
                subButton.classList.add("rectangular-button", "sub-button");

                // Set color based on property name and value
                if (prop === 'atualmente') {
                    subButton.style.backgroundColor = 'purple';
                    subButton.style.color = 'white';
                } else if (value === 'Ativo') {
                    subButton.style.color = 'blue';
                } else if (value === 'Inativo') {
                    subButton.style.color = 'red';
                } else if (value === 'Completo') {
                    subButton.style.color = 'green';
                }

                subButton.addEventListener("click", function() {
                    showMainButtons();
                    hideSubButtons();
                });

                subButtons.push(subButton);
                mainContainer.appendChild(subButton);
            }
        });
    }

    function showMainButtons() {
        mainButtons.forEach(btn => btn.style.display = 'inline-block');
    }

    function hideSubButtons() {
        subButtons.forEach(btn => btn.remove());
        subButtons = []; // Reset array for new sub-buttons
    }
});