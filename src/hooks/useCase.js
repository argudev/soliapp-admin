import axios from 'axios';
import useNotification from './useNotification';

const useCase = () => {
    const { notification } = useNotification();
    const getcases = (url, callback) => {
        axios.get(url)
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    let data = getdata.data;
                    // notification("Success", "Casos cargados correctamente");                    
                    if (data) {
                        callback(data);
                    }
                }
            })
            .catch((err) => {
                console.log(err);

                notification("Error", "Ha ocurrido un error al cargar los casos");
            });
    }
    const getcase = (id, callback) => {
        axios.get(`cases/get/${id}`)
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    let data = getdata.data;
                    callback(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const getpdf = (idcase) => {
        axios.get(`cases/get/pdf/${idcase}`, {
            responseType: 'arraybuffer', // Especifica el tipo de respuesta como array de bytes
        }).then((res) => {

            const blob = new Blob([res.data], { type: 'application/pdf' }); // Cambia el tipo de contenido según el tipo de archivo
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        }).catch((err) => {
        });
    }
    const getpaymentypes = (callback) => {
        axios.get('payment-types').then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                let pytypesdata = [];
                data.map((value) => {
                    pytypesdata.push({
                        id: value.id,
                        name: value.name,
                        frecuency: value.valid_days,
                    });
                });
                callback(pytypesdata);
            }
        })
            .catch((err) => {
                notification("Error", "Ha ocurrido un error al cargar las frecuencias de pago");
            });
    };
    const getsinriesgo = (idcase) => {
        axios.get(`cases/get/sinriesgo/${idcase}`, {
            responseType: 'arraybuffer', // Especifica el tipo de respuesta como array de bytes
        }).then((res) => {

            const blob = new Blob([res.data], { type: 'application/pdf' }); // Cambia el tipo de contenido según el tipo de archivo
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        }).catch((err) => {
            console.log(err.response);
        });
    }
    const getcredithistory = (idcase) => {
        axios.get(`cases/get/credithistory/${idcase}`, {
            responseType: 'arraybuffer', // Especifica el tipo de respuesta como array de bytes
        }).then((res) => {
            const blob = new Blob([res.data], { type: 'application/pdf' }); // Cambia el tipo de contenido según el tipo de archivo
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        }).catch((err) => {
            console.log(err.response);
        });
    }
    const updatecreditdata = (form, callback) => {
        axios.put(`credit-capacity/update/${form.id}`, {
            payment_type: form.payment,
            amount: form.amount,
            interest_rate: form.tax,
            deadline: form.time,
            quota: form.quota,
        })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    callback();
                }
            })
            .catch((err) => {
                notification("Error", "Ha ocurrido un error al actualizar los datos del caso");
            });
    };
    const updatecreditcommitteedata = (form, callback) => {
        axios.put(`cases/approved/credit/${form.id}`, {
            payment_type: form.payment,
            amount: form.amount,
            interest_rate: form.tax,
            deadline: form.time,
            quota: form.quota,
            approved: true,
        })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err.response);

                notification("Error", "Ha ocurrido un error al actualizar los datos del caso");
            });
    };
    const approvedtoverifiying = (idcase, form, callback) => {
        axios.put(`cases/verifying/${idcase}`, {
            comment: form.comment,
            user: form.user
        })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    notification('Success', 'Caso Aprobado para verificacion');
                    callback();
                }
            })
            .catch((err) => { });
    };
    const approvedtocommittee = (idcase, form, callback) => {
        axios.put(`cases/evaluating/${idcase}`, {
            comment: form.comment
        })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    notification('Success', 'Caso Aprobado para comite');
                    callback()
                }
            })
            .catch((err) => { });
    };
    const approvedcase = (caseid, form, callback) => {
        axios.put(`cases/approved/${caseid}`, {
            comment: form.comment
        })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    updatecreditdata(form, () => {
                        notification('Success', 'Caso Aprobado');
                    });
                    callback();
                }
            })
            .catch((err) => { });
    };
    const approvedcommitteecase = (caseid, form, callback) => {
        axios.put(`cases/approved/${caseid}`, {
            comment: form.comment
        })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    updatecreditcommitteedata(form, () => {
                        notification('Success', 'Caso Aprobado');
                    });
                    callback();
                }
            })
            .catch((err) => { });
    };
    const deniedcase = (caseid, form, callback) => {
        let put = axios
            .put(`cases/denied/${caseid}`, {
                comment: form.comment
            })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    notification('Success', 'Caso Denegado');
                    callback();
                }
            })
            .catch((err) => { });
    };
    const updatecommitteecoment = (caseid, msg) => {
        axios.put(`cases/update/${caseid}/comment/commnittee`, {
            comment: msg
        })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    notification('Success', 'Comentario Actualizado');
                }
            })
            .catch((err) => {
                console.log(err);

                notification("Error", "Ha ocurrido un error al actualizar el comentario");
            });
    }
    const updateverifiyingcoment = (caseid, msg) => {
        axios.put(`cases/update/${caseid}/comment/verifiying`, {
            comment: msg
        })
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    notification('Success', 'Comentario Actualizado');
                }
            })
            .catch((err) => {
                console.log(err);

                notification("Error", "Ha ocurrido un error al actualizar el comentario");
            });
    }
    const casetyped = (id, callback) => {
        axios.delete(`to-write/destroy/${id}`)
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    notification("Success", "Caso digitado");
                    callback();
                }
            })
            .catch((err) => { });
    };
    const storesinriesgo = (caseid, file) => {
        const formData = new FormData();
        formData.append('image', file);
        axios.post(`cases/store/sinriesgo/${caseid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                notification('Success', 'Sinriesgo Actualizada');
            }
        }).catch((err) => {
            notification('Error', 'Error al cargar la sinriesgo');
        });
    }
    const storecredithistory = (caseid, file) => {
        const formData = new FormData();
        formData.append('history', file);
        axios.post(`cases/store/credithistory/${caseid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                notification('Success', 'Historial de credito Actualizado');
            }
        }).catch((err) => {
            notification('Error', 'Error al cargar el historial de credito');
        });
    }
    const getprospect = (form, callback) => {
        axios.post('prospections/filter', {
            branch: form.branch,
            user: form.user,
            datestart: form.datestart,
            dateend: form.dateend
        }).then((res) => {
            let getdata = res.data;
            if (getdata.success) {
                let data = getdata.data;
                callback(data);
            }
        })
            .catch((err) => { });
    }
    return {
        getcases,
        getcase,
        getpdf,
        getsinriesgo,
        getcredithistory,
        updatecreditdata,
        approvedcase,
        approvedcommitteecase,
        approvedtoverifiying,
        approvedtocommittee,
        deniedcase,
        updatecommitteecoment,
        updateverifiyingcoment,
        getpaymentypes,
        casetyped,
        storesinriesgo,
        storecredithistory,
        getprospect,
    }
}

export default useCase