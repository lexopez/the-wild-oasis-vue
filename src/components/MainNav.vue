<script setup>
import {
  Home as HomeIcon,
  CalendarDays as CalendarIcon,
  Warehouse as CabinIcon,
  Users as UsersIcon,
  Settings as SettingsIcon,
} from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import UploaderData from '../../data/UploaderData.vue'
</script>

<template>
  <nav>
    <ul class="nav-list">
      <li>
        <RouterLink class="nav-link" to="/dashboard">
          <HomeIcon />
          <span>Home</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/bookings">
          <CalendarIcon />
          <span>Bookings</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/cabins">
          <CabinIcon />
          <span>Cabins</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/users">
          <UsersIcon />
          <span>Users</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/settings">
          <SettingsIcon />
          <span>Settings</span>
        </RouterLink>
      </li>
      <li>
        <UploaderData />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link:link,
.nav-link:visited {
  display: flex;
  align-items: center;
  gap: 1.2rem;

  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;
  text-decoration: none;
}

/* Vue Router adds .router-link-active automatically. 
  We use it here to match your &.active logic.
*/
.nav-link:hover,
.nav-link:active,
.nav-link.router-link-active:link,
.nav-link.router-link-active:visited {
  color: var(--color-grey-800);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
}

.nav-link :deep(svg) {
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-grey-400);
  transition: all 0.3s;
}

.nav-link:hover :deep(svg),
.nav-link:active :deep(svg),
.nav-link.router-link-active:link :deep(svg),
.nav-link.router-link-active:visited :deep(svg) {
  color: var(--color-brand-600);
}
</style>
