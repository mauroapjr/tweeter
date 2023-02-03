// function to count characters of tweet
let prevLengthOfTextarea = 0;
let defaultCharsLeft = 140;

// check scroll by user
const toggleBackTpTopBtn = () => {
  if ($(window).scrollTop() > 0) {
    $(".back-to-top")
      .show()
      .fadeIn("slow");
  } else {
    $(".back-to-top")
      .hide()
      .fadeOut("slow");
  }
};

$(document).ready(function() {
  $("form")
    .find("textarea")
    .keyup(function() {
      const charInTextarea = $(this).val().length;
      const charsLeft = defaultCharsLeft - charInTextarea;
      if (charInTextarea > defaultCharsLeft) {
        ["-", charsLeft].join("");
        $(this)
          .next()
          .find("output")
          .text(charsLeft)
          .css("color", "red");
      } else {
        $(this)
          .next()
          .find("output")
          .text(charsLeft)
          .css("color", "black");
      }
      $(this)
        .next()
        .find("output")
        .text(charsLeft);
      
    });

  // hide back to top button at initial render
  $(".back-to-top").hide();
  // call toggleBackTpTopBtn on page scroll
  $(window).scroll(toggleBackTpTopBtn);
  // clicking on back to top
  $(".back-to-top").on("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    toggleBackTpTopBtn();
  });

  // click to toggle form
  $(".form-toggle").on("click", toggleTweetForm);
}); 
// $(document).ready(function () {
//   $("#tweet-text").on("input",function () {
//     let maxChar = 140;
//     $(".counter").val(maxChar - this.value.length);

//     if (this.value.length >= 141) {
//         $(".counter").addClass("red");
//     } else {
//         $(".counter").removeClass("red");
//     }
// });
// });


