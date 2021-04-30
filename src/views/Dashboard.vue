<template>
    <div class="px-2"> 
        
        <!-- This example requires Tailwind CSS v2.0+ -->
        <h2>List of Products</h2>
        <div class="flex flex-col">

        <div class="flex items-start pb-4" v-if="adminUser">
            <router-link :to="{ name: 'CreateProduct'}" class="inline-flex items-center justify-center p-2 rounded-md text-white  bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" >Create New Product</router-link>
        </div>
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                    </th>
                   
                     <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                    </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    
                    <tr v-for="product in products" :key="product.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <img class="h-10 w-10 rounded-full" :src="product.Image" alt="">
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                           {{product.Name}}
                            </div>
                           
                        </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-left">
                        <div class="text-sm text-gray-900">{{ product.SKU }}</div>
                        
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-left">
                        <div class="text-sm text-gray-900">{{ product.Description }}</div>
                        
                    </td>
                    
                    <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium text-left">
                        <router-link :to="{name: 'Product', params: {id: product.id}}" class="text-indigo-600 hover:text-indigo-900">view</router-link>
                        <template v-if="adminUser">    |
                        <router-link :to="{name: 'editProduct', params: {id: product.id}}" class="text-indigo-600 hover:text-indigo-900">Edit</router-link> | 
                        <button  class="text-indigo-600 hover:text-indigo-900" @click="deleteProdut(product.id)"
                        >Delete</button>
                        </template>
                    </td>
                    </tr>

                    <!-- More people... -->
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
    export default {
         computed: {
          
             ...mapGetters(["loggedIn", "products", "adminUser"])
        },
        mounted()
        {
            this.$store.dispatch('fetchProducts')
        },
        methods:{
            deleteProdut(id)
            {
                this.$store.dispatch('deleteProduct', {
                    id: id
                })
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>