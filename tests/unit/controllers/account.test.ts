import { describe } from "@jest/globals";
import * as account from "@/controllers/account";
import { account as account_service } from "@/services";
import { generate_id } from "@/lib/helper";

const test_user = {
    username: 'Doe',
    email: 'jdoe@abc123.com',
    password: 'Abcd1234',
    avatar: "abcd1234"
};
const test_user_id = generate_id();

describe('account controller', () => {
    beforeAll(done => {
        account_service.create(test_user_id, test_user.email, test_user.username, test_user.password).then(() => done());
    });

    afterAll(done => {
        account_service.destroy(test_user_id).then(() => done());
    });

    it('fetch profile', async () => {
        const mockRequest = {
            user_id: test_user_id
        } as any

        const res = { send: jest.fn() } as any;

        await expect(account.profile(mockRequest, res)).resolves.not.toThrow();

        expect(res.send).toHaveBeenCalled();
    })

    it('set avatar', async () => {
        const test_base64_image = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAHklEQVR4nGJJOnyVgRTARJLqUQ2jGoaUBkAAAAD//0bTAh2YLKojAAAAAElFTkSuQmCC"
        const mockRequest = {
            user_id: test_user_id,
            file: {
                originalname: "test_avatar",
                buffer: Buffer.from(test_base64_image, 'base64')
            }
        } as any

        const res = { send: jest.fn() } as any;

        await expect(account.set_avatar(mockRequest, res)).resolves.not.toThrow();

        expect(res.send).toHaveBeenCalled();
    })

    it('edit username', async () => {
        const mockRequest = {
            user_id: test_user_id,
            body: {
                settings: {
                    username: "malphite"
                }
            }
        } as any

        const res = { send: jest.fn() } as any;

        await expect(account.edit(mockRequest, res)).resolves.not.toThrow();

        const { username } = await account_service.profile(test_user_id)

        expect(username).toBe("malphite")

        expect(res.send).toHaveBeenCalled();
    })
});
