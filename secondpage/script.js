//SELECTORS
const animateBox= document.querySelector(".animate");
const refreshBtn= document.querySelector(".refresh");


//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", ()=> {
  getSavedData();  
});

refreshBtn.addEventListener("click", refreshPage);




//FUNCTIONS

// Create an Intersection Observer
function animate(){
  // Get all elements with the class 'box'
const boxes = document.querySelectorAll(".box");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // If the box is in the viewport, add the 'animate' class
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.5 }
); // Adjust the threshold based on your needs

// Observe each box
boxes.forEach((box) => {
  observer.observe(box);
});
}


//Retrieving all sleep data from the database
function getSavedData(){
   fetch("http://localhost:3000/api/sleeps")
   .then(res=> res.json())
   .then(data=> {
     //After retrieving the data successfully, we pass it to displayData function for rendering onto the page
    displayData(data);

    //Calling the animate function
    animate();
   })
   .catch(err=> console.log(err));
}


//Displaying the retrieved data onto the webpage
function displayData(data){
     data.forEach(sleep=> {
      //Creating HTML for each sleep data
       const sleepHTML= `
       <div class="box">
        <div class="gap">
          <h6 class="info">Sleep Duration:</h6>
          <h6 class="desc"> ${sleep.duration}</h6>
        </div>
        <div class="gap tweak">
          <h6 class="info"> Sleep Ratings </h6>
          <h6 class="desc">${sleep.ratings}</h6>
        </div>
        <div class="buttons"><button class="update" id=${sleep._id}>update</button> <button class="delete" id=${sleep._id}>delete</button></div>
     </div>
       `;

       //Rendering each sleep HTML data onto the webpage
       animateBox.insertAdjacentHTML("afterbegin", sleepHTML);
   });

   //Selecting all instances of the update buttons
   const updateButtons= document.querySelectorAll(".update");
    //Selecting all instances of the delete buttons
   const deleteButtons= document.querySelectorAll(".delete");

   updateButtons.forEach(btn=> {
    btn.addEventListener("click", ()=> {
         updateData(btn.id);
    })
  })

   deleteButtons.forEach(btn=> {
    btn.addEventListener("click", ()=> {
      deleteData(btn.id)
    })
   })

};


//Saving the id of the data to be updated into the local storage and redriecting to the post data page
function updateData(id){
    localStorage.setItem("id", id)
    window.location.href = "../thirdpage/index.html";
};


//Deleting of sleep data
function deleteData(id){
   const confirmDelete= confirm("You are about deleting a data, this is irreversible");

   if(!confirmDelete){
    return;
   }
   else{
    fetch("http://localhost:3000/api/sleep/" + id, {
      method: "DELETE",
 })
 .then(res=> {
   alert("Data deleted successfully!")
   window.location.reload();
 })
 .catch(err=> console.log(err));
  }
}


//Re-initializing the database data
function refreshPage(){
  fetch("http://localhost:3000/api/sleeps", {
    method: "POST",
 
})
.then(res=> {
    window.location.reload();
})
.catch(err=> console.log(err));
}