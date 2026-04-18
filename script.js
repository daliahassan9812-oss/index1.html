let shops = [
    {name: "Zara", type: "ملابس", price: 3000, img: "images/ZARA.jpg"},
    {name: "Nike", type: "رياضة", price: 2500, img: "images/NIKE.jpg"},
    {name: "LC Waikiki", type: "ملابس", price: 1200, img: "images/LC WAIKIKI.jpg"},
    {name: "Adidas", type: "رياضة", price: 4500,img: "images/ADIDAS.jpg"}
];

let selected = [];

/* عرض المحلات */
function displayShops(list) {
    let container = document.getElementById("shopList");
    container.innerHTML = "";

    list.forEach(shop => {
        container.innerHTML += `
            <div class="card">
                <img src="${shop.img}">
                <div class="card-content">
                    <h3>${shop.name}</h3>
                    <p>${shop.type}</p>
                    <p>${shop.price} جنيه</p>
                    <button onclick="compareShop('${shop.name}')">مقارنة</button>
                    <button onclick="selectForBooking('${shop.name}')">حجز</button>
                </div>
            </div>
        `;
    });
}

displayShops(shops);

/* البحث */
document.getElementById("search").addEventListener("input", filterShops);
document.getElementById("filter").addEventListener("change", filterShops);

function filterShops() {
    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;

    let result = shops.filter(shop => {
        return (shop.name.toLowerCase().includes(search)) &&
               (filter === "all" || shop.type === filter);
    });

    displayShops(result);
}

/* المقارنة */
function compareShop(name) {
    let shop = shops.find(s => s.name === name);

    if (!selected.includes(shop)) {
        selected.push(shop);
    }

    let compareDiv = document.getElementById("compare");

    compareDiv.innerHTML = selected.map(s => `
        <div>
            <strong>${s.name}</strong> - ${s.price} جنيه
        </div>
    `).join("");
}

/* الحجز */
function selectForBooking(name) {
    document.getElementById("shopName").value = name;
}

document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let user = document.getElementById("userName").value;
    let shop = document.getElementById("shopName").value;

    let booking = {user, shop};

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    showBookings();
    alert("✅ تم الحجز");
});

/* عرض الحجوزات */
function showBookings() {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let div = document.getElementById("bookings");

    div.innerHTML = bookings.map(b => `
        <p>👤 ${b.user} حجز ${b.shop}</p>
    `).join("");
}

showBookings();