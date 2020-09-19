import { ITask } from "./components/Main";
import { filters } from "./components/Table";

function filterByStr(tasks: ITask[], str: string): ITask[] {
    if (!str) return tasks;

    return tasks.filter((task: ITask) => {
        let isInclude = false;
        if (task.name.includes(str) || (task.id + '').includes(str)) {
            isInclude = true;
        }
        return isInclude;
    });
}

function sortBy(tasks: ITask[], filter: filters, isReverseSort = false): ITask[] {
    switch (filter) {
        case filters.id: {
            if (isReverseSort) {
                return tasks.sort((task1, task2) => {
                    return (+task2[filter]) - (+task1[filter]);
                });
            } else {
                return tasks.sort((task1, task2) => {
                    return (+task1[filter]) - (+task2[filter]);
                });
            }
        }
        case filters.name: {
            if (isReverseSort) {
                return tasks.sort((task1, task2) => {
                    return task2[filter].localeCompare(task1[filter]);
                });
            } else {
                return tasks.sort((task1, task2) => {
                    return task1[filter].localeCompare(task2[filter]);
                });
            }
        }

        case filters.date: {
            if (isReverseSort) {
                return tasks.sort((task1, task2) => {
                    return new Date(task1.date).getTime() - new Date(task2.date).getTime();
                });
            } else {
                return tasks.sort((task1, task2) => {
                    return new Date(task2.date).getTime() - new Date(task1.date).getTime();
                });
            }
        }

        default: return tasks
    }

}


export { filterByStr, sortBy }