import { describe } from "@jest/globals";
import * as accountModel from "@/models/account";
import db from "@/database";


describe('database basic interaction', () => {
    it('create table', async () => {
        expect(await db.query(`
            CREATE TABLE IF NOT EXISTS test_table (
                    a   int not null,
                    b   varchar(30) not null)
            `)).toBeTruthy();
        
    })
    it('insert to table', async () => {
        await db.query("INSERT INTO test_table VALUES(123, 'abcd')");
    })
    it('select from table', async () => {
        const res = await db.query_first("SELECT a, b FROM test_table");
        expect(res).toMatchObject({ a: 123, b: 'abcd' })
    })

    it('delete table', async () => {
        expect(await db.query("DROP TABLE test_table")).toBeTruthy();
    })
});