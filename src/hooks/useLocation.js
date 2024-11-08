import axios from 'axios';

const useLocation = () => {
    const getmarkers = (date, callback) => {
        axios.post('geolocation/last/date', {
            date: date,
        }).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                callback(data);
            }
        }).catch((err) => {

        });
    }
    const getwaypointsuser = (user, date, callback) => {
        axios.post(`geolocation/user/date`, {
            user: user,
            date: date
        }).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                callback(data);
            }
        }).catch((err) => {

        });
    }
    return {
        getmarkers,
        getwaypointsuser,
    }
}

export default useLocation