import Swal from "sweetalert2";

const useNotification = () => {

    const notification = (type, msg, time = 1500) => {
        if (Notification.permission === "granted") {
            sendnotification(type, msg, time);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    sendnotification(type, msg, time);
                }
            });
        }
    }
    const sendnotification = (type, msg, time) => {
        if (document.visibilityState === "hidden") {
            let img = "/favicon.ico"
            var noti=new Notification("Notificacion", {
                body: msg,
                //icon: img,
            });

        } else {
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                iconColor: 'white',
                customClass: {
                    popup: 'colored-toast',
                    container: 'my-swal',
                },
                showConfirmButton: false,
                timer: time,
                timerProgressBar: true,
            });

            if (type === 'Default') {
                toast.fire({
                    title: msg
                });
            }
            if (type === 'Success') {
                toast.fire({
                    icon: 'success',
                    title: msg
                });
            }
            if (type === 'Error') {
                toast.fire({
                    icon: 'error',
                    title: msg
                });
            }
            if (type === 'Warning') {
                toast.fire({
                    icon: 'warning',
                    title: msg
                });
            }
            if (type === 'Info') {
                toast.fire({
                    icon: 'info',
                    title: msg
                });
            }
        }
    }

    return { notification }
}

export default useNotification