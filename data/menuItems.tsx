import { Settings, CreditCard, Info, PhoneCall } from "lucide-react";

export const menuItems = [
  {
    icon: <Settings size={20} />,
    label: "Edit Profile",
    desc: "Manage your personal details",
    link: "/welcome/profile/edit-profile",
  },
  {
    icon: <CreditCard size={20} />,
    label: "View Transactions",
    desc: "Check your course purchases",
    link: "/welcome/transactions",
  },
  {
    icon: <Info size={20} />,
    label: "About Us",
    desc: "Learn about Sensationz Performing Arts",
    link: "/welcome/about-us",
  },
  {
    icon: <PhoneCall size={20} />,
    label: "Contact Us",
    desc: "Get in touch with our support team",
    link: "/welcome/contact-us",
  },
];
