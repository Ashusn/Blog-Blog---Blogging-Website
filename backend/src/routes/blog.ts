import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  
  const authHeader = c.req.header("Authorization") || "";
  console.log(authHeader)

  try {
    const token = authHeader.split(" ")[1];
    console.log(token)


    const response = await verify(token, c.env.JWT_SECRET);

    if (response.id) {
      c.set("userId", response.id);
      await next();
    }
  } catch (error) {
    c.status(403);
    return c.json({
      error: "unauthorized/you are not logged in",
      message: error,
    });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("userId");

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({
      message: "The blog was successfully created",
      id: blog.id,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      error: "The blog could not be created",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      message: "The blog was successfully updated",
      id: blog.id,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      error: "The blog could not be updated",
    });
  }
});

//pagination

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json({
      message: "The blog was successfully found",
      blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      error: "The blog could not be found",
    });
  }
});
