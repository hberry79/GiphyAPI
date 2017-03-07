$(document).ready(function() {



    var animalButtons = ["Cat", "Dog", "Llama", "Bird"];
    var newAnimal = "";

    renderButtons();

    function renderButtons() {
        for (var i = 0; i < animalButtons.length; i++) {
            var newButton = $("<button>");
            newButton.text(animalButtons[i]);
            newButton.addClass("myButton");
            newButton.attr("value", animalButtons[i]);
            $("#animalButtons").append(newButton);
        }
    }

    $("#addAnimal").on('click', function(event) {
        event.preventDefault();
        newAnimal = $("#animalInput").val().trim();
        if (newAnimal === "") {
            alert("Hey bro, please type something you want to search for");
        } else {

            animalButtons.push(newAnimal);
            $("#animalInput").val(" ");
            $("#animalButtons").empty();
            for (var i = 0; i < animalButtons.length; i++) {
                var newButton = $("<button>");
                newButton.text(animalButtons[i]);
                newButton.addClass("myButton");
                newButton.attr("value", animalButtons[i]);
                $("#animalButtons").append(newButton);
            }
        }
    })


    $("#animalButtons").on('click', ".myButton", function() {

        $("#animals").empty();
        var newAnimalSearch = $(this).val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newAnimalSearch + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response);

                for (var i = 0; i < response.data.length; i++) {
                    var animalGifAnimated = response.data[i].images.fixed_height.url;
                    var animalGifStill = response.data[i].images.downsized_still.url;
                    var rating= response.data[i].rating;
                    
                    var image = $("<img>").attr({
                        "src": animalGifAnimated,
                        "data-still": animalGifStill,
                        "data-animate": animalGifAnimated,
                        "data-state": "still",
                        "class": "gif",
                        "alt": "Gif with rating: " + rating
                    });

                    $("#animals").append(image);
                    var ratingDIV = $("<p id='imgRating'>");
				 	ratingDIV.text (image.attr("alt"));
				 	$("#animals").append(ratingDIV);
             			
                }
                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } 
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }


                })

            });

    });
}); //end document.ready
