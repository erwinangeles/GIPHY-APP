let topics = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'turtle']

loadTopics();


$(document).on("click", ".btn", function(){
    if($(this).data("animal")){
       //will only run if the button has an animal data tag
       loadGiphy($(this).data("animal"));
    }
})

$(document).on("click", ".gif", playGif);

function playGif(){
    $(".gif").on("click", function() {
        let state = $(this).data('state');
        if(state === 'still') {
          $(this).data('state', 'animate');
          $(this).attr('src', $(this).data('animate'));
        }
  
        else if(state === 'animate') {
          $(this).data('state', 'still');
          $(this).attr('src', $(this).data('still'));
        }
    })
}

$("#addBtn").on("click", function(event){
    event.preventDefault();
    let animal_name = $("#animalTxt").val().toLowerCase().trim();
    if(animal_name !== ""){
        topics.push(animal_name);
        $("#animalTxt").val("");
        loadTopics();
    }
   
})

function loadTopics(){
    $("#buttonGroup").empty();
    for(let i=0; i < topics.length; i++){
       add(topics[i]);
    }
}

function add(name){
    let newButton = $("<button>")
    newButton.text(name);
    newButton.addClass("btn btn-sm btn-secondary")
    $(newButton).attr("data-animal",name);
    $("#buttonGroup").append(newButton)
}


function loadGiphy(name){
const url = "https://api.giphy.com/v1/gifs/search?api_key=EGNvVmQ7v3gt6JxvXnISt39sFRgOtx3R&q=" + name + "&limit=10&offset=0&lang=en"
const method = "GET";

$.ajax({ 
url, 
method })
.then(function(response) {
  console.log(response);
  $('#result-box').empty();
  
  let newGify = $('<div>');
  $('#result-box').prepend(newGify);
  for (let i = 0; i < 10; i++) {
    
    let gif = $(`<img>`);
    let rating = $(`<div>`);
    gif.addClass('gif');
    gif.attr('src', response.data[i].images.original_still.url);
    gif.attr('data-still', response.data[i].images.original_still.url);
    gif.attr('data-animate', response.data[i].images.original.url);
    gif.attr('title', "Double Click for Magic!");
    gif.attr('data-state', 'still');
    gif.attr('width', '100%');
    rating.text("Rating: " + response.data[i].rating);
    newGify.append(gif)
    newGify.append(rating);
  }

  
    
  
})
.catch(function(err) {
  console.log(err);
})

}







