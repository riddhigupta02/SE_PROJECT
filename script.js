// Food Items

let foods = [

    {
        name: "Margherita Pizza",
        category: "Pizza",
        price: 249,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
        description: "Fresh cheese and tomato pizza"
    },

    {
        name: "Cheese Burger",
        category: "Burger",
        price: 179,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        description: "Delicious cheese burger"
    },

    {
        name: "Chocolate Shake",
        category: "Drinks",
        price: 129,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500",
        description: "Creamy chocolate milkshake"
    },

    {
        name: "French Fries",
        category: "Burger",
        price: 99,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
        description: "Crispy golden french fries"
    },

    {
        name: "Chocolate Cake",
        category: "Dessert",
        price: 149,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
        description: "Soft and tasty chocolate cake"
    },

    {
        name: "Cold Coffee",
        category: "Drinks",
        price: 119,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
        description: "Refreshing cold coffee"
    },

    {
        name: "Veg Pizza",
        category: "Pizza",
        price: 299,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
        description: "Loaded vegetable pizza"
    },

    {
        name: "Ice Cream",
        category: "Dessert",
        price: 89,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
        description: "Delicious creamy ice cream"
    },

    {
        name: "Chicken Burger",
        category: "Burger",
        price: 219,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=500",
        description: "Tasty burger with fresh toppings"
    }

];


// Shopping Cart

let cart = [];


// Display Food Items

function displayFood(items) {

    let container = document.getElementById("food-container");

    container.innerHTML = "";

    for (let i = 0; i < items.length; i++) {

        container.innerHTML += `

            <div class="food-card">

                <img src="${items[i].image}" alt="${items[i].name}">

                <h3>${items[i].name}</h3>

                <p>${items[i].description}</p>

                <p class="price">₹${items[i].price}</p>

                <button onclick="addToCart(${foods.indexOf(items[i])})">
                    Add To Cart
                </button>

            </div>

        `;

    }

}


// Filter Food Items

function filterFood(category) {

    if (category == "All") {

        displayFood(foods);

    }

    else {

        let filtered = foods.filter(function(food) {

            return food.category == category;

        });

        displayFood(filtered);

    }

}


// Search Food

document.getElementById("search").addEventListener("input", function() {

    let value = this.value.toLowerCase();

    let result = foods.filter(function(food) {

        return food.name.toLowerCase().includes(value);

    });

    displayFood(result);

});


// Add Food To Cart

function addToCart(index) {

    let item = foods[index];

    let found = cart.find(function(food) {

        return food.name == item.name;

    });

    if (found) {

        found.quantity++;

    }

    else {

        cart.push({

            name: item.name,
            price: item.price,
            quantity: 1

        });

    }

    displayCart();

}


// Display Cart Items

function displayCart() {

    let cartBox = document.getElementById("cart-items");

    let total = 0;

    cartBox.innerHTML = "";

    if (cart.length == 0) {

        cartBox.innerHTML = "<p class='empty'>Your cart is empty!</p>";

    }

    for (let i = 0; i < cart.length; i++) {

        let itemTotal = cart[i].price * cart[i].quantity;

        total = total + itemTotal;

        cartBox.innerHTML += `

            <div class="cart-item">

                <h3>${cart[i].name}</h3>

                <p>₹${cart[i].price}</p>

                <div>

                    <button onclick="changeQuantity(${i}, -1)">-</button>

                    ${cart[i].quantity}

                    <button onclick="changeQuantity(${i}, 1)">+</button>

                </div>

                <p>₹${itemTotal}</p>

            </div>

        `;

    }

    document.getElementById("total").innerText = total;

}


// Change Quantity

function changeQuantity(index, change) {

    cart[index].quantity = cart[index].quantity + change;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    displayCart();

}


// Checkout

function checkout() {

    if (cart.length == 0) {

        alert("Please add food items to your cart first!");

    }

    else {

        document.getElementById("checkout").scrollIntoView({

            behavior: "smooth"

        });

    }

}


// Place Order

document.getElementById("order-form").addEventListener("submit", function(event) {

    event.preventDefault();

    if (cart.length == 0) {

        alert("Your cart is empty!");

        return;

    }

    let name = document.getElementById("name").value;

    let total = document.getElementById("total").innerText;

    document.getElementById("message").innerText =

        "Thank you " + name + "! Your order of ₹" + total + " has been placed successfully!";

    alert("Order Placed Successfully!");

    cart = [];

    displayCart();

    document.getElementById("order-form").reset();

});


// Display All Food Items Initially

displayFood(foods);

displayCart();