import CommunityDB from '../models/community'


export default {
    get_channels: function(community_id: number){
        return CommunityDB.get_channels(community_id)
    },

    get_by_channel_id: function(channel_id: number) {
        return CommunityDB.get_by_channel_id(channel_id)
    },
    

}