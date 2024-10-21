import GenericDashboard from '@/components/GenericDashboard';
import { IndicatorOfResult } from '@/components/IndicatorOfResult';
import { Box, Text } from '@chakra-ui/react';
import { FaFile, FaUsers } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { SiPowerautomate } from "react-icons/si";


const links = [
  {
    href: "/admin/log",
    icon: <SiPowerautomate color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Histórico de Atividades e Logs",
  },
  {
    href: "/admin/room",
    icon: <FaFile color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Cadastro e Gerenciamento de Quartos",
  },
  {
    href: "/admin/guestManagement",
    icon: <FaUsers color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Gerenciamento de hóspedes",
  },
  {
    href: "/home",
    icon: <FaUserPen color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Gerenciamento de reservas",
  },
  // {
  //   href: "/home",
  //   icon: <FaUserPen color="white" style={{ width: "150px", height: "90px" }} />,
  //   label: "Suas informações",
  // },
];

export default function Page() {
  return (
    <>
      <GenericDashboard links={links} pageName="Dashboard" />
      <Box p={10} mt={10}>
        <Text fontSize={"3xl"} fontWeight={600}>Indicadores de Resultado</Text>
        <IndicatorOfResult />
      </Box>
    </>

  );

}