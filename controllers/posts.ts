import PostsService from '@/services/postService';

export async function get_posts({
        body: {
            q,
            amount,
            last,
            sort,
            tags,
            tags_excluded
        },
        community_id,
    }, res) {
        const tag_list = tags?.trim().split(',').map(tag => parseInt(tag));
        const posts = await PostsService.get_posts(community_id, amount, tag_list)
        res.send(posts) 
}

export async function create_post({
    body: {
        content,
        tags
    },
    files,
    user_id,
    community_id,
}, res) {
    tags = tags.split(',').reduce((out: number[], tag: string) => {
        var parsed = parseInt(tag)
        if (!isNaN(parsed)) out.push(parsed)
        return out
    }, []);
    const post_id = await PostsService.create_post(user_id, community_id, content, files, tags);
    const post = PostsService.get_post(post_id);
    res.send();
}