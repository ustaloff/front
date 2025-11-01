import {ref} from 'vue';

export function useUserLogs() {
    const logs = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchUserLogs = async () => {
        loading.value = true;
        error.value = null;
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            logs.value = [
                {id: 1, user_id: 1, action: 'Logged in', created_at: '2025-10-26 10:00:00'},
                {id: 2, user_id: 2, action: 'Updated profile', created_at: '2025-10-26 10:05:00'},
                {id: 3, user_id: 1, action: 'Logged out', created_at: '2025-10-26 10:10:00'},
            ];
        } catch (e) {
            error.value = 'Failed to fetch user logs.';
            1
        } finally {
            loading.value = false;
        }
    };

    return {
        logs,
        loading,
        error,
        fetchUserLogs,
    };
}
