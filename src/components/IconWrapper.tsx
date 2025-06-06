// src/components/IconWrapper.tsx
import React from 'react';
import * as Icons from 'react-icons/fi';

// Interface para as props do ícone
interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  className?: string;
  [key: string]: any;
}

// Componente wrapper que resolve problemas de tipagem do React Icons
export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = Icons[name];
  
  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado em react-icons/fi`);
    return null;
  }

  return React.createElement(IconComponent, props);
};

// Exportações específicas para facilitar o uso
export const IconPlus = (props: Omit<IconProps, 'name'>) => <Icon name="FiPlus" {...props} />;
export const IconEdit = (props: Omit<IconProps, 'name'>) => <Icon name="FiEdit2" {...props} />;
export const IconTrash = (props: Omit<IconProps, 'name'>) => <Icon name="FiTrash2" {...props} />;
export const IconEye = (props: Omit<IconProps, 'name'>) => <Icon name="FiEye" {...props} />;
export const IconSearch = (props: Omit<IconProps, 'name'>) => <Icon name="FiSearch" {...props} />;
export const IconDownload = (props: Omit<IconProps, 'name'>) => <Icon name="FiDownload" {...props} />;
export const IconBarChart = (props: Omit<IconProps, 'name'>) => <Icon name="FiBarChart" {...props} />;
export const IconTrendingUp = (props: Omit<IconProps, 'name'>) => <Icon name="FiTrendingUp" {...props} />;
export const IconClock = (props: Omit<IconProps, 'name'>) => <Icon name="FiClock" {...props} />;
export const IconCheckCircle = (props: Omit<IconProps, 'name'>) => <Icon name="FiCheckCircle" {...props} />;
export const IconDollarSign = (props: Omit<IconProps, 'name'>) => <Icon name="FiDollarSign" {...props} />;
export const IconAlertCircle = (props: Omit<IconProps, 'name'>) => <Icon name="FiAlertCircle" {...props} />;
export const IconX = (props: Omit<IconProps, 'name'>) => <Icon name="FiX" {...props} />;
export const IconUsers = (props: Omit<IconProps, 'name'>) => <Icon name="FiUsers" {...props} />;

// Para o Header
export const IconMenu = (props: Omit<IconProps, 'name'>) => <Icon name="FiMenu" {...props} />;
export const IconBell = (props: Omit<IconProps, 'name'>) => <Icon name="FiBell" {...props} />;
export const IconUser = (props: Omit<IconProps, 'name'>) => <Icon name="FiUser" {...props} />;
export const IconSettings = (props: Omit<IconProps, 'name'>) => <Icon name="FiSettings" {...props} />;
export const IconLogOut = (props: Omit<IconProps, 'name'>) => <Icon name="FiLogOut" {...props} />;
export const IconHelpCircle = (props: Omit<IconProps, 'name'>) => <Icon name="FiHelpCircle" {...props} />;
export const IconChevronDown = (props: Omit<IconProps, 'name'>) => <Icon name="FiChevronDown" {...props} />;
export const IconMoon = (props: Omit<IconProps, 'name'>) => <Icon name="FiMoon" {...props} />;
export const IconSun = (props: Omit<IconProps, 'name'>) => <Icon name="FiSun" {...props} />;
export const IconPhone = (props: Omit<IconProps, 'name'>) => <Icon name="FiPhone" {...props} />;
export const IconMail = (props: Omit<IconProps, 'name'>) => <Icon name="FiMail" {...props} />;

// Para o Sidebar
export const IconHome = (props: Omit<IconProps, 'name'>) => <Icon name="FiHome" {...props} />;
export const IconBriefcase = (props: Omit<IconProps, 'name'>) => <Icon name="FiBriefcase" {...props} />;
export const IconFolder = (props: Omit<IconProps, 'name'>) => <Icon name="FiFolder" {...props} />;
export const IconTarget = (props: Omit<IconProps, 'name'>) => <Icon name="FiTarget" {...props} />;
export const IconUserCheck = (props: Omit<IconProps, 'name'>) => <Icon name="FiUserCheck" {...props} />;
export const IconFileText = (props: Omit<IconProps, 'name'>) => <Icon name="FiFileText" {...props} />;
export const IconPackage = (props: Omit<IconProps, 'name'>) => <Icon name="FiPackage" {...props} />;
export const IconCalendar = (props: Omit<IconProps, 'name'>) => <Icon name="FiCalendar" {...props} />;
export const IconGrid = (props: Omit<IconProps, 'name'>) => <Icon name="FiGrid" {...props} />;
export const IconChevronRight = (props: Omit<IconProps, 'name'>) => <Icon name="FiChevronRight" {...props} />;
export const IconMapPin = (props: Omit<IconProps, 'name'>) => <Icon name="FiMapPin" {...props} />;

export default Icon;