export const committeecolumns =[
    {
        name: 'ID',
        selector: (row) => row.id,
        omit:true
    },
    {
        name: 'Tipo',
        selector: (row) => row.type,
        sortable: true,
    },
    {
        name: 'Cliente',
        selector: (row) => row.customer,
        sortable: true,
    },
    {
        name: 'Departamento',
        selector: (row) => row.department
    },
    {
        name: 'Documento',
        selector: (row) => row.doc
    },

    {
        name: 'Foto Documento',
        selector: (row) => row.docimg
    },
    {
        name: 'Monto Solicitado',
        selector: (row) => row.amount,
    },
    {
        name: 'Ingreso a Comitte',
        selector: (row) => row.datecommitte,
    },
    {
        name: 'Fecha de solicitud',
        selector: (row) => row.date
    },
    {
        name: '',
        selector: (row) => row.options
    }
];
export const precommitteecolumns =[
    {
        name: 'ID',
        selector: (row) => row.id,
        omit:true
    },
    {
        name: 'Tipo',
        selector: (row) => row.type,
        sortable: true,
    },
    {
        name: 'Cliente',
        selector: (row) => row.customer,
        sortable: true,
    },
    {
        name: 'Departamento',
        selector: (row) => row.department
    },
    {
        name: 'Documento',
        selector: (row) => row.doc
    },

    {
        name: 'Foto Documento',
        selector: (row) => row.docimg
    },
    {
        name: 'Monto Solicitado',
        selector: (row) => row.amount,
    },
    {
        name: 'Ingreso a Precomite',
        selector: (row) => row.dateprecommittee,
    },
    {
        name: 'Fecha de solicitud',
        selector: (row) => row.date
    },
    {
        name: '',
        selector: (row) => row.options
    }
];
export const verifiyingcolumns =[
    {
        name: 'ID',
        selector: (row) => row.id,
        omit:true
    },
    {
        name: 'Tipo',
        selector: (row) => row.type,
        sortable: true,
    },
    {
        name: 'Cliente',
        selector: (row) => row.customer,
        sortable: true,
    },
    {
        name: 'Departamento',
        selector: (row) => row.department
    },
    {
        name: 'Documento',
        selector: (row) => row.doc
    },

    {
        name: 'Foto Documento',
        selector: (row) => row.docimg
    },
    {
        name: 'Monto Solicitado',
        selector: (row) => row.amount,
    },
    {
        name: 'Ingreso a Verificacion',
        selector: (row) => row.datecommitte,
    },
    {
        name: 'Fecha de solicitud',
        selector: (row) => row.date
    },
    {
        name: '',
        selector: (row) => row.options
    }
];
export const writercolumns =[
    {
        name: 'ID',
        selector: (row) => row.id,
        omit:true
    },
    {
        name: 'Tipo',
        selector: (row) => row.type,
        sortable: true,
    },
    {
        name: 'Cliente',
        selector: (row) => row.customer,
        sortable: true,
    },
    {
        name: 'Departamento',
        selector: (row) => row.department
    },
    {
        name: 'Documento',
        selector: (row) => row.doc
    },

    {
        name: 'Foto Documento',
        selector: (row) => row.docimg
    },
    {
        name: 'Monto Solicitado',
        selector: (row) => row.amount,
    },
    {
        name: 'Ingreso a Digitacion',
        selector: (row) => row.datecommitte,
    },
    {
        name: 'Fecha de solicitud',
        selector: (row) => row.date
    },
    {
        name: '',
        selector: (row) => row.options
    }
];
export const approveddeniedcolumns =[
    {
        name: 'ID',
        selector: (row) => row.id,
        omit:true
    },
    {
        name: 'Tipo',
        selector: (row) => row.type,
        sortable: true,
    },
    {
        name: 'Cliente',
        selector: (row) => row.customer,
        sortable: true,
    },
    {
        name: 'Departamento',
        selector: (row) => row.department
    },
    {
        name: 'Documento',
        selector: (row) => row.doc
    },

    {
        name: 'Foto Documento',
        selector: (row) => row.docimg
    },
    {
        name: 'Monto Solicitado',
        selector: (row) => row.amount,
    },
    {
        name: 'Ultima Gestion',
        selector: (row) => row.datecase,
    },
    {
        name: 'Fecha de solicitud',
        selector: (row) => row.date
    },
    {
        name: '',
        selector: (row) => row.options
    }
];
export const userscolumns =[
    {
        name: 'ID',
        selector: (row) => row.id,
        omit:true
    },
    {
        name: 'Rol',
        selector: (row) => row.role_name,
        sortable: true,
    },
    {
        name: 'Nombre',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Sucursal',
        selector: (row) => row.branchoffice_name,
        sortable: true,
    },
    {
        name: '',
        selector: (row) => row.options
    }
];
export const photoscolumns =[
    {
        name: 'Nombre',
        selector: (row) => row.name,
        sortable: false,
    },
    {
        name: 'Foto',
        selector: (row) => row.image,
        sortable: false,
    },
];
export const clientscolumns =[
    {
        name: 'Nombre',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: ' ',
        selector: (row) => row.options,
        sortable: false,
    },
];
export const prospectionscolumns =[
    {
        name: 'ID',
        selector: (row) => row.id,
        omit:true
    },
    {
        name: 'Nombre',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Telefono',
        selector: (row) => row.phone,
        sortable: true,
    },
    {
        name: 'Direccion',
        selector: (row) => row.address,
        sortable: false,
    },
    {
        name: 'Fecha',
        selector: (row) => row.date,
        sortable: false,
    },
];
export const supervisorcolumns =[
    {
        name: 'ID',
        selector: (row) => row.id,
        omit:true
    },
    {
        name: 'Nombre',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Sucursal',
        selector: (row) => row.branchoffice_name,
        sortable: true,
    },
    {
        name: '',
        selector: (row) => row.options
    }
];
export const occolumns =[
    {
        name: 'ID',
        selector: (row) => row.id,
        omit:true
    },
    {
        name: 'Nombre',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: '',
        selector: (row) => row.options
    }
];
export const clientscasecolumns =[
    {
        name: 'Nombre',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: ' ',
        selector: (row) => row.options,
        sortable: false,
    },
];