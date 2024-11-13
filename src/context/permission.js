import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto de permisos
const PermissionsContext = createContext();

// Proveedor de permisos
export const PermissionsProvider = ({ children }) => {
    const [permissions, setPermissions] = useState([]);
    const [userdata, setUserdata] = useState({});

    const updatePermissions = (newPermissions) => {

        setPermissions(newPermissions);
    };
    const updateUserData = (newuser) => {
        if (newuser.restrictions.length >= 1) {
            localStorage.setItem('user_credit_restriction', JSON.stringify(newuser.restrictions[0].restrictions));
        } else {
            localStorage.setItem('user_credit_restriction', null);
        }
        localStorage.setItem('user_level', newuser.role_name);
        setUserdata(newuser);
    };
    const getpermissions = () => {
        if (localStorage.getItem('soliapp_Access_key')) {
            axios.post(`permissions/get/user`)
                .then((res) => {
                    let getdata = res.data;
                    if (getdata.success) {
                        let data = getdata.data;
                        let permissions = [];
                        data.map((value) => {
                            permissions.push({ "module": value.permission.module.name, "permission": value.permission.name })
                        });
                        const agrupadoPorModulo = permissions.reduce((acumulador, item) => {
                            if (acumulador[item.module]) {
                                if (!acumulador[item.module].includes(item.permission)) {
                                    acumulador[item.module].push(item.permission);
                                }
                            } else {
                                acumulador[item.module] = [item.permission];
                            }
                            return acumulador;
                        }, {});
                        const resultado = Object.keys(agrupadoPorModulo).map(modulo => ({
                            module: modulo,
                            permissions: agrupadoPorModulo[modulo]
                        }));
                        updatePermissions(resultado);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    const getuserdata = () => {
        if (localStorage.getItem('soliapp_Access_key')) {
            axios.post(`user/get/me`).then((res) => {
                let getdata = res.data;
                if (getdata) {
                    let data = getdata.data;
                    updateUserData(data);
                }
            })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    useEffect(() => {
        getuserdata();
        getpermissions();
    }, []);


    return (
        <PermissionsContext.Provider value={{ permissions, userdata, updatePermissions }}>
            {children}
        </PermissionsContext.Provider>
    );
};

// Hook para usar el contexto de permisos en cualquier componente
export const usePermissions = () => {
    return useContext(PermissionsContext);
};
