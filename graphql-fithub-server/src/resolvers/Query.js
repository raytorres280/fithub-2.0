const { getUserId } = require('../utils')

const Query = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

  logsByUserId(parent, { id }, ctx, info) {
    let logs = ctx.db.query.logs({
      where: {
        user: {
          id
        }
      },
      orderBy: 'createdAt_DESC'
    }, info)
    return logs
    // if(logs[0].createdAt)
  },
  
  logs(parent, args, ctx, info) {
    return ctx.db.query.logs({}, info)
  },

  meals(parent, params, ctx, info) {
    return ctx.db.query.meals({}, info)
  }
}

module.exports = { Query }
