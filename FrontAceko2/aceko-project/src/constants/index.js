import { GoGoal } from "react-icons/go";
import { GrPlan } from "react-icons/gr";
import { HiOutlineViewGrid } from "react-icons/hi";
import { LuCalendarPlus } from "react-icons/lu";
import {IoIosStats,IoIosSettings,IoIosPerson,IoIosPersonAdd,IoIosEyeOff,IoIosLogOut,} from "react-icons/io";
import {FaChartBar,FaCalendarAlt,FaFacebookMessenger,FaUsersCog,FaUserPlus,} from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdSmsFailed } from "react-icons/md";
import { IoGitNetworkSharp } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoAnalytics } from "react-icons/io5";

import user01 from "../assets/user01.png";
import user02 from "../assets/user02.png";
import user03 from "../assets/user03.png";


export const docteurs = [
  {
    href: "/docteur/dashboard",
    icon: HiOutlineViewGrid,
    text: "Dashboard",
  },
  {
    href: "/docteur/all-patients",
    icon: FiBookOpen,
    text: "ALL Patients",
  },
  {
    href: "/docteur/patient-historique-consultation",
    icon: FaUserDoctor,
    text: "Consultation",
  },
  {
    href: "/docteur/patient-resultats-analyse",
    icon: IoAnalytics,
    text: "Résultats Analyse",
  },
  {
    href: "/docteur/my-appointments",
    icon: LuCalendarPlus,
    text: "My Appointments",
  },
  {
    href: "/docteur/workflow",
    icon: IoGitNetworkSharp,
    text: "Workflow",
  },
  {
    href: "/docteur/workflow/task",
    icon: FaTasks,
    text: "Workflow Task",
  },
]

export const laborantin = [
  {
    href: "/laborantin/dashboard",
    icon: HiOutlineViewGrid,
    text: "Dashboard",
  },
  {
    href: "/laborantin/new-analyse-answer",
    icon: FaUserPlus,
    text: "Add Analyse"
  },
  // {
  //   href: "/laborantin/new-analyse-answer",
  //   icon: IoCheckmarkDone,
  //   text: "Nouvelle Analyse",
  // },
  // {
  //   href: "/laborantin/see-analyse-answer",
  //   icon: MdSmsFailed,
  //   text: "Analyse Non Fait",
  // },
]

export const links = [
  {
    href: "/admin/stat",
    icon: FaChartBar,
    text: "Dashboard",
  },

  {
    href: "/admin/accept-demande",
    icon: FaFacebookMessenger,
    text: "Accept Demande",
  },
  {
    href: "/admin/reject-demande",
    icon: FaUsersCog,
    text: "Reject Demande",
  },
]

export const notifications = [
  {
    href: "/docteur/notification",
    icon: user01,
    text: "Resultats examen disponible",
    badge: FaArrowUpRightFromSquare
  },
  {
    href: "/docteur/notification",
    icon: user02,
    text: "Urgence patient",
    badge: FaArrowUpRightFromSquare
  },
  {
    href: "/docteur/notification",
    icon: user03,
    text: "Patient en crise",
    badge: FaArrowUpRightFromSquare
  },
  {
    href: "/docteur/notification",
    icon: user01,
    text: "Le patient n'a pas respecté la marge prevue pour son rendez-vous",
    badge: FaArrowUpRightFromSquare
  },
]


export const getEmployeesData = (counts) => [
  {
    title: "Total Medecins",
    icon: IoIosPerson,
    count: counts.total || 0,
    bgColor: "bg-gray-100",
  },
  {
    title: "Non Approuvé",
    icon: IoIosEyeOff,
    count: counts.pending || 0,
    bgColor: "bg-blue-100",
  },
  {
    title: "Approuvé",
    icon: IoIosPersonAdd,
    count: counts.approved || 0,
    bgColor: "bg-yellow-100",
  },
];

export const shortcutLink = [
  {
    title: "Goals",
    icon: GoGoal,
  },
  {
    title: "Plan",
    icon: GrPlan,
  },
  {
    title: "Stats",
    icon: IoIosStats,
  },
  {
    title: "Setting",
    icon: IoIosSettings,
  },
];

export const users = [
  {
    name: "Robert Fox",
    country: "USA",
    role: "Python Developer",
    image: user01,
    bgColor: "bg-yellow-100",
  },
  {
    name: "Jane Doe",
    country: "UK",
    role: "Frontend Developer",
    image: user02,
    bgColor: "bg-blue-100",
  },
  {
    name: "John Smith",
    country: "Canada",
    role: "Backend Developer",
    image: user03,
    bgColor: "bg-gray-100",
  },
  {
    name: "Alice Johnson",
    country: "Australia",
    role: "Full Stack Developer",
    image: user01,
    bgColor: "bg-slate-100",
  },
];

export const events = [
  {
    date: "01 Aug",
    title: "Upcoming Event",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    date: "15 Sept",
    title: "Annual Conference",
    description: "Join us for our annual conference.",
  },
  {
    date: "20 Sept",
    title: "Networking Meetup",
    description: "Connect with professionals in your field.",
  },
];

// ------- ==
// chart data, later we will use this!!!

// const options = {
//   series: [44, 55, 41],
//   options: {
//     chart: {
//       type: "donut",
//       height: 350,
//     },
//     labels: ["Desktop", "Tablet", "Mobile"],
//     colors: ["#FF5733", "#33FF57", "#3357FF"],
//     legend: {
//       position: "bottom",
//       labels: {
//         colors: darkMode ? "#dddddd" : "#000000",
//       },
//     },
//     dataLabels: {
//       style: {
//         colors: ["#dddddd"],
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             position: "bottom",
//           },
//         },
//       },
//     ],
//   },
// };

// ..........
// const chartConfig = {
//   series: [
//     {
//       name: "Sales",
//       data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
//     },
//   ],
//   options: {
//     chart: {
//       type: "bar",
//       height: 240,
//       toolbar: {
//         show: false,
//       },
//     },
//     title: {
//       show: false,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     colors: ["#020617"],
//     plotOptions: {
//       bar: {
//         columnWidth: "40%",
//         borderRadius: 2,
//       },
//     },
//     xaxis: {
//       axisTicks: {
//         show: false,
//       },
//       axisBorder: {
//         show: false,
//       },
//       labels: {
//         style: {
//           colors: darkMode ? "#dddddd" : "#616161",
//           fontSize: "12px",
//           fontFamily: "inherit",
//           fontWeight: 400,
//         },
//       },
//       categories: [
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//     },
//     yaxis: {
//       labels: {
//         style: {
//           colors: darkMode ? "#dddddd" : "#616161",
//           fontSize: "12px",
//           fontFamily: "inherit",
//           fontWeight: 400,
//         },
//       },
//     },
//     grid: {
//       show: true,
//       borderColor: "#a0a0a0",
//       strokeDashArray: 5,
//       xaxis: {
//         lines: {
//           show: true,
//         },
//       },
//       padding: {
//         top: 5,
//         right: 20,
//       },
//     },
//     fill: {
//       opacity: 0.8,
//     },
//     tooltip: {
//       theme: "dark",
//     },
//   },
// };
