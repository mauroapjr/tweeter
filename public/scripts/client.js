let endpoint = "/tweets"; 

$(document).ready(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  const renderTweets = function (tweets) {
    tweets.forEach((tweet) => {
      const $newTweet = createTweetElement(tweet);
      $("#tweets-container").append($newTweet);
    });
  };
  //submit the tweet posts
  $("form").on("submit", function (e) {
    e.preventDefault();
    $(this).find("p").hide().slideDown("slow");
    // if content is more than 140 characters
    if ($(this).find("textarea").val().length > defaultCharsLeft) {
      const error_msg = "You cannot exceed more than 140 characters";
      return displayError(error_msg);
    }
    // if content is empty
    if ($(this).find("textarea").val().length < 1) {
      const error_msg = "You cannot post an empty tweet.";
      return displayError(error_msg);
    }
    $.ajax({
      method: "POST",
      url: endpoint,
      type: "application/json",
      data: $(this).serialize(),
      success: function () {
        $("textarea").val("");
        $(".counter").val(0);
        $(".error_msg").hide();
        $.get("http://localhost:8080/tweets", (data) => {
          const newTweet = [data.slice(-1).pop()];
          renderTweets(newTweet);
        });
      },
    });
  });
  
  const loadTweets = function () {
    //console.log("consoleload");
    $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
      console.log("Success", tweets);
    });
  };
  loadTweets();

  const createTweetElement = (tweetData) => {
    const { user, content, created_at } = tweetData;

    let singleTweetElement = $(`<article class="tweet-component">
          <!-- image-username-refkey -->
          <div class="image-username-refkey">
            <div class="image-username">
              <img src=${user.avatars} alt="" />
              <span>${user.name}</span>
            </div>
            <div>${user.handle}</div>
            </div>
          <!-- tweet contect -->
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
        </article>`);

    return singleTweetElement;
  };
  $(".new-tweet").hide();

  // const createTweetElement = (tweet) => {
  //   const safeHTML = escape(tweet.content.text);
  //   const tweetOutput = `
  //   <article class="tweet-received box" >
  //     <header>
  //       <div>
  //         <img class="avatar" src=${tweet.user.avatars} />
  //         <span class="tweeter-name">${tweet.user.name}</span>
  //       </div>
  //       <span class="new-user"> ${tweet.user.handle}</span>
  //     </header>
  //     <p class="text-received">${safeHTML}</p>
  //     <footer>
  //       <p class="created-date">${timeago.format(tweet.created_at)}</p>
  //         <div class="icons">
  //           <div class="flag"><i class="fas fa-flag"></i></div>
  //           <div class="retweet"><i class="fas fa-retweet"></i></div>
  //           <div class="like"><i class="fas fa-heart"></i></div>
  //         </div>
  //     </footer>
  //   </article>
  // `;
  //   return tweetOutput;
  // };
});
// toggle tweet form
const toggleTweetForm = () => {
  var $section = $("section.new-tweet");
  if ($section.is(":visible")) {
    $section.slideUp("fast");
  } else {
    $section.slideDown("fast");
    $section.find("textarea").focus();
  }
};
// display errors
const displayError = (err_msg) => {
  $("form").find(".error_msg").text(err_msg).show().slideDown("slow");
};
