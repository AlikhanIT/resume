const questionnaireService = require("../services/questionnaireService");
const apiError = require("../errors/apiError");

class questionnaireController {
  create = async (req, res, next) => {
    try {
      const {
        birthDay,
        cityName,
        microdisctrictName,
        schoolName,
        collegeName,
        universityName,
        street,
        flat,
        work,
        userId,
      } = req.body;
      const result = await questionnaireService.create(
        birthDay,
        cityName,
        microdisctrictName,
        schoolName,
        collegeName,
        universityName,
        street,
        flat,
        work,
        userId
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
      const result = await questionnaireService.remove(id, role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  edit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = req.user;
      const {
        birthDay,
        cityName,
        microdisctrictName,
        schoolName,
        collegeName,
        universityName,
        street,
        flat,
        work,
      } = req.body;
      const result = await questionnaireService.edit(
        id,
        birthDay,
        cityName,
        microdisctrictName,
        schoolName,
        collegeName,
        universityName,
        street,
        flat,
        work,
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
      const result = await questionnaireService.get(id, role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const role = req.user;
      const result = await questionnaireService.getAll(role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new questionnaireController();
