// function to count characters of tweet
$(document).ready(function () {
  $("#tweet-text").on("input",function () {
    let maxChar = 140;
    $(".counter").val(maxChar - this.value.length);

    if (this.value.length >= 141) {
        $(".counter").addClass("red");
    } else {
        $(".counter").removeClass("red");
    }
});
});


