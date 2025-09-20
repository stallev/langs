export interface NavItem {
  label: string;
  path: string;
  disabled?: boolean;
  submenu?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrent?: boolean;
}
