const taskService = require("../services/taskService");
const commentService = require("../services/commentService");
const apiError = require("../errors/apiError");

class CommentController {
  create = async (req, res, next) => {
    try {
      const { comment } = req.body;
      const { id } = req.params;
      const role = req.user;
      console.log("comment");
      console.log(comment);
      console.log("role");
      console.log(role);
      console.log("id");
      console.log(id);
      const result = await commentService.create(comment, role, id);

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
      const { title, description, dateEnd, fileId, imageId, userIds } =
        req.body;
      const result = await taskService.edit(
        id,
        title,
        description,
        dateEnd,
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

  getMyTasksComments = async (req, res, next) => {
    try {
      const role = req.user;
      const result = await taskService.getMyTasksComments(role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new CommentController();
