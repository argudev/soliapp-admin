import axios from 'axios';
import useNotification from './useNotification';

const useClient = () => {
    const { notification } = useNotification();

    const getclients = (callback) => {
        axios.get('customers').then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                callback(getdata.data);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al cargar los clientes");
        });
    }
    const getclientbydoc = (callback, doc) => {
        axios.get(`customers/get/by/document/${doc}`).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                callback(getdata.data);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al cargar el cliente");
        });
    }
    const getclientbyname = (callback, name) => {
        axios.get(`customers/get/by/name/${name}`).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                callback(getdata.data);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al cargar los clientes");
        });
    }
    return {
        getclients,
        getclientbydoc,
        getclientbyname
    }
}

export default useClient