import GenericDashboard from '@/components/GenericDashboard';
import { FaFile, FaUsers } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { SiPowerautomate } from "react-icons/si";


const links = [
  {
    href: "/logs",
    icon: <SiPowerautomate color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Gerenciar Automações",
  },
  {
    href: "/logs",
    icon: <FaFile color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Histórico de automações",
  },
  {
    href: "/automationUsers",
    icon: <FaUsers color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Gerenciar Usuários",
  },
  {
    href: "/home",
    icon: <FaUserPen color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Suas informações",
  },
];

export default function Page() {
  return <GenericDashboard links={links} pageName="Dashboard" />;
}