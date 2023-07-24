export default interface INominationLike {
    id: number,
    preferredWatchType: string,
    preferredWatchDate: Date,
    userId: number,
    enabled: boolean,
    username: string
}