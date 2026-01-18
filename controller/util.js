import { Op } from "sequelize";
import { Task } from "../model/Task.js";

export const authorizationUtil = ( permissionArr, role ) => {
    if(permissionArr.includes( role )){
        return true;
    }else{
        throw new Error("Unauthorized", 403);
    }
}

export const updateFailedTasks = async () => {
    await Task.update({ status_id: 4 }, { where: { 
            due_date: { 
                [Op.lte]: new Date()
            },
            status_id: {
                [Op.in]: [1, 2]
            }
        } 
    });
}