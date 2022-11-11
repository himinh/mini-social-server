"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateComment = exports.likeComment = exports.getComments = exports.getComment = exports.deleteComment = exports.createComment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _pick = _interopRequireDefault(require("../utils/pick"));
var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));
var _services = require("../services");
var _notification = require("../services/notification.service");
/**
 * Create a comment
 * @POST api/comments/
 * @access private
 */
var createComment = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var comment, _result, result, post, userFrom, userTo, type;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            comment = req.body;
            if (!req.file) {
              _context.next = 6;
              break;
            }
            _context.next = 4;
            return _services.uploadService.uploadImageComment(req.file.path);
          case 4:
            _result = _context.sent;
            comment.image = _result;
          case 6:
            // Add author
            comment.author = req.user.id;

            // Create comment comment
            _context.next = 9;
            return _services.commentService.createComment(comment);
          case 9:
            result = _context.sent;
            _context.next = 12;
            return _services.postService.updatePostById(comment.post, {
              $push: {
                comments: result.author
              }
            })["catch"](function (error) {
              _services.commentService.deleteCommentById(result.id);
              throw new Error(error);
            });
          case 12:
            post = _context.sent;
            // Create notification comment
            userFrom = result.author;
            userTo = result.replyTo ? result.replyTo : post.postedBy._id.toString();
            type = result.replyTo ? _notification.notificationTypes.commentUser : _notification.notificationTypes.commentPost;
            if (!(userFrom !== userTo)) {
              _context.next = 19;
              break;
            }
            _context.next = 19;
            return _services.notificationService.createNotificationComment(result.author, userTo, post._id, type);
          case 19:
            res.status(201).json(result);
          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Like comment
 * @Post api/comments/:commentId/like
 * @access private
 */
exports.createComment = createComment;
var likeComment = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var commentId, user, comment, isLiked, options, updatedComment;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commentId = req.params.commentId;
            user = req.user;
            _context2.next = 4;
            return _services.commentService.getCommentById(commentId);
          case 4:
            comment = _context2.sent;
            isLiked = comment.likes.includes(user.id);
            options = isLiked ? '$pull' : '$addToSet';
            _context2.next = 9;
            return _services.commentService.updateCommentById(commentId, (0, _defineProperty2["default"])({}, options, {
              likes: user.id
            }));
          case 9:
            updatedComment = _context2.sent;
            if (!(!isLiked && updatedComment.author.toString() !== user.id)) {
              _context2.next = 13;
              break;
            }
            _context2.next = 13;
            return _services.notificationService.createNotificationLikeComment(user.id, updatedComment.author, updatedComment.post);
          case 13:
            res.send(comment);
          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * Get all comments
 * @GET api/comments
 * @access public
 */
exports.likeComment = likeComment;
var getComments = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var filter, options, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            filter = (0, _pick["default"])(req.query, ['post', 'comment', 'replyTo', 'author', 'parentId']);
            options = (0, _pick["default"])(req.query, ['sort', 'select', 'limit', 'page']);
            options.populate = 'author,replyTo,post,post.postedBy';
            _context3.next = 5;
            return _services.commentService.queryComments(filter, options);
          case 5:
            result = _context3.sent;
            res.send(result);
          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * Get a comment by comment id
 * @GET api/comments/:commentId
 * @access public
 */
exports.getComments = getComments;
var getComment = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var comment;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _services.commentService.getCommentById(req.params.commentId);
          case 2:
            comment = _context4.sent;
            if (comment) {
              _context4.next = 5;
              break;
            }
            throw _httpErrors["default"].NotFound();
          case 5:
            res.send(comment);
          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

/**
 * Update a comment by commentId
 * @PATCH api/comments/:commentId
 * @access private
 */
exports.getComment = getComment;
var updateComment = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var comment;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _services.commentService.updateCommentById(req.params.commentId, req.body);
          case 2:
            comment = _context5.sent;
            res.send(comment);
          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

/**
 * Delete comment by commentId
 * @DELETE api/comments/:commentId
 * @access private
 */
exports.updateComment = updateComment;
var deleteComment = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var comment;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _services.commentService.deleteCommentById(req.params.commentId);
          case 2:
            comment = _context6.sent;
            _context6.next = 5;
            return _services.postService.updatePostById(comment.post, {
              $pull: {
                comments: comment.id
              }
            });
          case 5:
            res.send(comment);
          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
exports.deleteComment = deleteComment;