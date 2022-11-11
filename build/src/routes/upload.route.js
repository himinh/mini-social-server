"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _middleware = require("../middleware");
var _controllers = require("../controllers");
var router = new _express.Router();
router.post('/avatar', (0, _middleware.auth)(), _middleware.uploadStorage.single('avatar'), _middleware.upload, _controllers.uploadController.uploadAvatar);
router.post('/cover_photo', (0, _middleware.auth)(), _middleware.uploadStorage.single('coverPhoto'), _middleware.upload, _controllers.uploadController.uploadCoverPhoto);
router.post('/image_comment', (0, _middleware.auth)(), _middleware.uploadStorage.single('imageComment'), _middleware.upload, _controllers.uploadController.uploadImageComment);
var _default = router;
exports["default"] = _default;