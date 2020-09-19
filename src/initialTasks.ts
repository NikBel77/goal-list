import { ITask } from './components/Main'

export const initialTasks: ITask[] = [
    { id: 1, date: new Date('09 01 1919').toString(), name: 'join NSDAP', uid: 1 },
    { id: 2, date: new Date('07 01 1933').toString(), name: 'Seize Power', uid: 2 },
    { id: 3, date: new Date('03 13 1938').toString(), name: 'Anschluss of Austria', uid: 3 },
    { id: 4, date: new Date('09 01 1939').toString(), name: 'Operation "Canned food"', uid: 4 },
    { id: 5, date: new Date('06 01 1940').toString(), name: 'Take Paris', uid: 5 },
    { id: 6, date: new Date('06 22 1941').toString(), name: 'Blitzkrieg', uid: 6 },
];
