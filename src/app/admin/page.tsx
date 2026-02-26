'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { DashboardPage } from '@/components/admin/DashboardPage'
import { EventsPage } from '@/components/admin/EventsPage'
import { StoriesPage } from '@/components/admin/StoriesPage'
import { UsersPage } from '@/components/admin/UsersPage'
import { ModerationPage } from '@/components/admin/ModerationPage'
import { NotificationsPage } from '@/components/admin/NotificationsPage'
import { WebsitePage } from '@/components/admin/WebsitePage'
import { SettingsPage } from '@/components/admin/SettingsPage'
import { ModerationProvider } from '@/components/admin/ModerationContext'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Mock pending count — in real app this would come from context/API
  const pendingModerationCount = 4

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />
      case 'events':
        return <EventsPage />
      case 'stories':
        return <StoriesPage />
      case 'moderation':
        return <ModerationPage />
      case 'users':
        return <UsersPage />
      case 'notifications':
        return <NotificationsPage />
      case 'website':
        return <WebsitePage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <ModerationProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingModerationCount={pendingModerationCount}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader activeTab={activeTab} />
          <main className="flex-1 overflow-y-auto p-6">{renderPage()}</main>
        </div>
      </div>
    </ModerationProvider>
  )
}
