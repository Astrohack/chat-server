const HttpStatusCodes = {
    "BAD_REQUEST": 400,
    "UNAUTHORIZED": 401,
    "FORBIDDEN": 403,
    "NOT_FOUND": 404,
    "CONFLICT": 409,
    "INTERNAL_SERVER": 500
}

export const Levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

export interface BaseError {
    httpCode: string
    level: number
}

export class BaseError extends Error implements BaseError {
    constructor(name, httpCode, description, level = Levels.debug) {
        super(description)
        this.name = name;
        this.httpCode = httpCode;
        this.level = level;
        Error.captureStackTrace(this);
    }
}

/**
 * Internal server error pattern
 */
export class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCodes.INTERNAL_SERVER, description = "internal server error") {
        super(name, httpCode, description, Levels.http)
    }
}

/**
 * Http 404 - NOT_FOUND error pattern
 */
export class NotFoundError extends BaseError {
    constructor(description = 'not found') {
        super('NOT_FOUND', HttpStatusCodes.NOT_FOUND, description, Levels.http)
    }
}

/**
 * Http 409 - CONFLICT error pattern
 */
export class ConflictError extends BaseError {
    constructor(description = 'not found') {
        super('CONFLICT', HttpStatusCodes.CONFLICT, description, Levels.http)
    }
}

/**
 * Http 401 - UNAUTHORIZED error pattern
 */
export class UnauthorizedError extends BaseError {
    constructor(description = 'not found') {
        super('UNAUTHORIZED', HttpStatusCodes.UNAUTHORIZED, description, Levels.http)
    }
}

/**
 * Http 400 - BAD_REQUEST error pattern
 */
export class BadRequestError extends BaseError {
    constructor(description = 'bad request') {
        super('BAD_REQUEST', HttpStatusCodes.BAD_REQUEST, description, Levels.http)
    }
}

/**
 * Http 400 - FORBIDDEN error pattern
 */
export class ForbiddenError extends BaseError {
    constructor(description = 'bad request') {
        super('FORBIDDEN', HttpStatusCodes.FORBIDDEN, description, Levels.http)
    }
}

export class DatabaseError extends BaseError {
    constructor(description) {
        super('DATABASE', HttpStatusCodes.BAD_REQUEST, description, Levels.warn)
    }
}

export class DatabaseObjectNotFoundException extends Error {
    constructor(description) {
        super(description)
    }
}

export class DuplicateError extends BaseError {
    constructor(description) {
        super('DATABASE_DUPLICATE', HttpStatusCodes.CONFLICT, description, Levels.debug)
    }
}

