"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePostById = exports.updateOne = exports.queryPosts = exports.getPostById = exports.deletePosts = exports.deletePostById = exports.deleteOne = exports.createPost = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _models = require("../models");
var _comment = require("./comment.service");
var uploadService = _interopRequireWildcard(require("./upload.service"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Create new post
 * @param {Object} body
 * @returns {Promise<Post>}
 */
var createPost = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(postBody) {
    var post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.Post.create(postBody);
          case 2:
            post = _context.sent;
            return _context.abrupt("return", post.populate('postedBy'));
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function createPost(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get posts by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<{posts: Post[], info: Info}>}
 */
exports.createPost = createPost;
var queryPosts = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(filter, options) {
    var customLabels, posts;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            customLabels = {
              docs: 'posts',
              page: 'page',
              totalPages: 'totalPages',
              limit: 'limit'
            };
            options = _objectSpread(_objectSpread({}, options), {}, {
              customLabels: customLabels
            });
            _context2.next = 4;
            return _models.Post.paginate(filter, options);
          case 4:
            posts = _context2.sent;
            return _context2.abrupt("return", posts);
          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function queryPosts(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Find post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
exports.queryPosts = queryPosts;
var getPostById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(postId) {
    var post;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.Post.findById(postId).populate(['postedBy']);
          case 2:
            post = _context3.sent;
            return _context3.abrupt("return", post);
          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getPostById(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {PostBody} body
 * @returns {Promise<Post>}
 */
exports.getPostById = getPostById;
var updatePostById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(postId, body) {
    var post;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.Post.findByIdAndUpdate(postId, body, {
              "new": true
            }).populate('postedBy');
          case 2:
            post = _context4.sent;
            if (post) {
              _context4.next = 5;
              break;
            }
            throw new _httpErrors["default"].NotFound('Not found post.');
          case 5:
            return _context4.abrupt("return", post);
          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function updatePostById(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Update post by id
 * @param {Object} filter
 * @param {PostBody} body
 * @returns {Promise<Post>}
 */
exports.updatePostById = updatePostById;
var updateOne = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(filter, body) {
    var post;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.Post.findOneAndUpdate(filter, body, {
              "new": true,
              populate: {
                path: 'postedBy'
              }
            });
          case 2:
            post = _context5.sent;
            return _context5.abrupt("return", post);
          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function updateOne(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
exports.updateOne = updateOne;
var deletePostById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(postId) {
    var _post$image;
    var post;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _models.Post.findByIdAndDelete(postId);
          case 2:
            post = _context6.sent;
            _context6.next = 5;
            return (0, _comment.deleteMany)({
              retweetData: post.id
            });
          case 5:
            // Remove image in cloudiness
            if (post !== null && post !== void 0 && (_post$image = post.image) !== null && _post$image !== void 0 && _post$image.id) {
              uploadService.destroy(post.image.id);
            }
            if (post) {
              _context6.next = 8;
              break;
            }
            throw new _httpErrors["default"].NotFound('Not found post.');
          case 8:
            return _context6.abrupt("return", post);
          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function deletePostById(_x9) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Delete post by id
 * @param {Object} filter
 * @returns {Promise<Post>}
 */
exports.deletePostById = deletePostById;
var deleteOne = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(filter) {
    var _post$image2;
    var post;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models.Post.findOneAndDelete(filter);
          case 2:
            post = _context7.sent;
            // Remove image in cloudiness
            if (post !== null && post !== void 0 && (_post$image2 = post.image) !== null && _post$image2 !== void 0 && _post$image2.id) {
              uploadService.destroy(post.image.id);
            }
            if (!post) {
              _context7.next = 7;
              break;
            }
            _context7.next = 7;
            return (0, _comment.deleteMany)({
              retweetData: post === null || post === void 0 ? void 0 : post.id
            });
          case 7:
            return _context7.abrupt("return", post);
          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function deleteOne(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Delete many posts
 * @param {Object} filter
 * @returns {Promise<{acknowledged: boolean, deletedCount: number}>}
 */
exports.deleteOne = deleteOne;
var deletePosts = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(filter) {
    var posts, result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _models.Post.find(filter).select('+image.id');
          case 2:
            posts = _context8.sent;
            // Remove images in cloudiness
            posts.forEach(function (post) {
              var _post$image3;
              if (post !== null && post !== void 0 && (_post$image3 = post.image) !== null && _post$image3 !== void 0 && _post$image3.id) {
                uploadService.destroy(post.image.id);
              }
            });
            _context8.next = 6;
            return _models.Post.deleteMany(filter);
          case 6:
            result = _context8.sent;
            return _context8.abrupt("return", result);
          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return function deletePosts(_x11) {
    return _ref8.apply(this, arguments);
  };
}();
exports.deletePosts = deletePosts;