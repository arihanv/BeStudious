import MenuNav from "@/components/menu-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-center space-x-4 sm:space-x-0">
        <div className="w-fit text-lg font-bold">
          <MenuNav />
        </div>
      </div>
    </header>
  )
}
