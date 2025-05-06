<template>
  <div class="navbar bg-base-100 shadow-sm rounded-lg m-1 px-4">
    <!-- Centered search bar -->
    <div class="flex-1 flex justify-start ml-20">
      <div class="form-control">
        <input type="text" placeholder="Search" class="input input-bordered w-80 rounded-full" />
      </div>
    </div>
    
    <!-- Right-aligned controls -->
    <div class="flex gap-4 items-center">
      <!-- Notification button -->
      <button @click="toggleNotifications" class="btn btn-ghost btn-circle">
        <svg width="24" height="24" fill="#23409f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M18 11v5l2 2v1H4v-1l2-2v-5c0-3.08 1.63-5.64 4.5-6.32V4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.68C16.36 5.36 18 7.93 18 11Zm-4 9a2 2 0 1 1-4 0h4Z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <!-- Profile dropdown -->
    
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <button @click="toggleProfile" class="w-10 rounded-full overflow-hidden">
            <img alt="User avatar" src="../assets/helloemo.png" />
          </button>
        </div>
      </div>
    </div>


  <!-- Notification popup -->
  <div v-if="showNotifications" class="fixed right-5 top-20 w-80 bg-white rounded-lg shadow-lg z-20 overflow-hidden">
    <div class="p-4 border-b flex justify-between items-center">
      <h3 class="font-medium">Notifications ({{ unreadCount }})</h3>
      <button @click="markAllAsRead" class="text-blue-500 text-sm hover:underline">Mark all as read</button>
    </div>
    <div class="max-h-96 overflow-y-auto">
      <div v-for="(notif, index) in notifications" :key="index" class="p-4 border-b flex items-start">
        <span class="text-xl mr-3">{{ notif.icon }}</span>
        <div class="flex-1">
          <p class="font-semibold">{{ notif.title }}</p>
          <p class="text-gray-600 text-sm">{{ notif.message }}</p>
        </div>
        <button @click="dismissNotification(index)" class="text-gray-400 hover:text-gray-600 text-xl">×</button>
      </div>
    </div>
  </div>

  <!-- Profile popup -->
  <div v-if="showProfile" class="fixed right-5 top-20 w-72 bg-white rounded-lg shadow-lg z-20 overflow-hidden">
    <div class="p-4 flex items-center gap-4">
      <div class="h-14 w-14 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
        <img v-if="user.avatar" :src="user.avatar" class="w-full h-full object-cover" alt="Profile">
        <div v-else>{{ userInitials }}</div>
      </div>
      <div>
        <h3 class="font-semibold">{{ user.firstName }} {{ user.lastName }}</h3>
        <p class="text-gray-600 text-sm">{{ user.role }}</p>
      </div>
    </div>
    <div class="p-3 border-t">
      <router-link to="/settings" class="block text-blue-500 hover:underline">View Profile</router-link>
    </div>
  </div>

  <!-- Overlay -->
  <div 
    v-if="showNotifications || showProfile" 
    class="fixed inset-0 bg-black bg-opacity-30 z-10"
    @click="closeAllPopups"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      showNotifications: false,
      showProfile: false,
      user: {
        firstName: "Manar",
        lastName: "Dard",
        role: "Student",
        avatar: "" // Image URL if available
      },
      notifications: [
        {
          icon: "📝",
          title: "New Assessment",
          message: "Communication assignment to complete",
          unread: true
        },
        {
          icon: "🤖",
          title: "AI Recommendation",
          message: "Progress in leadership skills",
          unread: true
        }
      ]
    }
  },
  computed: {
    userInitials() {
      return this.user.firstName.charAt(0) + this.user.lastName.charAt(0);
    },
    unreadCount() {
      return this.notifications.filter(n => n.unread).length;
    }
  },
  methods: {
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      this.showProfile = false;
    },
    toggleProfile() {
      this.showProfile = !this.showProfile;
      this.showNotifications = false;
    },
    closeAllPopups() {
      this.showNotifications = false;
      this.showProfile = false;
    },
    markAllAsRead() {
      this.notifications.forEach(n => n.unread = false);
    },
    dismissNotification(index) {
      this.notifications.splice(index, 1);
    }
  }
}
</script>

<style scoped>
/* Using utility classes for most styling, only keeping essential custom styles */
.navbar {
  position: relative;
  z-index: 100;
}

/* Remove redundant styles by leveraging utility classes */
</style>