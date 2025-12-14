import ThemeToggle from "@/components/features/theme-toggle";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <ThemeToggle />
    </div>
  )
}

export default HomePage
