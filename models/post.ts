import query from "@/database"
import { Attachment, PostDataObject } from "@/lib/types";
/*
type PostProps = {
    community_id: number;
    amount: number;
    tags: Array<number>;
};

export default {
    get_posts({community_id, amount = 10, tags = []}: PostProps): Promise<PostDataObject[]> {
        const deps: any[] = [], where: string[] = [];
        var base_sql = 'SELECT posts.id, author_id, community_id, content, has_attachment, created FROM posts';
        if (tags.length) {
            base_sql += ' JOIN post_tags pt ON pt.post_id=posts.id';            
        }
        if (community_id) where.push(` community_id=${community_id}`);
        if (tags.length) {
            where.push('pt.tag_id IN (?)')
            deps.push(tags)
        }
        
        if (where.length) base_sql += ' WHERE ' + where.reduce((mem, val) => mem += ' AND ' + val)

        if(tags.length) {
            base_sql += ' GROUP BY pt.post_id HAVING COUNT(pt.post_id)=?';
            deps.push(tags.length)
        }

        base_sql += ' ORDER BY posts.id DESC LIMIT ' + amount;
        return query(base_sql, deps);
    },    

    create_post(author_id, community_id, content, has_attachment): Promise<{insertId: number}> {
        return query('INSERT INTO posts(author_id, community_id, content, has_attachment) VALUES (?)', [[author_id, community_id, content, has_attachment]]);
    },

    create_attachments(post_id, attachments: Array<Attachment>): Promise<void> {
        return query('INSERT INTO attachments(id, filename, size, type, post_id) VALUES ?', [attachments.map(a => [a.id, a.filename, a.size, a.type, post_id])]);
    },

    assign_tags(post_id: number, tags: Array<number>): Promise<void> {
        return query('INSERT INTO post_tags(post_id, tag_id) VALUES ?', [tags.map(tag => [post_id, tag])]);
    },

    get_post(post_id: number): Promise<PostDataObject>  {
        return query('SELECT id, author_id, community_id, content, has_attachment, created FROM posts WHERE id=?', [post_id]);
    },


}*/