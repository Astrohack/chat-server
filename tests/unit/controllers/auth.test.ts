import { describe } from "@jest/globals";
import * as auth from '@/controllers/auth'
import { DatabaseObjectNotFoundException, UnauthorizedError } from "@/lib/errors";
import accountModel from "@/models/account";

describe('auth controller', () => {

    afterAll(done => {
        accountModel.delete_by_email('jdoe@abc123.com').then(() => done());
    })

    it('create account with correct payload', async () => {
        const mockRequest = {
            body: {
                username: 'Doe',
                email: 'jdoe@abc123.com',
                password: 'Abcd1234',
            },
        } as any

        const res = { send: jest.fn(), json: jest.fn() } as any;

        await expect(auth.register(mockRequest, res)).resolves.not.toThrow();

        expect(res.json).toHaveBeenCalled();
    })

    it('login to account with correct creds', async () => {
        const mockRequest = {
            body: {
                email: 'jdoe@abc123.com',
                password: 'Abcd1234',
            },
        } as any
        const res: any = {
            json: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
        await expect(auth.login(mockRequest, res)).resolves.not.toThrow(UnauthorizedError);

        expect(res.json).toHaveBeenCalled()
    })

    it('login to account with wrong creds', async () => {
        const mockRequest = {
            body: {
                email: 'wrong@abc123.com',
                password: 'wrong',
            },
        } as any
        const res: any = {
            json: jest.fn(),
            status: jest.fn(),
        };
        await expect(auth.login(mockRequest, res)).rejects.toThrow(DatabaseObjectNotFoundException);

        expect(res.status).not.toHaveBeenCalled()
    })



});