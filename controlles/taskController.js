const taskService = require("../services/taskService");
const apiError = require("../errors/apiError");

class TaskController {
  create = async (req, res, next) => {
    try {
      const { title, description, date_end, fileId, imageId, userIds } =
        req.body;
      const result = await taskService.create(
        title,
        description,
        date_end,
        fileId,
        imageId,
        userIds
      );

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = req.user;
      const result = await taskService.remove(id, role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  edit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = req.user;
      const { title, description, date_end, fileId, imageId, userIds } =
        req.body;
      const result = await taskService.edit(
        id,
        title,
        description,
        date_end,
        fileId,
        imageId,
        userIds,
        role
      );
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  get = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = req.user;
      const result = await taskService.get(id, role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const role = req.user;
      const result = await taskService.getAll(role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new TaskController();
