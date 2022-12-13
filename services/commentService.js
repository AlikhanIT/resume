const prisma = require("../prisma/index");
const apiError = require("../errors/apiError");

class commentService {
  create = async (comment, role, taskId) => {
    const result = await prisma.Comment.create({
      data: {
        comment,
        taskId,
        userIds: role.id,
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

    if (task || role.role === "admin") {
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

    const iLink = imageId.map((item) => {
      return { link: item };
    });

    if (task || role.role === "admin") {
      const result = await prisma.Task.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          date_end: new Date(date_end),
          fileId: { create: { link: fileId } },
          imageId: { createMany: { data: iLink } },
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

    if (task || role.role === "admin") {
      const result = await prisma.Task.findFirst({
        where: { id: id },
        include: {
          fileId: true,
          imageId: true,
          user: { select: { email: true, id: true } },
        },
      });
      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };

  getAll = async (role) => {
    if (role.role === "admin") {
      const result = await prisma.Task.findMany({
        include: {
          imageId: true,
        },
      });
      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };

  getMyTasks = async (role) => {
    console.log("role", role.id);
    if (role.role) {
      const result = await prisma.Task.findMany({
        where: {
          userIds: {
            has: "637b3cff36a96a04536914c0",
          },
        },
        include: {
          imageId: true,
        },
      });
      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };
}

module.exports = new commentService();
