import { Attachment, File } from "@/lib/types"
import PostsDB from "@/models/post"


export default {
    create_post: async function (author_id, community_id, content, attachments: Array<Attachment>, tags: Array<number>): Promise<number> {
        const has_attachments = attachments.length !== 0;
        const { insertId: post_id } = await PostsDB.create_post(author_id, community_id, content, has_attachments)
        if (has_attachments) await PostsDB.create_attachments(post_id, attachments)
        if (tags.length) await PostsDB.assign_tags(post_id, tags)
        return post_id
    },

    get_post: function (post_id: number) {
        return PostsDB.get_post(post_id)
    },

    get_posts: function (community_id: number, amount: number, tags: Array<number>) {
        return PostsDB.get_posts({
            community_id,
            amount,
            tags,
        })
    },
}