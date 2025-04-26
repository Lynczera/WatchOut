export type ScheduleResponse = {
  schedule: Schedule;
};

export type Schedule = {
    ID: number,
    Game: number,
    Channel: number,
    Starttime: string,
    Endtime: string,
    ID_2: number,
    Time: string,
    Type: string,
    Title: string,
    Team1: number,
    Team2: number,
    Gid: number
};
