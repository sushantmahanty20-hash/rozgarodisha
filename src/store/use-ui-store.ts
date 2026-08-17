import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UIState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  commandPaletteOpen: boolean
  notificationsPanelOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleCommandPalette: () => void
  setCommandPaletteOpen: (open: boolean) => void
  toggleNotificationsPanel: () => void
  setNotificationsPanelOpen: (open: boolean) => void
  closeAllPanels: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      sidebarCollapsed: false,
      commandPaletteOpen: false,
      notificationsPanelOpen: false,

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (open) =>
        set({ sidebarOpen: open }),

      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),

      toggleCommandPalette: () =>
        set((state) => ({
          commandPaletteOpen: !state.commandPaletteOpen,
          notificationsPanelOpen: false,
        })),

      setCommandPaletteOpen: (open) =>
        set({ commandPaletteOpen: open, notificationsPanelOpen: false }),

      toggleNotificationsPanel: () =>
        set((state) => ({
          notificationsPanelOpen: !state.notificationsPanelOpen,
          commandPaletteOpen: false,
        })),

      setNotificationsPanelOpen: (open) =>
        set({ notificationsPanelOpen: open, commandPaletteOpen: false }),

      closeAllPanels: () =>
        set({ commandPaletteOpen: false, notificationsPanelOpen: false }),
    }),
    {
      name: 'jobportal-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)
