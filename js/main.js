var DESCRIPTIONS = [
   'Дом',
   'Природа',
   'Море',
   'Облака',
   'Здание',
   'Ресторан',
   'Еда',
 ];
 var USER_COMMENTS = ['Всё отлично!','В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
 var NAMES = ['Влад', 'Артур','Дима','Игорь','Александр','Илья','Максим','Сергей','Михаил','Владимир'];
 var MOCKS_COUNT = 25;

 var getRandomNumber = function (min, max) {
   return Math.floor(Math.random() * (max - min) + min)
 };

 var getRandomElement = function (arr) {
   var randomIndex = getRandomNumber(0, arr.length);
   return arr[randomIndex];
 };

var generateAvatarUrl = function() {
  return 'img/avatar-' + getRandomNumber(1, MOCKS_COUNT + 1) + '.svg'
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
  var randomCommentCount = getRandomNumber(1, 3);
  return {
    url: 'pictures/' + int + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 201),
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


var elem = document.querySelector('#picture');

var picture = document.createElement('img');
picture.src.add = 'pictures/' + int + '.jpg';
elem.appendChild(picture);

var likes = document.createElement('like');
picture__likes.textContent.add = 'getRandomNumber(15, 201)';
elem.appendChild(likes);

var comments = document.createElement('comment');
picture__comments.textContent.add = 'generateCommentsList()';
elem.appendChild(comments);
