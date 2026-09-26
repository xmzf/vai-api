/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useStatus } from '@/hooks/use-status'
import { useSystemConfig } from '@/hooks/use-system-config'
import { cn } from '@/lib/utils'

type SystemBrandProps = {
  defaultName?: string
  defaultVersion?: string
  /**
   * Visual layout:
   * - 'sidebar': stacked card style (used inside the sidebar header).
   * - 'inline': compact horizontal pill (used inside the top app bar).
   */
  variant?: 'sidebar' | 'inline'
}

/**
 * System brand component
 * Displays current system logo + name.
 * - inline: compact pill in the top app bar; clicking navigates to home (/)
 * - sidebar: stacked card in the sidebar header (display only)
 */
export function SystemBrand(props: SystemBrandProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const { logo } = useSystemConfig()

  const variant = props.variant ?? 'sidebar'
  const name = status?.system_name || props.defaultName || 'New API'
  const version =
    status?.version || props.defaultVersion || t('Unknown version')

  if (variant === 'inline') {
    return (
      <Link
        to='/'
        aria-label={t('Go to home')}
        className={cn(
          'text-foreground inline-flex h-11 max-w-[17rem] items-center gap-2 rounded-full px-2.5 pr-4 text-sm font-semibold transition-colors outline-none select-none',
          'bg-secondary/70 hover:bg-secondary focus-visible:ring-ring/40 focus-visible:ring-2 dark:bg-secondary/50'
        )}
      >
        <div className='flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 ring-1 ring-primary/10'>
          <img
            src={logo}
            alt={t('Logo')}
            className='size-full rounded-full object-cover'
          />
        </div>
        <span className='truncate'>{name}</span>
      </Link>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='h-[72px] rounded-[20px] px-3 hover:bg-sidebar-accent/70 active:bg-sidebar-accent'
          render={<div />}
        >
          <div className='flex aspect-square size-10 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-primary/10 ring-1 ring-primary/10'>
            <img
              src={logo}
              alt={t('Logo')}
              className='size-full rounded-[14px] object-cover'
            />
          </div>
          <div className='grid flex-1 text-start leading-tight group-data-[collapsible=icon]:hidden'>
            <span className='truncate text-[15px] font-semibold tracking-tight'>
              {name}
            </span>
            <span className='truncate pt-0.5 text-[11px] text-muted-foreground'>
              {version}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
