let prevLengthOfTextarea = 0;
let defaultCharsLeft = 140;

const toggleBackTpTopBtn = () => {
  if ($(window).scrollTop() > 0) {
    $(".back-to-top").show().fadeIn("slow");
  } else {
    $(".back-to-top").hide().fadeOut("slow");
  }
};

$(document).ready(function () {
  $("form");
  $("#tweet-text").on("input", function () {
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

  $(".back-to-top").hide();
  $(window).scroll(toggleBackTpTopBtn);
  $(".back-to-top").on("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toggleBackTpTopBtn();
  });

  $(".form-toggle").on("click", toggleTweetForm);
});
