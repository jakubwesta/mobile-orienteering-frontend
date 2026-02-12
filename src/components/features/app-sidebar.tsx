import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { LucideProps } from 'lucide-react'
import {
	ActivityIcon,
	LayoutDashboardIcon,
	MenuIcon,
	MoreHorizontalIcon,
	MoonIcon,
	RssIcon,
	SearchIcon,
	SunIcon,
	LogOutIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetClose,
} from '@/components/ui/sheet'
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
	{ label: 'Account', to: '/activities', Icon: ActivityIcon },
	{ label: 'Dashboard', to: '/dashboard', Icon: LayoutDashboardIcon },
]

// Desktop Sidebar Component
const DesktopSidebar = () => {
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
		<aside className="hidden md:flex h-screen w-60 shrink-0 flex-col border-r bg-background">
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

// Mobile Bottom Navigation Component
const MobileBottomNav = () => {
	const { pathname } = useLocation()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const { logout } = useAuth()
	const { theme, setTheme } = useTheme()

	const handleChangeTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	const handleLogout = () => {
		setIsMenuOpen(false)
		logout()
	}

	return (
		<>
			{/* Bottom Navigation Bar */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t safe-area-bottom">
				<div className="flex items-center justify-around h-16 px-2">
					{NAV_ITEMS.map((item) => {
						const isActive = pathname === item.to

						return (
							<Link
								key={item.to}
								to={item.to}
								className={`flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${isActive
										? 'text-primary'
										: 'text-muted-foreground hover:text-foreground'
									}`}
								aria-current={isActive ? 'page' : undefined}
							>
								<item.Icon
									className={`h-5 w-5 mb-1 ${isActive ? 'stroke-[2.5]' : ''}`}
									aria-hidden="true"
								/>
								<span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>
									{item.label}
								</span>
							</Link>
						)
					})}

					{/* More Menu Button */}
					<button
						onClick={() => setIsMenuOpen(true)}
						className="flex flex-col items-center justify-center flex-1 h-full py-2 text-muted-foreground hover:text-foreground transition-colors"
					>
						<MenuIcon className="h-5 w-5 mb-1" aria-hidden="true" />
						<span className="text-xs">More</span>
					</button>
				</div>
			</nav>

			{/* Mobile Menu Sheet */}
			<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
				<SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-2xl">
					<SheetHeader className="pb-2">
						<SheetTitle className="text-left text-xl">Menu</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-2 pb-6">
						{/* Theme Toggle */}
						<SheetClose asChild>
							<button
								onClick={handleChangeTheme}
								className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-accent transition-colors text-left"
							>
								{theme === 'light' ? (
									<MoonIcon className="h-5 w-5" />
								) : (
									<SunIcon className="h-5 w-5" />
								)}
								<div>
									<p className="font-medium">
										{theme === 'light' ? 'Dark Mode' : 'Light Mode'}
									</p>
									<p className="text-sm text-muted-foreground">
										Switch to {theme === 'light' ? 'dark' : 'light'} theme
									</p>
								</div>
							</button>
						</SheetClose>

						<div className="h-px bg-border my-2" />

						{/* Logout */}
						<SheetClose asChild>
							<button
								onClick={handleLogout}
								className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-destructive/10 transition-colors text-left text-destructive"
							>
								<LogOutIcon className="h-5 w-5" />
								<div>
									<p className="font-medium">Log Out</p>
									<p className="text-sm opacity-70">Sign out of your account</p>
								</div>
							</button>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</>
	)
}

// Main AppSidebar Component
const AppSidebar = () => {
	return (
		<>
			<DesktopSidebar />
			<MobileBottomNav />
		</>
	)
}

export default AppSidebar
