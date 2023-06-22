const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/heroes");
const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../models/hero");

const upload = require("../../middlewares/upload");

router.get("/", ctrl.getAll);

router.get("/:heroId", isValidId, ctrl.getById);

router.post(
  "/",
  upload.array("images", 12),
  validateBody(addSchema),
  ctrl.addNew
);

router.delete("/:heroId", isValidId, ctrl.deleteById);

router.put("/:heroId", isValidId, validateBody(updateSchema), ctrl.updateById);

router.patch(
  "/:heroId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateById
);

module.exports = router;