var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
//used to initialize the buttons
var LEFT_RIGHT_BUTTONS = '[data-image-button="button"]';

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

//implement the buttons for navigating left and right across all of the thumbnail images 

function leftRightButtons() {
  "use strict";
  var getCurrTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  var buttons = document.querySelectorAll(LEFT_RIGHT_BUTTONS);
  var buttonsArr = [].slice.call(buttons);
  var leftButton = buttonsArr[0];
  var rightButton = buttonsArr[1];
  var thumbnailsArr = getThumbnailsArray();
  var currImage;
  var currTitle;

  //left button
  leftButton.addEventListener("click", function (event) {
    event.preventDefault();

    for (var i = 0; i < thumbnailsArr.length; i++) {
      if (thumbnailsArr[i].getAttribute("data-image-title") == getCurrTitle.textContent) {
        if (i == 0) {
          currImage = imageFromThumb(thumbnailsArr[thumbnailsArr.length - 1]);
          currTitle = titleFromThumb(thumbnailsArr[thumbnailsArr.length - 1]);
          setDetails(currImage, currTitle);
          break;
        } else if (i != 0) {
          currImage = imageFromThumb(thumbnailsArr[i - 1]);
          currTitle = titleFromThumb(thumbnailsArr[i - 1]);
          setDetails(currImage, currTitle);
        }
      }
    }

  });

  //right button
  rightButton.addEventListener("click", function (event) {
    event.preventDefault();

    for (var i = 0; i < thumbnailsArr.length; i++) {
      if (thumbnailsArr[i].getAttribute("data-image-title") == getCurrTitle.textContent) {
        if (i == thumbnailsArr.length - 1) {
          currImage = imageFromThumb(thumbnailsArr[0]);
          currTitle = titleFromThumb(thumbnailsArr[0]);
          setDetails(currImage, currTitle);
        } else {
          currImage = imageFromThumb(thumbnailsArr[i + 1]);
          currTitle = titleFromThumb(thumbnailsArr[i + 1]);
          setDetails(currImage, currTitle);
          break;
        }
      }
    }
  });
}


function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();