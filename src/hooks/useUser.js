import axios from 'axios';
import useNotification from './useNotification';

const useUser = () => {
    const { notification } = useNotification();
    const getoc = (callback) => {
        axios.post('user/oc').then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                let usrs = [];
                data.map((value) => {
                    usrs.push({
                        id: value.id,
                        name: value.name,
                    });
                });
                callback(usrs);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al cargar los usuarios");
        });
    }
    const getusers = (callback) => {
        axios.get('user').then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                callback(data);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al cargar los usuarios");
        });
    }
    const getsupervisors = (callback) => {
        axios.get('supervisor').then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                callback(data);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al cargar los supervisores");
        });
    }
    const getuser = (id, callback) => {
        axios.get(`user/get/${id}`).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                callback(data);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al cargar el usuario");
        });
    }
    const getuserbranch = (branch, callback) => {
        axios.post('branch-office/users', {
            branch: branch
        })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    let data = getdata.data;
                    let usersdata = [];
                    data.map((value) => {
                        usersdata.push({
                            id: value.id,
                            name: value.name
                        });
                    });
                    callback(usersdata);
                }
            })
            .catch((err) => { });
    };
    const getroles = (callback) => {
        axios.get('roles').then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                let rls = [];
                data.map((value) => {
                    rls.push({
                        id: value.id,
                        name: value.name,
                    });
                });
                callback(rls);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al cargar los roles");
        });
    }
    const getpermissions = (callback) => {
        axios.get('permissions').then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                callback(data);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al los permisos");
        });
    }
    const storeuser = (form, callback) => {
        axios.post('user/store', form).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                notification("Success", "Ususario Agregado");
                callback(data);
            } else {
                notification("Error", "Ha ocurrido un error al agregar al usuario, intente nuevamente.");
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al agregar al usuario, intente nuevamente.");
        });
    }
    const storeuserasign = (form, callback) => {
        axios.post('supervisor/store/oc', form).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                notification("Success", "Oficial Asignado");
                callback(data);
            } else {
                notification("Error", "Ha ocurrido un error al asignar el oficial, intente nuevamente.");
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al asignar el oficial, intente nuevamente.");
        });
    }
    const storeuserpermissions = (user, permissions, callback) => {
        axios.post('permissions/store', {
            user: user,
            permissions: permissions,
        }).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                notification("Success", "Permisos del usuario otorgados");
                callback();
            } else {
                notification("Error", "Ha ocurrido un error al agregar los permisos del ususario");
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al agregar los permisos del ususario");
        });
    }
    const storerestriction = (form, callback) => {
        axios.post('user/restriction/store', form).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                notification("Success", "Restriccion agregada");
                callback(data);
            } else {
                notification("Error", "Ha ocurrido un error al agregar la restriccion de credito, intente nuevamente.");
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al agregar la restriccion de credito, intente nuevamente.");
        });
    }
    const updateuser = (id, form, callback) => {
        axios.put(`user/update/${id}`, form).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                notification("Success", "Ususario Actualizado");
                callback(data);
            } else {
                notification("Error", "Ha ocurrido un error al agregar al usuario, intente nuevamente.");
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al agregar al usuario, intente nuevamente.");
        });
    }
    const updaterestriction = (id,form, callback) => {
        axios.put(`user/restriction/update/${id}`, form).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                notification("Success", "Restriccion actualizada");
                callback(data);
            } else {
                notification("Error", "Ha ocurrido un error al actualizar la restriccion de credito, intente nuevamente.");
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al actualizar la restriccion de credito, intente nuevamente.");
        });
    }
    const deleteocasign = (id, callback) => {
        axios.delete(`supervisor/destroy/${id}`).then((res) => {
            let data = res.data;
            if (data.success) {
                notification("Success", "Se ha quitado la asignacion del oficial");
                callback(data);
            }
        }).catch((err) => {
            notification("Error", "Ha ocurrido un error al agregar quitar la asignacion del oficial, intente nuevamente.");
        });
    }
    return {
        getoc,
        getuser,
        getusers,
        getsupervisors,
        getuserbranch,
        getroles,
        getpermissions,
        storeuser,
        storeuserpermissions,
        storeuserasign,
        storerestriction,
        updateuser,
        updaterestriction,
        deleteocasign,
    }
}

export default useUser