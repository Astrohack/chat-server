import { BadRequestError } from "@/lib/errors";
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue } from "zod";

export const grab_params = (req, res, next) => {
    for (const [key, value] of Object.entries(req.params)) {
        req[key] = value
    }
    next()
}
type ZodIssues = Array<ZodIssue & Partial<{expected: string, received: string}>>

const stringifyZodErrors = (errors: ZodIssues): string => {
    return errors.reduce<string>((prev: string, curr) => prev + " " + curr.message + " " + curr.path[0] + " to be " + curr.expected + " but got " + curr.received + ", ", "")
}

export const validate = (schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError)
            next(new BadRequestError(stringifyZodErrors(error.errors as ZodIssues)))
        else 
            next(error);
    }
};