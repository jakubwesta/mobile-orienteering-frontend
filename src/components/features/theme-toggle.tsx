import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme()

	const handleToggle = () => {
		if (theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}

	const getIcon = () => {
		// Show sun icon for light mode, moon icon for dark/system mode
		if (theme === 'light') {
			return <Sun className="h-4 w-4" />
		} else {
			return <Moon className="h-4 w-4" />
		}
	}

	const getTooltipText = () => {
		if (theme === 'light') {
			return 'Switch to dark mode'
		} else {
			return 'Switch to light mode'
		}
	}

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={handleToggle}
			title={getTooltipText()}
			className="h-9 w-9"
		>
			{getIcon()}
		</Button>
	)
} 

export default ThemeToggle;