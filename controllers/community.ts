import { Response, Request } from 'express';
import ChannelService from '../services/channelService';
import CommunityService from '../services/communityService';

export async function get_channels({community_id}: any, res: Response) {
    const channels = await CommunityService.get_channels(parseInt(community_id))
    res.send(channels)
}