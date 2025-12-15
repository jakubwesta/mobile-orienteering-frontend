import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { LucideProps } from 'lucide-react'
import {
	ActivityIcon,
	LayoutDashboardIcon,
	MoreHorizontalIcon,
	RssIcon,
	SearchIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { useTheme } from '@/hooks/use-theme'

type NavItem = {
	label: string
	to: string
	Icon: React.ComponentType<LucideProps>
}

const NAV_ITEMS: NavItem[] = [
	{ label: 'Feed', to: '/feed', Icon: RssIcon },
	{ label: 'Search', to: '/search', Icon: SearchIcon },
	{ label: 'Activities', to: '/activities', Icon: ActivityIcon },
	{ label: 'Dashboard', to: '/dashboard', Icon: LayoutDashboardIcon },
]

const AppSidebar = () => {
	const { pathname } = useLocation()
	const [isMoreOpen, setIsMoreOpen] = useState(false)

	const { logout } = useAuth()
	const { theme, setTheme } = useTheme()

	const handleChangeTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	const handleLogout = () => {
		setIsMoreOpen(false)
		logout()
	}

	return (
		<aside className="flex h-screen w-60 shrink-0 flex-col border-r bg-background">
			<nav className="flex flex-col gap-2 px-2 py-2">
				{NAV_ITEMS.map((item) => {
					const isActive = pathname === item.to

					return (
						<Button
							key={item.to}
							asChild
							variant="ghost"
							className={`h-12 w-full justify-start gap-2 text-base font-normal ${isActive ? 'bg-accent text-accent-foreground font-semibold' : ''}`}
						>
							<Link to={item.to} aria-current={isActive ? 'page' : undefined}>
								<item.Icon className="h-4 w-4" aria-hidden="true" />
								<span>{item.label}</span>
							</Link>
						</Button>
					)
				})}
			</nav>

			<div className="mt-auto px-2 pb-3">
				<div className="my-2 h-px bg-border" />

				<DropdownMenu open={isMoreOpen} onOpenChange={setIsMoreOpen}>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className={`h-12 w-full justify-start gap-2 text-base font-normal ${isMoreOpen ? 'bg-accent text-accent-foreground font-semibold' : ''}`}
						>
							<MoreHorizontalIcon className="h-4 w-4" aria-hidden="true" />
							<span>More</span>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent side="top" align="start" className="w-72">
						<DropdownMenuItem className="py-2 text-base" onSelect={handleChangeTheme}>
							Change theme
						</DropdownMenuItem>
						<DropdownMenuItem className="py-2 text-base" onSelect={handleLogout}>
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</aside>
	)
}

export default AppSidebar
