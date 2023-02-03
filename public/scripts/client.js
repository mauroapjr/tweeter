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
      
      //console.log("this is the new tweet", $newTweet);
      $("#tweets-container").append($newTweet);
    });
  };

  $("#formData").on("submit", function (evt) {
    evt.preventDefault();
    
    const formData = $(this).serialize();
    const newPost = $("#tweet-text").val().length;
    
    if (!newPost) {
      $('#error-empty').removeAttr("display");  
      $('#error-empty').slideDown('slow');
      
    } else if (newPost > 140) {
      $('#error-counter').removeAttr("display");  
      $('#error-counter').slideDown('slow');
          
    } else {
      $('#error-empty').slideUp();
      $('#error-counter').slideUp();

      $.ajax({
        url: "/tweets",
        type: "POST",
        data: formData,
        success: function (response) {
          $("#tweet-text").val("");
          loadTweets();
          console.log("It sent");
        },
        error: function (error) {
          console.log("error");
        },
      });
    }
  });

  const loadTweets = function () {
    
    //console.log("consoleload");
    $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
      console.log("Success", tweets);
    });
  };
  loadTweets();

  const createTweetElement = (tweet) => {
    const safeHTML = escape(tweet.content.text);
    const tweetOutput = `
    <article class="tweet-received box" > 
      <header>
        <div> 
          <img class="avatar" src=${tweet.user.avatars} />
          <span class="tweeter-name">${tweet.user.name}</span>
        </div>  
        <span class="new-user"> ${tweet.user.handle}</span>
      </header>
      <p class="text-received">${safeHTML}</p> 
      <footer>
        <p class="created-date">${timeago.format(tweet.created_at)}</p>
          <div class="icons">
            <div class="flag"><i class="fas fa-flag"></i></div>
            <div class="retweet"><i class="fas fa-retweet"></i></div>
            <div class="like"><i class="fas fa-heart"></i></div>  
          </div>
      </footer>
    </article>
  `;
    return tweetOutput;
  };

});

