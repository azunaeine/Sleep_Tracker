//SELECTORS
const dropdown= document.querySelector("#dropdown");
const radioButtons= document.querySelectorAll(".radiobutton");
const sendButton= document.querySelector(".mainbutton");


//Retrieving the data id saved to the local storage from the dashboard page(when update button is clicked)
   const sleepId= localStorage.getItem("id");



//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", function () {
  // Add a class to trigger the animation after a delay of 0.5 seconds
  setTimeout(function () {
    document.querySelector(".nobutton").classList.add("animated");
  }, 500);
});


sendButton.addEventListener("click", addData);




//FUNCTIONS
// Adding a new data to the database OR updating an existing data
function addData(e){
    e.preventDefault();
 
    //storing the select dropdown value
    const dropdownValue= dropdown.value;

    //Initiating a variable to store the selected radio button
    let radioValue= "";

    radioButtons.forEach(btn=> {
      if(btn.checked){
        radioValue= btn.value;
      }
    })

    //values to be sent to the database
    const options= {
      duration: dropdownValue,
      ratings: radioValue
    };

    //Validating empty data is not sent to the database
    if(radioValue === ""){
      alert("You need to select a rating")
      return;
    }

    else{
      //Checking if action is to post or update through the data Id retrieved from the local storage
       if(sleepId === null){
   //This is for creating a new instance of sleep data in the databse
    fetch("http://localhost:3000/api/sleep", {
         method: "POST",
         headers: {
          'Content-Type': "application/json"
         },
         body: JSON.stringify(options)
    })
    .then(res=> {
      alert("New data added successfully!")

      window.location.href= "../secondpage/index.html"
    })
    .catch(err=> console.log(err));
    }
    else{
      //this is for updating an existing sleep data in the database
      fetch("http://localhost:3000/api/sleep/" + sleepId, {
        method: "PUT",
        headers: {
         'Content-Type': "application/json"
        },
        body: JSON.stringify(options)
   })
   .then(res=> {
     alert("Data updated successfully!")
     
     //This removes the stored id from the local storage after the update is completed before redirecting back to the dashboard page
     localStorage.removeItem("id");
     window.location.href= "../secondpage/index.html"
   })
   .catch(err=> console.log(err));
    }
  }

    
}

