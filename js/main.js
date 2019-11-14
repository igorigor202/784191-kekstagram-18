'use strict';

var DESCRIPTIONS = [
  'Дом',
  'Природа',
  'Море',
  'Облака',
  'Здание',
  'Ресторан',
  'Еда'
];
var USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Влад',
  'Артур',
  'Дима',
  'Игорь',
  'Александр',
  'Илья',
  'Максим',
  'Сергей',
  'Михаил',
  'Владимир'
];
var MOCKS_COUNT = 25;
var MAX_LIKES = 201;
var MIN_LIKES = 15;
var MAX_COMMENTS = 3;
var MIN_COMMENTS = 1;
var AVATAR_COUNT = 6;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getRandomElement = function (arr) {
  var randomIndex = getRandomNumber(0, arr.length - 1);
  return arr[randomIndex];
};

var generateAvatarUrl = function () {
  return 'img/avatar-' + getRandomNumber(1, AVATAR_COUNT) + '.svg';
};

var generateComment = function () {
  return {
    avatar: generateAvatarUrl(),
    message: getRandomElement(USER_COMMENTS),
    name: getRandomElement(NAMES),
  };
};

var generateCommentsList = function (count) {
  var result = [];
  for (var i = 1; i <= count; i += 1) {
    var comment = generateComment();
    result.push(comment);
  }
  return result;
};

var generateMock = function (int) {
  var randomCommentCount = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
  return {
    url: 'photos/' + int + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: generateCommentsList(randomCommentCount),
    сommentCountdata: getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)
  };
};

var generateMocks = function (mocksCount) {
  var result = [];
  for (var i = 1; i <= mocksCount; i += 1) {
    result.push(generateMock(i));
  }
  return result;
};

var pictureTemplate = document.querySelector('#picture');
var templateContent = pictureTemplate.content;
var mocks = generateMocks(MOCKS_COUNT);

var getPictureNode = function (mock) {
  var randomUserPictureNode = templateContent.cloneNode(true);
  var url = mock.url;
  var likesCount = mock.likes;
  var comments = mock.comments;
  var imageNode = randomUserPictureNode.querySelector('.picture__img');
  imageNode.setAttribute('src', url);
  var likesNode = randomUserPictureNode.querySelector('.picture__likes');
  likesNode.textContent = likesCount;
  var commentsNode = randomUserPictureNode.querySelector('.picture__comments');
  commentsNode.setAttribute('src', comments);
  return randomUserPictureNode;
};

var renderPictures = function (mocksList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i <= mocksList.length - 1; i += 1) {
    var mock = mocksList[i];
    var node = getPictureNode(mock);
    fragment.appendChild(node);
  }

  var picturesNode = document.querySelector('.pictures');
  picturesNode.appendChild(fragment);
};

renderPictures(mocks);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var generateCommentNode = function (commentData, commentNode) {
  var message = commentNode.querySelector('.social__text');
  message.textContent = commentData.message;
  var image = commentNode.querySelector('.social__picture');
  image.setAttribute('src', commentData.avatar);
  var alt = commentNode.querySelector('.social__picture');
  alt.textContent = commentData.name;
  return commentNode;
};

var generateBigPictureFromData = function (mock, commentNode) {
  var image = bigPicture.querySelector('.big-picture__img img');
  var url = mock.url;
  image.setAttribute('src', url);
  var likesCount = mock.likes;
  var likes = bigPicture.querySelector('.big-picture__social .likes-count');
  likes.textContent = likesCount;
  var commentData = mock.сommentCountdata;
  var commentsCount = bigPicture.querySelector('.comments-count');
  commentsCount.textContent = commentData;
  var description = mock.description;
  var descriptionNode = bigPicture.querySelector('.social__caption');
  descriptionNode.setAttribute('src', description);
  var commentsFragment = document.createDocumentFragment();
  for (var i = 0; i < mock.comments.length; i += 1) {
    var newCommentNode = commentNode.cloneNode(true);
    var currentCommentData = mock.comments[i];
    var someNewCommentNode = generateCommentNode(currentCommentData, newCommentNode);
    commentsFragment.appendChild(someNewCommentNode);
  }
  var commentsList = bigPicture.querySelector('.social__comments');
  commentsList.innerHTML = '';
  commentsList.appendChild(commentsFragment);

  var socialComment = document.querySelector('.social__comment-count');
  socialComment.classList.add('visually-hidden');
  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('visually-hidden');
};

var commentsList1 = bigPicture.querySelector('.social__comments');
generateBigPictureFromData(mocks[0], commentsList1);

