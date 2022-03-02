//
//
// Spinner Section
//
//
//
const toggleSpinner = (displayStyle) => {
    document.getElementById("spinner").style.display = displayStyle;
};

const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    const error = document.getElementById("display-error");
    const displayResult = document.getElementById("search-result");
    const singlePhoneDetails = document.getElementById("phone-details");

    if (searchText === "") {
        alert("please write the valid phone name");
        error.innerText = "No result found";
        displayResult.innerHTML = "";
        singlePhoneDetails.innerHTML = "";
    } else if (searchText % 1 === 0) {
        alert("please write the valid phone name");
        error.innerText = "No result found";

        displayResult.innerHTML = "";
        singlePhoneDetails.innerHTML = "";
    } else {
        toggleSpinner("block");

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearchResult(data.data));
        searchField.value = "";
        error.innerText = "";
    }
};
//
//
//
//
//
// Phone Search result Section
//
//
//
//
const displaySearchResult = (phones) => {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";

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
            <h5 class="card-title fw-bold">${phone.phone_name}</h5>
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
    toggleSpinner("none");
};
//
//
//
//
// Display Detail Detail Section
//
//
//
//
//
const displayPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => loadDetails(data.data));
};
//
//
//
// Load Detail Data Section
//
//
//
const loadDetails = (data) => {
    console.log(data);
    let phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = "";
    const mainPhoneFeatures = Object.keys(data.mainFeatures);
    const mainFeaturesValue = Object.values(data.mainFeatures);
    const otherDetails = Object.keys(data);
    const otherDetailsValue = Object.values(data.others);
    const div = document.createElement("div");
    div.setAttribute("class", "row d-flex");
    div.innerHTML = `
        <h4 class="text-center fw-bold gy-4 text-dark">PHONE DETAILS</h4>
        <div class=" col-sm-12 col-md-4 py-4"><img class="w-100 details-image" src="${
          data.image
        }" alt="" /></div>
        <div class= " col-sm-12 col-md-7 py-4">
        
    
    
        <table class="table table-bordered bg-light pt-2">
        <thead>
            <tr>
                <th>Name</th>
                <th>Realease Date</th>
                
                
            </tr>
        </thead>
            <tbody><tr>
            <td>${data.name}</td>
            <td>${
              data.releaseDate ? data.releaseDate : "No release date found"
            }</td>
            
        </tr>
    </tbody>
        <thead>
            <tr>
                <th>SECTION</th>
                <th>MAIN FEATURES</th>
                
                
            </tr>
        </thead>
        <tbody>
            
            <tr>
                <td>${mainPhoneFeatures[0]}</td>
                <td>${mainFeaturesValue[0]}</td>
                
               
            </tr>
            <tr>
                <td>${mainPhoneFeatures[1]}</td>
                <td>${mainFeaturesValue[1]}</td>
                
            </tr>
            <tr>
                <td>${mainPhoneFeatures[2]}</td>
                <td>${mainFeaturesValue[2]}</td>
                
            </tr>
            <tr>
                <td>${mainPhoneFeatures[3]}</td>
                <td>${mainFeaturesValue[3]}</td>
                
            </tr>
            <tr>
                <td>${mainPhoneFeatures[4]}</td>
                <td>${mainFeaturesValue[4]}</td>
                
            </tr>
            <tr>
                <td>${otherDetails[6]}</td>
                <td>${otherDetailsValue}</td>
                
            </tr>
            
        </tbody>
    </table>
        </div>
        
                `;
    phoneDetails.appendChild(div);
};