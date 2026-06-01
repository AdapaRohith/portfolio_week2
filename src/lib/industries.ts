import { MonitorCog, ShoppingCart, Factory, Hospital, Building2, Smartphone, type LucideIcon } from 'lucide-react'

export interface Industry { label: string; icon: LucideIcon }

export const industries: Industry[] = [
    { label: 'IT Services', icon: MonitorCog },
    { label: 'E-Commerce', icon: ShoppingCart },
    { label: 'Manufacturing', icon: Factory },
    { label: 'Healthcare', icon: Hospital },
    { label: 'Real Estate', icon: Building2 },
    { label: 'SMB', icon: Smartphone },
]
