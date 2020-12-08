function middlewarePipeline(context, middleware) {
  const nextMiddleware = middleware[0]
  const restMiddleware = middleware.slice(1)

  if (!nextMiddleware) {
    return context.next
  }

  return nextRoute => {
    if (nextRoute !== undefined) {
      context.next(nextRoute)
    } else {
      const nextPipeline = middlewarePipeline(context, restMiddleware)
      nextMiddleware({ ...context, next: nextPipeline })
    }
  }
}

export default middlewarePipeline
