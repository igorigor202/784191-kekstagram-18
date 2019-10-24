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
    'Илья','Максим',
    'Сергей','Михаил',
    'Владимир'
 ];
 var MOCKS_COUNT = 25;
 var MAX_COMMENTS = 3;
 var MAX_LIKES = 201;

 var getRandomNumber = function (min, max) {
   return Math.floor(Math.random() * (max + 1 - min) + min)
 };

 var getRandomElement = function (arr) {
   var randomIndex = getRandomNumber(0, arr.length - 1);
   return arr[randomIndex];
 };

var generateAvatarUrl = function() {
  return 'img/avatar-' + getRandomNumber(1, MOCKS_COUNT) + '.svg'
};

var generateComment = function() {
  return {
    avatar: generateAvatarUrl(),
    message: getRandomElement(USER_COMMENTS),
    name: getRandomElement(NAMES),
  }
};

var generateCommentsList = function(count) {
  var result = [];
  for (var i = 1; i <= count; i += 1) {
    var comment = generateComment();
    result.push(comment);
  }
   return result;
};

var generateMock = function(int) {
  var randomCommentCount = getRandomNumber(1, MAX_COMMENTS);
  return {
    url: 'pictures/' + int + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomNumber(15, MAX_LIKES),
    comments: generateCommentsList(randomCommentCount),
  }
};

var generateMocks = function(mocksCount) {
  var result = [];
  for (var i = 1; i <= mocksCount; i += 1) {
    result.push(generateMock(i));
  }
  return result;
};

generateMocks(MOCKS_COUNT);


//var target = document.querySelector('someSelector');
//var image = randomUserPicture.querySelector('.picture__img');
//image.setAttribute('src', 'img/picture1.jpg');
var templateContent = template.content;
var pictureTemplate = document.querySelector('#picture');
var mocks = renderMocks(MOCKS_COUNT);

var getPictureNode = function(mock) {
  var randomUserPicture = templateContent.cloneNode(true);
  var url = mock.url;
  //var description = mock.description;
  var likesCount = mock.likes;
  var image = randomUserPicture.querySelector('.picture__img');
  image.setAttribute('src', url);
  var likesNode = randomUserPicture.querySelector('.picture__likes');
  likesNode.textContent = likesCount;
  return randomUserPicture;
};

var renderPictures = function(mocks) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i <= mocks.length - 1; i += 1) {
    var mock = mocks[i];
    var node = getPictureNode(mock);
    fragment.appendChild(node);
  }
  document.body.appendChild(fragment);
};

renderPictures(mocks);

var generatePictures = document.querySelector('.pictures');
var add_Domelements = function (mocks) {
  document.body.pictures.renderPictures(mocks);
};

add_Domelements(mocks);
