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
        <div class="card border shadow-lg h-100" id="card">
            <img src="${phone.image}" class="card-img-top w-100 border-radius" alt="image of phone" />
            <div class="card-body">
            <p class="card-text fw-bold">
                <span class="text-muted">Brand: ${phone.brand}</span>
            </p>
            <h5 class="card-title">${phone.phone_name}</h5>
            </div>
            <div class="card-button text-center text-white ">
            <button onclick="displayPhoneDetails('${phone.slug}')" class="btn btn-outline-warning px-5 py-2 rounded-pill fw-bolder">
            Details
            </button>
        </div>
            
    </div>
        `;
        searchResult.appendChild(div);
    });
};

// Detail Section

const displayPhoneDetails = (phoneId) => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => loadDetails(data.data));
};

const loadDetails = (data) => {
    console.log(data);
    let phoneDetails = document.getElementById("phone-details");
    const mainFeatures = Object.keys(data.mainFeatures);
    const mainFeaturesValue = Object.values(data.mainFeatures);
    const div = document.createElement("div");
    div.setAttribute("class", "row d-flex");
    phoneDetails.textContent = "";
    div.innerHTML = `
    <h3 class="text-center fw-bold gy-3 text-white">PHONE DETAILS</h3>
    <div class="col-sm-12 col-md-4 "><img class="w-100 details-image" src="${data.image}" alt="" /></div>
    <div class="col-sm-12 col-md-6">
    <table class="table table-bordered">
    <thead>
        <tr>
            <th>FEATURES</th>
            <th>MAIN FEATURES</th>
            
            
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${mainFeatures[0]}</td>
            <td>${mainFeaturesValue[0]}</td>
            
           
        </tr>
        <tr>
            <td>${mainFeatures[0]}</td>
            <td>Peter</td>
            
        </tr>
        <tr>
            <td>3</td>
            <td>John</td>
            
        </tr>
    </tbody>
</table>
    </div>
    
            `;
    phoneDetails.appendChild(div);
};