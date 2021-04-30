<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
     
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Register Your Account
      </h2>
      
    </div>
    <form class="mt-8 space-y-6" @submit.prevent="register">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
          <div>
          <label for="name" class="sr-only">Name</label>
          <input id="ename" name="name" type="text" v-model="name"
          required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Your Name">
           <span v-if="!$v.name.required && $v.name.$dirty" class="text-red-500">Name is required!</span>
        <span v-if="!$v.name.alpha && $v.name.$dirty" class="text-red-500">Name is required!</span>
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" v-model="email"
          required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
           <span
          v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty"
          class="text-red-500"
        >Valid Email is required!</span>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" v-model="password"
          utocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
          <span
          v-if="!$v.password.required && $v.password.$dirty"
          class="text-red-500"
        >Password is required!</span>
        <span
          v-if="(!$v.password.minLength || !$v.password.maxLength) && $v.password.$dirty"
          class="text-red-500"
        >Password must be between {{ $v.password.$params.minLength.min}} and {{ $v.password.$params.maxLength.max}} characters!</span>
        </div>
        <div>
          <label for="passwordconfirm" class="sr-only">Password</label>
          <input id="passwordconfirm" name="passwordconfirm" type="password" v-model="passwordconfirm"
          utocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password Confirm">
        </div>
        <span v-if="!$v.passwordconfirm.sameAsPassword"  class="text-red-500">Password must be identical</span>
      </div>

     
      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Register
        </button>
      </div>
    </form>
  </div>
</div>

</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
  sameAs
} from "vuelidate/lib/validators";
    export default {
        data() {
            return {
            name: '',    
            email: "",
            password: "",
            passwordconfirm: "",
            error: null,
            };
        },
        validations: {
            name: {
            required,
            alpha
            },
            email: {
            required,
            email
            },
            password: {
            required,
            maxLength: maxLength(12),
            minLength: minLength(6)
            },
            passwordconfirm: {
             sameAsPassword: sameAs('password')
            }
          
           
        },
         methods: {
            register() {
                
             this.$v.$touch();
               if (!this.$v.$invalid) {
              this.$store
                .dispatch("register", {
                  name: this.name,
                  email: this.email,
                  password: this.password,
                  passwordconfirm: this.passwordconfirm
                })
                .then(() => {
                  this.$router.push({ name: "Login" });
                })
                .catch((err) => {
                   this.email=this.password = ""
          
                  this.error = err.error
                  });
               }
            },
         }, 
    }
</script>

<style lang="scss" scoped>

</style>