import axios from 'axios';
import useNotification from './useNotification';

const useBranchOffice = () => {
    const { notification } = useNotification();

    const getbranchoffices = (callback) => {
        axios.get('branch-office').then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                let branchdata = [];
                data.map((value) => {
                    branchdata.push({
                        id: value.id,
                        name: value.name
                    });
                });
                callback(branchdata);
            }
        })
            .catch((err) => {
                notification("Error", "Ha ocurrido un error al cargar las sucursales");
            });
    }
    return {
        getbranchoffices
    }
}

export default useBranchOffice