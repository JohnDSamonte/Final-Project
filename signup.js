function myForm() {    
    const fName = document.getElementById("fname");
    const lName = document.getElementById("lname");
    const sex = document.querySelector('input[name="sex"]:checked')?.value || "";
    const pass = document.getElementById("pass");
    const number = document.getElementById("num");
    const reason = document.getElementById("reason");
    event.preventDefault();

    let userData = {
        firstName: fName.value,
        lastName: lName.value,
        sex: sex,
        password: pass.value,
        number: number.value,
        reason: reason.value
    };

    // Store the object in localStorage as a JSON string
    localStorage.setItem("user", JSON.stringify(userData));

    // Retrieve and parse the data back into an object
    let retrievedData = JSON.parse(localStorage.getItem("user"));

    console.log(retrievedData.firstName);
    console.log(retrievedData.lastName);
    console.log(retrievedData.sex);
    console.log(retrievedData.password);
    console.log(retrievedData.number);
    console.log(retrievedData.reason);
    setTimeout(function() {
        window.location.href = "proj_profile_samonte.html";
    }, 3000); // Redirects after 3 seconds
    return false;
}

// Clears all sessionStorage data
function clearSessionStorage() {
    sessionStorage.clear();
    alert("All sessionStorage data has been cleared.");
    location.reload();
}

// Removes only the 'userName' key
function removeUsername() {
    sessionStorage.removeItem("userName");
    alert("Username has been removed from sessionStorage.");
    location.reload();
}

function display() {
    let retrievedData = JSON.parse(localStorage.getItem("user"));

    document.getElementById("output").innerHTML = `
        <p>First Name: ${retrievedData.firstName}</p>
        <p>Last Name: ${retrievedData.lastName}</p>
        <p>Sex: ${retrievedData.sex}</p>
        <p>Password: ${retrievedData.password}</p>
        <p>Number: ${retrievedData.number}</p>
        <p>Reason: ${retrievedData.reason}</p>
    `;
}

function post() {
    alert("Nice Post");
}