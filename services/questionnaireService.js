const prisma = require("../prisma/index");
const apiError = require("../errors/apiError");

class QuestionnaireService {
  create = async (
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
  ) => {
    const result = await prisma.Questionnaire.create({
      data: {
        birthDay,
        cityId: {
          create: {
            name: cityName,
            microdistricts: {
              create: {
                name: microdisctrictName,
              },
            },
          },
        },
        schoolId: {
          create: {
            name: schoolName,
          },
        },
        collegeId: {
          create: {
            name: collegeName,
          },
        },
        universityId: {
          create: {
            name: universityName,
          },
        },
        street,
        flat,
        work,
        userId,
      },
    });

    return result;
  };

  remove = async (id, role) => {
    const questionnaire = await prisma.Questionnaire.findFirst({
      where: {
        id: id,
      },
    });

    if (questionnaire.id === id || role === "admin") {
      const city = await prisma.City.findFirst({
        where: {
          questionnaireId: id,
        },
      });

      await prisma.City.deleteMany({
        where: {
          questionnaireId: id,
        },
      });

      await prisma.College.delete({
        where: {
          questionnaireId: id,
        },
      });

      await prisma.University.delete({
        where: {
          questionnaireId: id,
        },
      });

      await prisma.School.delete({
        where: {
          questionnaireId: id,
        },
      });

      await prisma.Microdictrict.deleteMany({
        where: {
          cityId: city.id,
        },
      });

      const result = await prisma.Questionnaire.delete({
        where: {
          id: id,
        },
      });

      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };

  removeFromUser = async (userId) => {
    const quest = await prisma.Questionnaire.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!quest) {
      return null;
    }

    const id = quest.id;

    const city = await prisma.City.findFirst({
      where: {
        questionnaireId: id,
      },
    });

    await prisma.City.deleteMany({
      where: {
        questionnaireId: id,
      },
    });

    await prisma.College.delete({
      where: {
        questionnaireId: id,
      },
    });

    await prisma.University.delete({
      where: {
        questionnaireId: id,
      },
    });

    await prisma.School.delete({
      where: {
        questionnaireId: id,
      },
    });

    await prisma.Microdictrict.deleteMany({
      where: {
        cityId: city.id,
      },
    });

    const result = await prisma.Questionnaire.delete({
      where: {
        id: id,
      },
    });

    return result;
  };

  edit = async (
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
  ) => {
    const questionnaire = await prisma.Questionnaire.findFirst({
      where: {
        id: id,
      },
    });

    if (questionnaire || role === "admin") {
      await prisma.City.updateMany({
        where: {
          questionnaireId: id,
        },
        data: {
          name: cityName,
        },
      });

      const city = await prisma.City.findFirst({
        where: {
          questionnaireId: id,
        },
      });

      await prisma.College.update({
        where: {
          questionnaireId: id,
        },
        data: {
          name: collegeName,
        },
      });

      await prisma.University.update({
        where: {
          questionnaireId: id,
        },
        data: {
          name: universityName,
        },
      });

      await prisma.School.update({
        where: {
          questionnaireId: id,
        },
        data: {
          name: schoolName,
        },
      });

      await prisma.Microdictrict.updateMany({
        where: {
          cityId: city.id,
        },
        data: {
          name: cityName,
        },
      });

      const result = await prisma.Questionnaire.update({
        where: {
          id: id,
        },
        data: {
          birthDay,
          street,
          flat,
          work,
        },
      });

      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };

  get = async (id, role) => {
    const questionnaire = await prisma.Questionnaire.findFirst({
      where: {
        id: id,
      },
    });

    if (questionnaire || role === "admin") {
      const result = await prisma.Questionnaire.findFirst({
        where: { id: id },
      });
      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };

  getAll = async (role) => {
    if (role === "admin") {
      const result = await prisma.Questionnaire.findMany();
      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };
}

module.exports = new QuestionnaireService();
