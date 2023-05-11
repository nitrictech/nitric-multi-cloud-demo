export const nameCloud = (fallback: string = 'unknown') => async (ctx, next) => {
    ctx.res.headers['cloud'] = [fallback];

    // write header for the cloud I'm hosted in
    if (process.env['AWS_LAMBDA_FUNCTION_NAME']) {
        ctx.res.headers['cloud'] = ['aws'];
    } else if (process.env['K_SERVICE']) {
        ctx.res.headers['cloud'] = ['gcp'];
    }

    return next(ctx);
}