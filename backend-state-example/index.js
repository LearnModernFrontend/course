const Koa = require('koa');
const app = new Koa();
const template = require('art-template');

const todos = [
  {content: 'swim' },
  {content: 'basketball' },
  {content: 'football' }
]


app.use(async ctx => {
  const query = { ...ctx.request.query }

  if (Object.keys(query).length) {

    const completedKeys = []

    Object.entries(query).forEach(([queryKey, queryValue]) => {
      if (queryKey === 'newTodo' && queryValue.trim()) {
        todos.push({ content: queryValue })
        delete query.newTodo
      } else if (/^complete\./.test(queryKey)) {
        const key = parseInt(queryKey.split('.')[1], 10)
        completedKeys.push(key)
      }
    })

    todos.forEach((todo, key) => {
      todo.completed = completedKeys.includes(key)
    })

    ctx.response.redirect('/')
    return
  }







  ctx.body = template(__dirname + '/todoMVC.html', {
    todos
  });
});

app.listen(3000);
