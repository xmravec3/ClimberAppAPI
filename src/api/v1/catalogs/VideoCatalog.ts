import { Video} from './domains/Video';
import IVideoCatalog from './interfaces/IVideoCatalog';
import Catalog from '../../common/catalogs/Catalog';
import { VideoBasic } from './domains/VideoBasic';
import { VideoInfo } from './domains/VideoInfo';

export default class VideoCatalog extends Catalog implements IVideoCatalog {

    async getByIDVideoInfo(id: number): Promise<VideoInfo> {
        const sql = `
            select v.ID, v.title, v.video_name, v.climber_id, c.\`name\` as climber_name, v.\`date\`, v.attempt, v.\`url\`, v.\`start\`, v.\`end\`, v.\`time\`, v.frames, v.side
            from videos AS v
            inner join climbers AS c on v.climber_id = c.ID
            WHERE v.ID = ?
            order by v.ID asc;
        `.replace(/\s+|\n/g, ' ')

        return this._getOneInfo(this._toVideosInfo(await Catalog.getConnector().query({ query: sql, bindings: [id] })));
    }
    
    async getAllBasic(): Promise<VideoBasic[]> {
        const sql = `
            select videos.ID, videos.title, videos.video_name, climbers.\`name\` as climber_name, videos.climber_id, videos.\`date\`, videos.attempt, videos.\`time\`
            from videos
            inner join climbers on videos.climber_id = climbers.ID
            order by videos.ID asc;
        `.replace(/\s+|\n/g, ' ')

        return this._toVideosBasic(await Catalog.getConnector().query({ query: sql }));
    }

    async getByID(id: number): Promise<Video> {
        const sql = `
            SELECT *
            FROM videos 
            WHERE ID = ?;
        `.replace(/\s+|\n/g, ' ')

        return this._getOne(this._toVideos(await Catalog.getConnector().query({ query: sql, bindings: [id] })));
    }

    async getAll(): Promise<Video[]> { // add option to return climber name
        const sql = `
            select v.ID, v.title, v.video_name, v.climber_id, c.\`name\` as climber_name, v.\`date\`, v.attempt, v.\`url\`, v.\`start\`, v.\`end\`, v.\`time\`, v.frames, v.side, v.skeletons, v.trans_matrixes
            from videos AS v
            inner join climbers AS c on v.climber_id = c.ID
            order by v.ID asc;
        `.replace(/\s+|\n/g, ' ')

        return this._toVideos(await Catalog.getConnector().query({ query: sql }));
    }

    async getAllDates(): Promise<string[]> {
        const sql = `
            select distinct \`date\`
            from videos;
        `.replace(/\s+|\n/g, ' ')

        return this._toString(await Catalog.getConnector().query({ query: sql }));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _toVideos(result: any): Video[] {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result.map((video: any) => video);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _toVideosBasic(result: any): VideoBasic[] {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result.map((videoBasic: any) => videoBasic);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _toVideosInfo(result: any): VideoInfo[] {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result.map((video: any) => video);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _toString(result: any): string[] {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result.map((value: any) => value);
    }

    private _getOne(videos: Video[]): Video {
        if (!videos.length) {
            throw new Error('Video not found!')
        }

        return videos[0];

    }

    private _getOneInfo(videos: VideoInfo[]): VideoInfo {
        if (!videos.length) {
            throw new Error('Video not found!')
        }

        return videos[0];

    }

}