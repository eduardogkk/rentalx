"use strict";

var _tsyringe = require("tsyringe");
var _LocalStoregeProvider = require("./implementations/LocalStoregeProvider");
var _S3StorageProvider = require("./implementations/S3StorageProvider");
const diskStorage = {
  local: _LocalStoregeProvider.LocalStorageProvider,
  s3: _S3StorageProvider.S3StorageProvider
};
_tsyringe.container.registerSingleton('StorageProvider', diskStorage[process.env.disk]);