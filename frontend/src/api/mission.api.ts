import api from './axios';

export const missionApi = {
    getAll() {
        return api.get('/missions');
    },

    complete(missionId: string) {
        return api.post('/missions/complete', { missionId });
    },
};