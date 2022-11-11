"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.retweetPost = exports.postIdParams = exports.getPosts = exports.getPost = exports.deletePost = exports.createPost = void 0;
var yup = _interopRequireWildcard(require("yup"));
var _en = require("../_lang/en");
var _config = _interopRequireDefault(require("./config.validation"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var createPost = {
  text: yup.string(),
  image: yup.string(),
  pinned: yup["boolean"]()["default"](false)
};
exports.createPost = createPost;
var getPosts = {
  search: yup.string(),
  text: yup.string(),
  postedBy: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect),
  hidden: yup["boolean"](),
  pinned: yup["boolean"](),
  onlyReply: yup["boolean"](),
  followingOnly: yup["boolean"](),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string()
};
exports.getPosts = getPosts;
var getPost = {
  postId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.getPost = getPost;
var updatePost = {
  postId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required(),
  text: yup.string(),
  image: yup.string(),
  pinned: yup["boolean"](),
  hidden: yup["boolean"](),
  fields_update: yup.string().when(['text', 'image', 'hidden', 'pinned'], {
    is: function is(text, image, hidden, pinned) {
      return !text && !image && hidden === undefined && pinned === undefined;
    },
    then: yup.string().required()
  })
};
exports.updatePost = updatePost;
var deletePost = {
  postId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.deletePost = deletePost;
var postIdParams = {
  postId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.postIdParams = postIdParams;
var retweetPost = {
  postId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required(),
  text: yup.string()
};
exports.retweetPost = retweetPost;