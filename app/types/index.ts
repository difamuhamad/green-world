import type { LucideProps } from 'lucide-vue-next';
import type { FunctionalComponent } from 'vue';

export type TransactionStatus = 'Sedang diproses' | 'Selesai' | 'Dibatalkan';

export interface LayoutHeaderProps {
  title: string;
  description: string;
  sticky?: boolean;
}

type NavIcon = FunctionalComponent<
  LucideProps,
  Record<any, any>,
  any,
  Record<any, any>
>;

interface BaseNavItem {
  title: string;
  icon?: NavIcon;
}

export type NavItem =
  | (BaseNavItem & {
      items: (BaseNavItem & { url?: string })[];
      url?: never;
      isActive?: boolean;
    })
  | (BaseNavItem & {
      url: string;
      items?: never;
    });

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface User {
  name: string;
  avatar: string;
  email: string;
}

export interface Team {
  name: string;
  logo: NavIcon;
  plan: string;
}

export interface SidebarData {
  user: User;
  teams: Team[];
  navMain: NavGroup[];
}

// Profile Types
// Type Definitions
export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  address: string;
  badge_level: string;
  points: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  email: string;
  type: string;
  status: TransactionStatus;
  amount: number;
  points: number;
  created_at: string;
}

export interface DisplayTransaction {
  type: string;
  date: string;
  status: TransactionStatus;
  amount: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: any;
}

export interface UserData {
  nama: string;
  email: string;
  points: string;
  badge: string;
}

export interface RewardItem {
  id: string;
  name: string;
  image: string;
  points: string;
}
export interface UserData {
  nama: string;
  email: string;
  points: string;
  badge: string;
}

export interface RewardItem {
  id: string;
  name: string;
  image: string;
  points: string;
}
export interface UserData {
  nama: string;
  email: string;
  points: string;
  badge: string;
}

export interface RewardItem {
  id: string;
  name: string;
  image: string;
  points: string;
}
export interface UserData {
  nama: string;
  email: string;
  points: string;
  badge: string;
}

export interface RewardItem {
  id: string;
  name: string;
  image: string;
  points: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  status: 'active' | 'inactive' | 'invited' | 'suspended';
  role: 'superadmin' | 'admin' | 'cashier' | 'manager';
  createdAt: Date;
  updatedAt: Date;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface PlaceNameResponse {
  type: string;
  query: [number, number];
  features: {
    place_name: string;
    geometry: {
      coordinates: [number, number];
    };
    [key: string]: any;
  }[];
  attribution: string;
}

export interface VendingMachine {
  id: number;
  created_at: string;
  machine_name: string;
  province: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
}
