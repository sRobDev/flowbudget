const { PrismaClient } = require('@prisma/client');
const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('@koa/router')();
const cors = require('@koa/cors');
const app = module.exports = new Koa();
const prisma = new PrismaClient();

app.use(koaBody());
app.use(cors());

// USERS

router.get('/users/:userId', getUser)
  .post('/users/new', createUser)
  .post('/users/:userId/update', updateUser);

async function getUser(ctx) {
  ctx.body = await prisma.user.findUnique({ where: { id: +ctx.params.userId } });
}

async function createUser(ctx) {
  ctx.body = await prisma.user.create({ data: ctx.request.body });
}

async function updateUser(ctx) {
  ctx.body = await prisma.user.update({
    where: {
      id: parseInt(ctx.params.userId)
    },
    data: ctx.request.body
  });
}

// END USERS

// CATEGORIES

router.get('/categories', getAllCategories)
  .get('/categories/:categoryId', getCategory)
  .post('/categories/new', createCategory)
  .post('/categories/:categoryId/update', updateCategory);

async function getAllCategories(ctx) {
  ctx.body = await prisma.category.findMany({ where: { authorId: +ctx.request.body.authorId }});
}

async function getCategory(ctx) {
  ctx.body = await prisma.category.findUnique({ where: { id: +ctx.params.categoryId } });
}

async function createCategory(ctx) {
  const {id: authorId, ...rest} = ctx.request.body;

  ctx.body = await prisma.category.create({ data: {rest, parseInt(authorId) } });
}

async function updateCategory(ctx) {
  ctx.request.body.authorId = +ctx.request.body.authorId;
  ctx.body = await prisma.category.update({
    where: {
      id: parseInt(ctx.params.categoryId)
    },
    data: { ...ctx.request.body }
  });
}

// END CATEGORIES

// TRANSACTIONS
router.get('/transactions', getAllTransactions)
  .get('/transactions/:transactionId', getTransaction)
  .post('/transactions/new', createTransaction)
  .post('/transactions/:transactionId/update', updateTransaction);

async function getAllTransactions(ctx) {
  ctx.body = await prisma.transaction.findMany({ where: { authorId: +ctx.request.body.authorId }});
}

async function getTransaction(ctx) {
  ctx.body = await prisma.transaction.findUnique({ where: { id: +ctx.params.transactionId } });
}

async function createTransaction(ctx) {
  const {id: authorId, ...rest} = ctx.request.body;

  ctx.body = await prisma.transaction.create({ data: {rest, parseInt(authorId) } });
}

async function updateTransaction(ctx) {
  ctx.request.body.categoryId = +ctx.request.body.categoryId;
  ctx.body = await prisma.transaction.update({
    where: {
      id: parseInt(ctx.params.transactionId)
    },
    data: { ...ctx.request.body }
  });
}

// END TRANSACTIONS