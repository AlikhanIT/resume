const prisma = require("../prisma/index");
const apiError = require("../errors/apiError");

class TaskService {
  create = async (title, description, date_end, fileId, imageId, userIds) => {
    const result = await prisma.Task.create({
      data: {
        title,
        description,
        date_end: new Date(),
        fileId: { create: { link: fileId } },
        imageId: { create: { link: imageId } },
        userIds,
      },
    });

    return result;
  };

  remove = async (id, role) => {
    const task = await prisma.Task.findFirst({
      where: {
        id: id,
      },
    });

    if (task || role === "admin") {
      await prisma.Image.deleteMany({
        where: {
          taskId: id,
        },
      });

      await prisma.File.deleteMany({
        where: {
          taskId: id,
        },
      });

      const result = await prisma.Task.delete({
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
    const task = await prisma.Task.findMany({
      where: {
        userIds: {
          equals: `${userId}`,
        },
      },
    });

    if (!task) {
      return null;
    }

    const id = task.id;

    await prisma.Image.deleteMany({
      where: {
        taskId: id,
      },
    });

    await prisma.File.deleteMany({
      where: {
        taskId: id,
      },
    });

    const result = await prisma.Task.deleteMany({
      where: {
        id: id,
      },
    });

    return result;
  };

  edit = async (
    id,
    title,
    description,
    date_end,
    fileId,
    imageId,
    userIds,
    role
  ) => {
    const task = await prisma.Task.findFirst({
      where: {
        id: id,
      },
    });

    if (task || role === "admin") {
      const result = await prisma.Task.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          date_end: new Date(),
          fileId: { create: { link: fileId } },
          imageId: { create: { link: imageId } },
          userIds,
        },
      });

      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };

  get = async (id, role) => {
    const task = await prisma.Task.findFirst({
      where: {
        id: id,
      },
    });

    if (task || role === "admin") {
      const result = await prisma.Task.findFirst({ where: { id: id } });
      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };

  getAll = async (role) => {
    if (role === "admin") {
      const result = await prisma.Task.findMany({});
      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };
}

module.exports = new TaskService();
