import { Sidebar } from "./side-bar"
import { Header } from "./header"
import { Main } from "./main"
import { sessionUser } from "../types"


export function AdminDashboardLayout({user}: sessionUser) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header user={user} />
        <Main />
      </div>
    </div>
  )
}
