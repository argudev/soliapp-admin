import useBroadcast from './useBroadcast';
import useNotification from './useNotification';

const useAlert = () => {
    const { notification } = useNotification();
    const { connectWebSocket_updates, disconnectWebsocket } = useBroadcast();
    const gpsalert = () => {
        connectWebSocket_updates('alerts', 'AlertGPS', (data) => {
            console.log(data);
            notification("Warning", `El usuario ${data.User.name} tiene el GPS desactivado`,2500);
        });
    }
    return { gpsalert }
}

export default useAlert