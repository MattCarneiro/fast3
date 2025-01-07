import Fastify from 'fastify'
    import helmet from 'fastify-helmet'
    import compress from 'fastify-compress'
    import rateLimit from 'fastify-rate-limit'

    const fastify = Fastify({
      logger: true,
      disableRequestLogging: true,
      ignoreTrailingSlash: true
    })

    // Security headers
    fastify.register(helmet)

    // Compression
    fastify.register(compress, { global: true })

    // Rate limiting
    fastify.register(rateLimit, {
      max: 100,
      timeWindow: '1 minute'
    })

    // Health check endpoint
    fastify.get('/health', async () => {
      return { status: 'ok' }
    })

    // Sample API endpoint
    fastify.get('/api/data', async (request) => {
      return {
        timestamp: Date.now(),
        message: 'Fastify is fast!',
        params: request.query
      }
    })

    // Start server
    const start = async () => {
      try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' })
        console.log(`Server listening on ${fastify.server.address().port}`)
      } catch (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    }

    start()
