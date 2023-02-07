let endpoint = "/tweets";

$(document).ready(() => {
  const renderTweets = function (tweets) {
    tweets.forEach((tweet) => {
      const $newTweet = createTweetElement(tweet);
      $("#tweets-container").prepend($newTweet);
    });
  };

  $("form").on("submit", function (e) {
    e.preventDefault();
    $(this).find("p").hide().slideDown("slow");
    const characTextarea = $(this).find("textarea").val().length;
    if (characTextarea > defaultCharsLeft) {
      const error_msg = "You cannot exceed more than 140 characters";
      return displayError(error_msg);
    }
    if (characTextarea < 1) {
      const error_msg = "You cannot post an empty tweet.";
      return displayError(error_msg);
    }
    $.ajax({
      method: "POST",
      url: endpoint,
      type: "application/json",
      data: $(this).serialize(),
      success: function () {
        const apiAddress = "http://localhost:8080/tweets";
        $("textarea").val("");
        $(".counter").val(0);
        $(".error_msg").hide();
        $.get(apiAddress, (data) => {
          const newTweet = [data.slice(-1).pop()];
          renderTweets(newTweet);
        });
      },
    });
  });

  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
    });
  };
  loadTweets();

  const createTweetElement = (tweetData) => {
    const { user, content, created_at } = tweetData;
    let singleTweetElement = $(`
    <article class="tweet-component">
      <!-- image-username-refkey -->
      <div class="image-username-refkey">
        <div class="image-username">
          <img src=${user.avatars} alt="" />
          <span>${user.name}</span>
        </div>
        <div>${user.handle}</div>
        </div>
      <!-- tweet content -->
      <div class="tweet-content">
        <!-- <p>${content.text}</p> -->
        ${$("<p>").text(content.text).html()}
      </div>
      <!-- time and reactions icons -->
      <div class="time-reactions">
        <p>${timeago.format(created_at)}</p>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </article>
    `);
    return singleTweetElement;
  };
  $(".new-tweet").hide();
});

const toggleTweetForm = () => {
  let $section = $("section.new-tweet");
  if ($section.is(":visible")) {
    $section.slideUp("fast");
  } else {
    $section.slideDown("fast");
    $section.find("textarea").focus();
  }
};

const displayError = (err_msg) => {
  $("form").find(".error_msg").text(err_msg).show().slideDown("slow");
};
