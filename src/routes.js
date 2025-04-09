
import Index from "views/Index.js";
import Login from "views/auth/Login";
import Prospecting from "views/prospecting";
import Committee from "views/committee";
import Precommittee from "views/committee/indexpre";
import Verifiying from "views/committee/indexverifiying";
import Approved from "views/committee/approved";
import Denied from "views/committee/denied";
import Users from "views/user";
import Supervisor from "views/supervisor";
import Monitoring from "views/monitoring/new";
import ToWrite from "views/committee/indextowrite";
import UploadGallery from "views/gallery";
import { usePermissions } from "context/permission";

const MyRoutes = () => {
  const { permissions } = usePermissions();
  const modules = [
    {
      path: "/index",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component: <Index />,
      layout: "/admin",
      permission: "",
    },
    {
      path: "/login",
      name: "Login",
      icon: "ni ni-tv-2 text-primary",
      component: <Login />,
      layout: "/auth",
      permission: "",
    },
    {
      path: "/prospecting",
      name: "Pospecciones",
      icon: "ni ni-key-25 text-info",
      component: <Prospecting />,
      layout: "/admin",
      permission: "Prospections",
    },
    {
      path: "/pre-committee",
      name: "Pre-comite",
      icon: "ni ni-key-25 text-info",
      component: <Precommittee />,
      layout: "/admin",
      permission: "Pre-Committee",
    },
    {
      path: "/verifiying",
      name: "Verificacion",
      icon: "ni ni-key-25 text-info",
      component: <Verifiying />,
      layout: "/admin",
      permission: "Verifying",
    },
    {
      path: "/committee",
      name: "Comite",
      icon: "ni ni-key-25 text-info",
      component: <Committee />,
      layout: "/admin",
      permission: "Committee",
    },
    {
      path: "/to-write",
      name: "Digitacion",
      icon: "ni ni-key-25 text-info",
      component: <ToWrite />,
      layout: "/admin",
      permission: "To Write",
    },
    {
      path: "/cases/approved",
      name: "Casos Aprobados",
      icon: "ni ni-key-25 text-info",
      component: <Approved />,
      layout: "/admin",
      permission: "Cases approved",
    },
    {
      path: "/cases/denied",
      name: "Casos Denegados",
      icon: "ni ni-key-25 text-info",
      component: <Denied />,
      layout: "/admin",
      permission: "Cases Denied",
    },
    {
      path: "/users",
      name: "Usuarios",
      icon: "ni ni-key-25 text-info",
      component: <Users />,
      layout: "/admin",
      permission: "Users",
    },
    {
      path: "/supervisor",
      name: "Supervisores",
      icon: "ni ni-key-25 text-info",
      component: <Supervisor />,
      layout: "/admin",
      permission: "Supervisors",
    },
    {
      path: "/geolocation",
      name: "Monitorizacion",
      icon: "ni ni-key-25 text-info",
      component: <Monitoring />,
      layout: "/admin",
      permission: "Monitoring",
    },
    {
      path: "/tools/upload/gallery",
      name: "Subir imagenes",
      icon: "ni ni-key-25 text-info",
      component: <UploadGallery />,
      layout: "/admin",
      permission: "Upload Gallery",
    },
  ];

  let routes = [];
  const fnroutes = () => {
    modules.map((value) => {
      if (value.permission == "") {
        if (value.name == "Login" && localStorage.getItem('soliapp_Access_key')) {

        } else {
          routes.push(value);
        }
      } else {
        let modulesrh = permissions.find(item => item.module === value.permission);
        if (modulesrh) {
          if (modulesrh.permissions.includes("View")) {
            routes.push(value);
          }
        }
      }

    });
  }
  fnroutes();
  return {
    routes
  }
}

export default MyRoutes
