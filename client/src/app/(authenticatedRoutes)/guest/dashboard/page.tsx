import GenericDashboard from '@/components/GenericDashboard';
import { Box } from '@chakra-ui/react';
import { GrConfigure } from 'react-icons/gr';
import { RiHotelLine } from 'react-icons/ri';


const links = [
  // {
  //   href: "/home",
  //   icon: <FaUserPen color="white" style={{ width: "150px", height: "90px" }} />,
  //   label: "Atualizar suas informações",
  // },
  {
    href: "/guest/room",
    icon: <RiHotelLine color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Vizualizar detalhes do seu quarto",
  },
  {
    href: "/guest/serviceRequest",
    icon: <GrConfigure color="white" style={{ width: "150px", height: "90px" }} />,
    label: "Solicitar serviços",
  },
];

export default function Page() {
  return (
    <>
      <GenericDashboard links={links} pageName="Dashboard" />
      <Box p={10} mt={10}>
      </Box>
    </>
  );
}