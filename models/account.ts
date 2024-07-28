import database from '@/database'
import { User, UserDTO, UserEditOptions } from "../lib/types"


export default {
    exists(user_id: number) {
        return database.query_first
        ('SELECT EXISTS(SELECT 1 FROM users WHERE id=$1)', [user_id]);
    },
    exists_email(email: string) {
        return database.query_first<{ exists: boolean }>
        ('SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)', [email]).then((e) => e.exists);
    },
    get_password_by_email(email: string) {
        return database.query_first<{ id: number, hash: string }>
        ('SELECT id, password as hash FROM users WHERE email = $1 LIMIT 1', [email])
    },
    get_password_by_username(username: string) {
        return database.query_first<{ id: number, hash: string }>
        ('SELECT id, password as hash FROM users WHERE username = $1 LIMIT 1', [username])
    },
    get_password_by_id(user_id: string) {
        return database.query_first<{ id: number, hash: string }>('SELECT password as hash FROM users WHERE id = $1 LIMIT 1', [user_id])
    },
    avatar(user_id: number) {
        return database.query_first<{ avatar: string }>('SELECT avatar FROM users WHERE id=$1 LIMIT 1', [user_id])
    },
    profile(user_id: string) {
        return database.query_first<User>('SELECT id, username, avatar FROM users WHERE id=$1 LIMIT 1', [parseInt(user_id)])
    },
    create(user_id: string, email: string, username: string, passwd: string): Promise<void> {
        return database.execute('INSERT INTO users(id, username, email, avatar, password) VALUES($1, $2, $3, DEFAULT, $4)', [parseInt(user_id), username, email, passwd])
    },
    set_avatar(user_id: string, avatar: string) {
        return database.execute("UPDATE users SET avatar = $1 WHERE id = $2", [avatar, user_id])
    },
    delete(user_id: string) {
        return database.query<void>("DELETE FROM users WHERE id = $1", [user_id])
    },
    delete_by_email(email: string) {
        return database.query("DELETE FROM users WHERE email = $1", [email])
    },
    change_password(user_id: string, newPassword: string) {
        return database.query("UPDATE users SET password = $1 WHERE id = $2", [newPassword, user_id])
    },
    edit(user_id: string, { username }: UserEditOptions) {
        var sql = "UPDATE users SET ", params = [] as Array<string>, iterator = 1;

        if (username) {
            sql += `username = $${iterator++} `;
            params.push(username);
        };

        sql += `WHERE id = ${user_id}`;
        return database.query(sql, params);
    },
}

export async function init_user_schema() {
    return database.execute(`
        CREATE TABLE IF NOT EXISTS users
        (
            id  bigserial NOT NULL,
            username VARCHAR(30) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(100) NOT NULL,
            avatar VARCHAR(30) DEFAULT 'default_avatar.png' NOT NULL
        )
    `)
}
