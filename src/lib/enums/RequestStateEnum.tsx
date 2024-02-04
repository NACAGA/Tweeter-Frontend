export enum RequestStateEnum {
    'None' = 0,
    'InProgess' = 1,
    'Success' = 2,
    'Failure' = 3,
}

export type RequestState = keyof typeof RequestStateEnum;
