import { Channel } from '@/lib/types';
import query from '../database/database';

export default {
    get_features() {
        throw new Error('unimplemented');
    },

    get_channels(community_id: number): Promise<Channel[]> {
        return query('SELECT id, name FROM channels WHERE community_id=?', [community_id]);
    },

    get_by_channel_id(channel_id: number): Promise<number> {
        return query('SELECT community_id FROM channels WHERE id=?', [channel_id]).then(res => res[0]?.community_id)
    }
}