const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data.data));
};

const displaySearchResult = (phones) => {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";

    // console.log(phones);
    phones.forEach((phone) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100  border-3 rounded-3 " id="card">
        <img src="${phone.image}" class="card-img-top w-100" alt="image of phone" />
        <div class="card-body">
            <p class="card-text fw-bold">
                <span class="text-muted">Brand: ${phone.brand}</span>
            </p>
            <h5 class="card-title">${phone.phone_name}</h5>
        </div>
        <div class="card-button text-center py-2 text-white">
            <button onclick = "displayDetails(${phone.slug})" class="btn btn-outline-warning px-5 py-2 rounded-pill fw-bolder">
      Details
    </button>
        </div>
    </div>
        `;
        searchResult.appendChild(div);
    });
};

// Detail Section
const displayDetails = (phoneId) => {
    const url = `
    https://openapi.programming-hero.com/api/phone/${phoneId}
    `;
    console.log(url);
    fetch(url)
        .then((res) => stringify(res.json()))
        .then((data) => console.log(data));
};

// const displayPhoneDetails = (phone) => {
//     let phoneDetails = document.getElementById("phone-details");
// };