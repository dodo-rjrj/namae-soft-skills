<template>
  <div class="navbar bg-base-100 shadow-sm rounded-[15px] m-1 px-4">
    <!-- Centered search bar -->
    <div class="flex-1 flex justify-start ml-20 ">
      <div class="form-control">
        <input type="text" placeholder="Search" class="input input-bordered w-80  rounded-[30px]" />
      </div>
    </div>
    
    <!-- Right-aligned avatar -->
    <div class="flex gap-4 items-center">
     <button><svg width="30" height="30" fill="#23409f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M18 11v5l2 2v1H4v-1l2-2v-5c0-3.08 1.63-5.64 4.5-6.32V4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.68C16.36 5.36 18 7.93 18 11Zm-4 9a2 2 0 1 1-4 0h4Z" clip-rule="evenodd"></path></svg>
</button> 
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            
            <img alt="User avatar" src="../assets/helloemo.png" />
          </div>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>